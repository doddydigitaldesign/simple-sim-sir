import Matter, { Engine, Gravity } from "matter-js";
import React from "react";
import { config } from "../config";
import { RelationTypes } from "../types/relations";
import { getBallColor } from "../utils/colors";
import { bernoulliEvent, randBetween } from "../utils/rng";

// TODO: Add relation checks on collisionStart event: https://github.com/liabru/matter-js/blob/master/examples/events.js
// https://codesandbox.io/s/matterjs-4zm7j
// https://medium.com/better-programming/how-to-use-matter-js-in-a-react-app-bbd43b71efcc
// https://codersblock.com/blog/javascript-physics-with-matter-js/
// https://brm.io/matter-js/docs/classes/Events.html
// https://brm.io/matter-js/demo/#ballPool
interface Props {
  populationSize: number;
  timeToRemoved: number;
  transmissionRate: number;
  initialInfected: number;
}
interface State {
  S: number;
  I: number;
  R: number;
  ballStates: { [key: number]: { relation: RelationTypes; timeStamp: number } };
  render?: Matter.Render;
  engine?: Matter.Engine;
}

export class Scene extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      I: props.initialInfected,
      R: 0,
      S: props.populationSize - props.initialInfected,
      ballStates: {},
      engine: undefined,
      render: undefined
    };
  }

  componentDidMount() {
    const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Events = Matter.Events,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

    const gravity: Gravity = { scale: 0, x: 0, y: 0 };

    const engine = Engine.create({
      // positionIterations: 20
    });
    engine.world.gravity = gravity;
    engine.timing.timeScale = 1;
    engine.velocityIterations = 1;
    const render = Render.create({
      element: this.refs.scene as HTMLElement,
      engine: engine,
      options: {
        width: config.canvasWidth,
        height: config.canvasHeight,
        wireframes: false
      }
    });
    const balls = [...Array(this.props.populationSize).keys()].map(ball => {
      let fillStyle = getBallColor(RelationTypes.SUSCEPTIBLE);
      if (ball <= config.initialInfectious) {
        fillStyle = getBallColor(RelationTypes.INFECTIOUS);
      }
      const ballOptions: Matter.IBodyDefinition = {
        frictionStatic: 0,
        slop: 0,
        frictionAir: 0,
        restitution: 1.1,
        friction: 0,
        density: 1,
        inertia: 0,
        speed: 1,
        force: {
          x: randBetween(-config.maxVelocity, config.maxVelocity),
          y: randBetween(-config.maxVelocity, config.maxVelocity)
        },
        render: { fillStyle }
      };
      const ballN = Bodies.circle(
        randBetween(0, config.canvasWidth),
        randBetween(0, config.canvasHeight),
        config.ballRadius,
        ballOptions
      );
      return ballN;
    });
    World.add(engine.world, [
      // walls
      Bodies.rectangle(config.canvasWidth / 2, 0, config.canvasWidth, 50, {
        isStatic: true,
        restitution: 2,
        mass: 1000
      }),
      Bodies.rectangle(
        config.canvasWidth / 2,
        config.canvasHeight,
        config.canvasWidth,
        50,
        { isStatic: true, restitution: 2, mass: 1000 }
      ),
      Bodies.rectangle(0, config.canvasHeight / 2, 50, config.canvasHeight, {
        isStatic: true,
        restitution: 2,
        mass: 1000
      }),
      Bodies.rectangle(
        config.canvasWidth,
        config.canvasHeight / 2,
        50,
        config.canvasHeight,
        {
          isStatic: true,
          restitution: 2,
          mass: 1000
        }
      )
    ]);

    World.add(engine.world, [...balls]);

    // add mouse control
    const mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 1,
          render: {
            visible: false
          }
        }
      } as Matter.IMouseConstraintDefinition);

    World.add(engine.world, mouseConstraint);

    Events.on(engine, "collisionStart", event => {
      var pairs = event.pairs;
      // change object colours to indicate spread of infection
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        const timeCreated = pair.timeCreated;
        const timeStamp = pair.timeUpdated;
        const bodyA = pair.bodyA;
        const bodyB = pair.bodyB;
        /**
         * Check if bodyA was infected from the start
         */
        if (
          bodyA.render.fillStyle === getBallColor(RelationTypes.INFECTIOUS) &&
          !this.state.ballStates[bodyA.id]
        ) {
          this.setState(prevState => ({
            ...prevState,
            ballStates: {
              ...prevState.ballStates,
              [bodyA.id]: {
                relation: RelationTypes.INFECTIOUS,
                timeStamp: timeCreated
              }
            }
          }));
        }
        /**
         * Check if bodyB was infected from the start
         */
        if (
          bodyB.render.fillStyle === getBallColor(RelationTypes.INFECTIOUS) &&
          !this.state.ballStates[bodyB.id]
        ) {
          this.setState(prevState => ({
            ...prevState,
            ballStates: {
              ...prevState.ballStates,
              [bodyB.id]: {
                relation: RelationTypes.INFECTIOUS,
                timeStamp: timeCreated
              }
            }
          }));
        }
        /**
         * Check if bodyA should be removed
         */
        if (
          bodyA.render.fillStyle === getBallColor(RelationTypes.INFECTIOUS) &&
          pair.timeUpdated - this.state.ballStates[bodyA.id]?.timeStamp >=
            this.props.timeToRemoved
        ) {
          this.setState(prevState => ({
            ...prevState,
            I: prevState.I - 1,
            R: prevState.R + 1,
            ballStates: {
              ...prevState.ballStates,
              [bodyA.id]: {
                relation: RelationTypes.REMOVED,
                timeStamp
              }
            }
          }));
          bodyA.render.fillStyle = getBallColor(RelationTypes.REMOVED);
        }
        /**
         * Check if bodyB should be removed
         */
        if (
          bodyB.render.fillStyle === getBallColor(RelationTypes.INFECTIOUS) &&
          pair.timeUpdated - this.state.ballStates[bodyB.id]?.timeStamp >=
            this.props.timeToRemoved
        ) {
          this.setState(prevState => ({
            ...prevState,
            I: prevState.I - 1,
            R: prevState.R + 1,
            ballStates: {
              ...prevState.ballStates,
              [bodyB.id]: {
                relation: RelationTypes.REMOVED,
                timeStamp
              }
            }
          }));
          bodyB.render.fillStyle = getBallColor(RelationTypes.REMOVED);
        }
        /**
         * Check if bodyA should be infected
         */
        if (
          bodyA.render.fillStyle === getBallColor(RelationTypes.SUSCEPTIBLE) &&
          bodyB.render.fillStyle === getBallColor(RelationTypes.INFECTIOUS)
        ) {
          if (bernoulliEvent(this.props.transmissionRate)) {
            if (bernoulliEvent(1 - this.props.transmissionRate)) {
              this.setState(prevState => ({
                ...prevState,
                S: prevState.S - 1,
                I: prevState.I + 1,
                ballStates: {
                  ...prevState.ballStates,
                  [bodyA.id]: {
                    relation: RelationTypes.INFECTIOUS,
                    timeStamp
                  }
                }
              }));
              bodyA.render.fillStyle = getBallColor(RelationTypes.INFECTIOUS);
            }
          }
        }
        /**
         * Check if bodyB should be infected
         */
        if (
          bodyB.render.fillStyle === getBallColor(RelationTypes.SUSCEPTIBLE) &&
          bodyA.render.fillStyle === getBallColor(RelationTypes.INFECTIOUS)
        ) {
          if (bernoulliEvent(1 - this.props.transmissionRate)) {
            this.setState(prevState => ({
              ...prevState,
              S: prevState.S - 1,
              I: prevState.I + 1,
              ballStates: {
                ...prevState.ballStates,
                [bodyB.id]: {
                  relation: RelationTypes.INFECTIOUS,
                  timeStamp
                }
              }
            }));
            bodyB.render.fillStyle = getBallColor(RelationTypes.INFECTIOUS);
          }
        }
      }
    });

    Engine.run(engine);

    Render.run(render);
    this.setState({ render, engine });
  }

  shouldComponentUpdate(
    nextProps: Readonly<Props>,
    nextState: Readonly<State>,
    nextContext: any
  ) {
    const newPopSize = nextProps.populationSize === this.props.populationSize;
    const newTimeToRemoved =
      nextProps.timeToRemoved === this.props.timeToRemoved;
    const newTransRate =
      nextProps.transmissionRate === this.props.transmissionRate;

    return [newPopSize, newTimeToRemoved, newTransRate].every(x => x === false);
  }

  componentWillUnmount() {
    if (this.state.engine) {
      Engine.clear(this.state.engine);
    }
  }

  render() {
    return <div ref="scene" />;
  }
}

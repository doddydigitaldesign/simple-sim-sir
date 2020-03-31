import Matter, { Gravity } from "matter-js";
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
  handleSetStats: (stats: { S: number; I: number; R: number }) => void;
  stats: { S: number; I: number; R: number };
}
interface State {
  S: number;
  I: number;
  R: number;
  render?: any;
}

export class Scene extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = props.stats;
  }

  componentDidMount() {
    const props = this.props;
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
    engine.timing.timeScale = 0.1;
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
    const setTimer = (callback: (args: any) => void, n: number) => {
      setTimeout(callback, n);
    };
    Events.on(engine, "collisionStart", event => {
      var pairs = event.pairs;
      // change object colours to indicate spread of infection
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        const bodyA = pair.bodyA;
        const bodyB = pair.bodyB;
        if (
          bodyA.render.fillStyle === getBallColor(RelationTypes.INFECTIOUS) ||
          bodyB.render.fillStyle === getBallColor(RelationTypes.INFECTIOUS)
        ) {
          if (
            bodyA.render.fillStyle === getBallColor(RelationTypes.SUSCEPTIBLE)
          ) {
            if (
              bodyB.render.fillStyle === getBallColor(RelationTypes.SUSCEPTIBLE)
            ) {
              bodyA.render.fillStyle = getBallColor(RelationTypes.INFECTIOUS);
              if (Date.now() - pair.timeUpdated >= this.props.timeToRemoved) {
                bodyA.render.fillStyle = getBallColor(RelationTypes.REMOVED);
              }
            }
          }
          if (
            pair.bodyB.render.fillStyle ===
            getBallColor(RelationTypes.SUSCEPTIBLE)
          ) {
            if (!bernoulliEvent(props.transmissionRate)) {
              pair.bodyB.render.fillStyle = getBallColor(
                RelationTypes.INFECTIOUS
              );
              if (
                Date.now() - pair.timeUpdated >=
                this.props.timeToRemoved * 1000
              ) {
                bodyB.render.fillStyle = getBallColor(RelationTypes.REMOVED);
              }
            }
          }
        }
      }
    });

    Engine.run(engine);

    Render.run(render);
    this.setState({ render });
    props.handleSetStats({ ...this.state });
  }

  render() {
    return <div ref="scene" />;
  }
}

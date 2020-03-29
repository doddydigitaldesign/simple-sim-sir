import { config } from "../config";
import { RelationTypes } from "../types/relations";
import { Ball } from "./Ball";

const coinFlip = () => Math.random() <= config.transmissionRate;
const tryInfect = (ball: Ball) => {
  if (
    ball.relation === RelationTypes.INFECTIOUS ||
    ball.relation === RelationTypes.REMOVED
  ) {
    return;
  }

  const hasBadLuck = coinFlip();
  if (hasBadLuck) {
    ball.infect();
  }
};

interface TrackerConfig {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  popSize: number;
  timeToRemoved: number;

  handleSetStats: (prev: RelationTypes, next: RelationTypes) => void;
}

export class Tracker {
  private width: number;
  private height: number;
  private balls: Ball[];
  private ctx: CanvasRenderingContext2D;
  private popSize: number;
  private timeToRemoved: number;
  private handleSetStats: (prev: RelationTypes, next: RelationTypes) => void;

  constructor({
    ctx,
    width,
    height,
    popSize,
    timeToRemoved,
    handleSetStats
  }: TrackerConfig) {
    this.width = width;
    this.height = height;
    this.balls = [];
    this.ctx = ctx;
    this.popSize = popSize;
    this.timeToRemoved = timeToRemoved;
    this.populate();
    this.update();
    this.handleSetStats = handleSetStats;
  }

  update() {
    this.ctx.clearRect(0, 0, config.canvasWidth, config.canvasHeight);
    this.balls.forEach(ball => {
      ball.update();
    });

    for (let i = 0; i < this.balls.length; i++) {
      for (let j = 0; j < this.balls.length; j++) {
        if (i !== j) {
          // console.log(this.isCollided(this.balls[i], this.balls[j]));
          if (this.isCollided(this.balls[i], this.balls[j])) {
            this.balls[i].collide(this.balls[j]);
            if (this.balls[i].relation === RelationTypes.INFECTIOUS) {
              tryInfect(this.balls[j]);
            }
            if (this.balls[j].relation === RelationTypes.INFECTIOUS) {
              tryInfect(this.balls[i]);
            }
            this.balls[i].update();
            this.balls[j].update();
          }
        }
      }
    }
    requestAnimationFrame(() => {
      this.update();
    });
  }
  distance(ball1: Ball, ball2: Ball) {
    return Math.sqrt(
      (ball1.position.x - ball2.position.x) *
        (ball1.position.x - ball2.position.x) +
        (ball1.position.y - ball2.position.y) *
          (ball1.position.y - ball2.position.y)
    );
  }
  isCollided(ball1: Ball, ball2: Ball) {
    if (this.distance(ball1, ball2) <= ball1.radius + ball2.radius) {
      return true;
    }
    return false;
  }
  populate() {
    for (let i = 0; i < this.popSize; i++) {
      const newBall = new Ball({
        ctx: this.ctx,
        index: i,
        timeToRemoved: this.timeToRemoved,
        handleSetStats: this.handleSetStats
      });
      this.balls.push(newBall);
      this.balls[i].draw();
    }
  }
}

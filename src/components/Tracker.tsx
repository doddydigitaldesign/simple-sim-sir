import { config } from "../config";
import { RelationTypes } from "../types/relations";
import { Ball } from "./Ball";

interface TrackerConfig {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  popSize: number;
  timeToRemoved: number;
  transmissionRate: number;
  stats: { S: number; I: number; R: number };
}

export class Tracker {
  private width: number;
  private height: number;
  private balls: Ball[];
  private ctx: TrackerConfig["ctx"];
  private popSize: TrackerConfig["popSize"];
  private timeToRemoved: TrackerConfig["timeToRemoved"];
  private transmissionRate: TrackerConfig["transmissionRate"];
  private stats: TrackerConfig["stats"];

  constructor({
    ctx,
    width,
    height,
    popSize,
    timeToRemoved,
    transmissionRate,
    stats
  }: TrackerConfig) {
    this.width = width;
    this.height = height;
    this.balls = [];
    this.ctx = ctx;
    this.popSize = popSize;
    this.timeToRemoved = timeToRemoved;
    this.transmissionRate = transmissionRate;
    this.stats = stats;

    this.populate();
    this.update();
  }
  coinFlip() {
    return Math.random() <= this.transmissionRate;
  }
  tryInfect(ball: Ball) {
    if (
      ball.relation === RelationTypes.INFECTIOUS ||
      ball.relation === RelationTypes.REMOVED
    ) {
      return;
    }

    if (this.coinFlip() === true) {
      ball.relation = RelationTypes.INFECTIOUS;
      setTimeout(() => {
        ball.relation = RelationTypes.REMOVED;
      }, this.timeToRemoved * 1000);
    }
  }

  update() {
    const lengthBalls = this.balls.length;
    this.ctx.clearRect(0, 0, config.canvasWidth, config.canvasHeight);
    this.balls.forEach(ball => {
      ball.update();
    });

    for (let i = 0; i < lengthBalls; i++) {
      for (let j = 0; j < lengthBalls; j++) {
        if (i !== j) {
          if (this.isCollided(this.balls[i], this.balls[j])) {
            this.balls[i].collide(this.balls[j]);
            if (this.balls[i].relation === RelationTypes.INFECTIOUS) {
              this.tryInfect(this.balls[j]);
            }
            if (this.balls[j].relation === RelationTypes.INFECTIOUS) {
              this.tryInfect(this.balls[i]);
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
        timeToRemoved: this.timeToRemoved
      });
      this.balls.push(newBall);
      this.balls[i].draw();
    }
  }

  getStats() {
    let S: number = 0;
    let I: number = 0;
    let R: number = 0;
    const relationTypes = this.balls.map(ball => ball.relation);
    relationTypes.forEach(type => {
      if (type === RelationTypes.INFECTIOUS) {
        I += 1;
      }
      if (type === RelationTypes.SUSCEPTIBLE) {
        S += 1;
      }
      if (type === RelationTypes.REMOVED) {
        R += 1;
      }
    });
    console.log(this.balls.length);
    return { S: S, I: I, R: R };
  }
}

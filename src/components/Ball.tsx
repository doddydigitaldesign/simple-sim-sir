import { config } from "../config";
import { RelationTypes } from "../types/relations";
import { Vector } from "../types/vector";

const rand = (max: number) => 1 + Math.floor(Math.random() * max);

const getBallColor = (relation: RelationTypes) => {
  switch (relation) {
    case RelationTypes.INFECTIOUS:
      return "red";
    case RelationTypes.REMOVED:
      return "white";
    default:
      return "dodgerblue";
  }
};
const getShadowColor = (relation: RelationTypes) => {
  switch (relation) {
    case RelationTypes.INFECTIOUS:
      return "yellow";
    case RelationTypes.REMOVED:
      return "limegreen";
    default:
      return "deepskyblue";
  }
};

interface BallConfig {
  ctx: CanvasRenderingContext2D;
  index: number;
}

export class Ball {
  public position: Vector;
  public velocity: Vector;
  public relation: RelationTypes;
  public radius: number;
  private count: number;
  ctx: CanvasRenderingContext2D;
  constructor({ ctx, index }: BallConfig) {
    this.ctx = ctx;
    this.count = index + 1;
    this.position = new Vector(
      rand(config.canvasWidth),
      rand(config.canvasHeight)
    );
    this.velocity = new Vector(
      Math.round(Math.random() * config.maxVelocity),
      Math.round(Math.random() * config.maxVelocity)
    );
    this.relation =
      this.count <= config.initialInfectious
        ? RelationTypes.INFECTIOUS
        : RelationTypes.SUSCEPTIBLE;
    this.radius = config.ballRadius;
  }

  draw() {
    const ctx = this.ctx;
    ctx.fillStyle = getBallColor(this.relation);
    ctx.shadowColor = getShadowColor(this.relation);

    ctx.shadowBlur = config.ballRadius;
    ctx.save();
    ctx.scale(1, 1);
    ctx.translate(this.position.x - 10, this.position.y - 10);
    // ctx.fill(new Path2D(BALL_SVG));
    const path = new Path2D();
    path.moveTo(220, 60);
    path.arc(170, 60, config.ballRadius, 0, 2 * Math.PI);
    ctx.scale(0.1, 0.1);
    ctx.fill(path);
    ctx.restore();
  }

  translate() {
    if (
      this.position.x <= this.radius * 2 ||
      this.position.x >= config.canvasWidth - this.radius * 2
    ) {
      this.velocity.x = -this.velocity.x;
    }
    if (
      this.position.y <= this.radius * 2 ||
      this.position.y >= config.canvasHeight - this.radius * 2
    ) {
      this.velocity.y = -this.velocity.y;
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  update() {
    this.translate();
    this.draw();
  }

  collide(ball: Ball) {
    const tempVelocity = { x: this.velocity.x, y: this.velocity.y };
    this.velocity.x = ball.velocity.x;
    this.velocity.y = ball.velocity.y;
    ball.velocity.x = tempVelocity.x;
    ball.velocity.y = tempVelocity.y;
  }
}

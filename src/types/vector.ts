export class Vector {
  public x: number;
  public y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(vector: Vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  magnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  dot(vector: Vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  normalize() {
    return new Vector(this.x / this.magnitude(), this.y / this.magnitude());
  }

  scale(n: number) {
    return new Vector(this.x * n, this.y * n);
  }
}

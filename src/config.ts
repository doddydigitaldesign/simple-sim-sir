export const config = {
  canvasWidth: window.innerWidth * 0.8,
  canvasHeight: window.innerHeight * 0.8,
  ballRadius: 10,
  maxVelocity: 1,
  initialInfectious: 10,
  initialPopulationSize: 500,
  transmissionRate: 0.01,
  timeToRemoved: 10
};
export const BALL_SVG =
  "M 100, 100m -75, 0a 75,75 0 1,0 150,0a 75,75 0 1,0 -150,0";

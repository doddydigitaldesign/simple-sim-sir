export const rand = (max: number) => 1 + Math.floor(Math.random() * max);
export const randBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);
export const randn: () => number = () => {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
};
export const bernoulliEvent = (threshold: number) => randn() >= threshold;

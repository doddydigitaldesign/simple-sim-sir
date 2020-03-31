export const rand = (max: number) => 1 + Math.floor(Math.random() * max);
export const randBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const bernoulliEvent = (threshold: number) => Math.random() >= threshold;

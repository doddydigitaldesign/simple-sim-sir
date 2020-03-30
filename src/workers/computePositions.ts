import * as Comlink from "https://unpkg.com/comlink/dist/esm/comlink.mjs";

export async function initComputePositions() {
  if (window.Worker) {
    const worker = new Worker("computePositions.js");
    const obj = Comlink.wrap(worker);
    alert(`Counter: ${await obj.counter}`);
    await obj.inc();
    alert(`Counter: ${await obj.counter}`);
  }
}

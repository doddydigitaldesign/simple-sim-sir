import React from "react";
import { config } from "../config";
import { Scene } from "./Scene";

export const Main = () => (
  <main className="App-main">
    <Scene
      initialInfected={config.initialInfectious}
      transmissionRate={config.transmissionRate}
      timeToRemoved={config.timeToRemoved}
      populationSize={config.initialPopulationSize}
    />
  </main>
);

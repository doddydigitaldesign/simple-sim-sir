import React, { useState } from "react";
import { config } from "../config";
import { Scene } from "./Scene";

export const Main = () => {
  const [running, setRunning] = useState<boolean>(false);
  return (
    <main className="text-center">
      <div>
        <div className="row">
          <div className="col" />
          <div className="col text-nowrap">
            <button
              className="btn btn-danger"
              onClick={() => {
                setRunning(false);
              }}
            >
              Stop
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                setRunning(true);
              }}
            >
              Start
            </button>
          </div>
          <div className="col" />
        </div>
        {running && (
          <div className="row">
            <div className="col-sm">
              <Scene
                initialInfected={config.initialInfectious}
                transmissionRate={config.transmissionRate}
                timeToRemoved={config.timeToRemoved}
                populationSize={config.initialPopulationSize}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

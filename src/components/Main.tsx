import React, { useState } from "react";
import { config } from "../config";
import { Scene } from "./Scene";

export const Main = () => {
  const [running, setRunning] = useState<boolean>(false);
  const [popSize, setPopSize] = useState<number>(config.initialPopulationSize);
  const [initialInfected, setInitialInfected] = useState<number>(
    config.initialInfectious
  );
  const [timeToRemoved, setTimeToRemoved] = useState<number>(
    config.timeToRemoved
  );
  const [transmissionRate, setTransmissionRate] = useState<number>(
    config.transmissionRate
  );
  return (
    <main className="text-center">
      <div>
        <div className="row">
          <div className="col" />
          <div className="col text-nowrap">
            <form noValidate autoComplete={"off"}>
              <div className="form-group">
                <label htmlFor="popSize">Population Size</label>
                <input
                  disabled={running}
                  id="popSize"
                  value={popSize}
                  min={0}
                  max={5000}
                  onBlur={e => {
                    setPopSize(+e.target.value);
                  }}
                  type="number"
                  className={"form-control"}
                />
              </div>
              <div className="form-group">
                <label htmlFor="initialInfected">Initial Infected</label>
                <input
                  disabled={running}
                  id="initialInfected"
                  value={initialInfected}
                  min={0}
                  max={popSize}
                  onBlur={e => {
                    setInitialInfected(+e.target.value);
                  }}
                  type="number"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="timeToRemoved">Infection Time</label>
                <input
                  disabled={running}
                  id="timeToRemoved"
                  value={timeToRemoved}
                  min={0}
                  onBlur={e => {
                    setTimeToRemoved(+e.target.value);
                  }}
                  type="number"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="transmissionRate">Virulence</label>
                <input
                  disabled={running}
                  id="transmissionRate"
                  value={transmissionRate}
                  min={0}
                  max={1}
                  step={0.01}
                  onBlur={e => {
                    setTransmissionRate(+e.target.value);
                  }}
                  type="range"
                  className="form-control-range"
                />
              </div>
            </form>
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
                setRunning={setRunning}
                initialInfected={initialInfected}
                transmissionRate={transmissionRate}
                timeToRemoved={timeToRemoved}
                populationSize={popSize}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

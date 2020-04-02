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
          <div className="col">
            <form noValidate autoComplete={"off"}>
              <div className="form-row align-items-center">
                <div className="form-group">
                  <label htmlFor="popSize">
                    Population Size: {popSize} individuals
                  </label>
                  <small id="emailHelp" className="form-text">
                    Determines the total number of individuals used in the
                    simulation. Larger numbers affect performance negatively.
                  </small>
                  <input
                    disabled={running}
                    id="popSize"
                    value={popSize}
                    min={0}
                    step={50}
                    max={5000}
                    onChange={e => {
                      setPopSize(+e.target.value);
                    }}
                    type="range"
                    className={"form-control-range"}
                  />
                </div>
              </div>
              <div className="form-row align-items-center">
                <div className="form-group">
                  <label htmlFor="initialInfected">
                    Initial Infected: {initialInfected} individuals
                  </label>
                  <small id="emailHelp" className="form-text">
                    Determines the number of infected individuals at the start
                    of the simulation.
                  </small>
                  <input
                    disabled={running}
                    id="initialInfected"
                    value={initialInfected}
                    min={0}
                    step={50}
                    max={popSize}
                    onChange={e => {
                      setInitialInfected(+e.target.value);
                    }}
                    type="range"
                    className="form-control-range"
                  />
                </div>
              </div>
              <div className="form-row align-items-center">
                <div className="form-group">
                  <label htmlFor="timeToRemoved">
                    Infection Time: {Math.floor(timeToRemoved / 1000)}s
                  </label>
                  <small id="emailHelp" className="form-text">
                    Determines the amount of time spent in an "infected" state.
                  </small>
                  <input
                    disabled={running}
                    id="timeToRemoved"
                    value={timeToRemoved}
                    min={0}
                    step={1000}
                    max={100000}
                    onChange={e => {
                      setTimeToRemoved(+e.target.value);
                    }}
                    type="range"
                    className="form-control-range"
                  />
                </div>
              </div>
              <div className="form-row align-items-center">
                <div className="form-group">
                  <label htmlFor="transmissionRate">
                    Virulence: {Math.floor(transmissionRate * 100)}%
                  </label>
                  <small id="emailHelp" className="form-text">
                    Determines the probability or spreading the infection via
                    contact.
                  </small>
                  <input
                    disabled={running}
                    id="transmissionRate"
                    value={transmissionRate}
                    min={0}
                    max={1}
                    step={0.01}
                    onChange={e => {
                      setTransmissionRate(+e.target.value);
                    }}
                    type="range"
                    className="form-control-range"
                  />
                </div>
              </div>
              <div className="form-row">
                <button
                  disabled={!running}
                  className="btn btn-danger"
                  onClick={e => {
                    e.preventDefault();
                    setRunning(false);
                  }}
                >
                  Stop
                </button>
                <button
                  disabled={running}
                  className="btn btn-primary"
                  onClick={e => {
                    e.preventDefault();
                    setRunning(true);
                  }}
                >
                  Start
                </button>
              </div>
            </form>
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

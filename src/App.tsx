import React, { useState } from "react";
import "./App.css";
import { Canvas } from "./components/Canvas";
import { Form } from "./components/Form";
import Stats from "./components/Stats";
import { config } from "./config";
import { RelationTypes } from "./types/relations";

function App() {
  const [populationSize, setPopulationSize] = useState<number>(
    config.initialPopulationSize
  );
  const [timeToRemoved, setTimeToRemoved] = useState<number>(
    config.timeToRemoved
  );

  const [susceptibleCount, setSusceptibleCount] = useState<number>(0);
  const [infectedCount, setInfectedCount] = useState<number>(0);
  const [removedCount, setRemovedCount] = useState<number>(0);

  const handleChangePopulationSize = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value, 10);
    if (typeof value === "number") {
      setPopulationSize(value);
    }
  };

  const handleChangeTimeToRemoved = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(e.target.value);
    if (typeof value === "number") {
      setTimeToRemoved(value);
    }
  };

  const handleUpdateStats = (prev: RelationTypes, next: RelationTypes) => {
    const { INFECTIOUS, REMOVED, SUSCEPTIBLE } = RelationTypes;
    switch (next) {
      case INFECTIOUS:
        if (prev === REMOVED || prev === INFECTIOUS) {
          break;
        }
        if (prev === SUSCEPTIBLE) {
          setSusceptibleCount(susceptibleCount - 1);
          setInfectedCount(infectedCount + 1);
        }
        break;
      case REMOVED:
        if (prev === SUSCEPTIBLE) {
          break;
        }
        if (prev === INFECTIOUS) {
          setInfectedCount(infectedCount - 1);
          setRemovedCount(removedCount + 1);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Form
          populationSize={populationSize}
          setPopulationSize={handleChangePopulationSize}
          timeToRemoved={timeToRemoved}
          setTimeToRemoved={handleChangeTimeToRemoved}
        />
        <Stats
          infected={infectedCount}
          susceptible={susceptibleCount}
          removed={removedCount}
        />
        <Canvas
          handleSetStats={handleUpdateStats}
          timeToRemoved={timeToRemoved}
          populationSize={populationSize}
        />
      </header>
    </div>
  );
}

export default App;

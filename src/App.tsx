import React, { useCallback, useState } from "react";
import "./App.css";
import { Canvas } from "./components/Canvas";
import { Footer } from "./components/Footer";
import { Form } from "./components/Form";
import Stats from "./components/Stats";
import { config } from "./config";

function App() {
  const [populationSize, setPopulationSize] = useState<number>(
    config.initialPopulationSize
  );
  const [timeToRemoved, setTimeToRemoved] = useState<number>(
    config.timeToRemoved
  );
  const [susceptibleCount, setSusceptibleCount] = useState<number>(
    config.initialPopulationSize - config.initialInfectious
  );
  const [infectedCount, setInfectedCount] = useState<number>(
    config.initialInfectious
  );
  const [removedCount, setRemovedCount] = useState<number>(0);
  const [transmissionRate, setTransmissionRate] = useState<number>(
    config.transmissionRate
  );

  const handleChangePopulationSize = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value, 10);
    if (typeof value === "number") {
      setPopulationSize(value);
      setSusceptibleCount(value - removedCount - infectedCount);
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

  const handleChangeTransmissionRate = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(e.target.value);
    if (typeof value === "number") {
      setTransmissionRate(value);
    }
  };

  const handleUpdateStats = (stats: { S: number; I: number; R: number }) => {
    setInfectedCount(stats.I);
    setRemovedCount(stats.R);
    setSusceptibleCount(stats.S);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="h1">SIR Simulering</h1>
        <Form
          populationSize={populationSize}
          setPopulationSize={handleChangePopulationSize}
          timeToRemoved={timeToRemoved}
          setTimeToRemoved={handleChangeTimeToRemoved}
          transmissionRate={transmissionRate}
          setTransmissionRate={handleChangeTransmissionRate}
        />

        <Canvas
          stats={{ S: susceptibleCount, I: infectedCount, R: removedCount }}
          transmissionRate={transmissionRate}
          handleSetStats={useCallback(handleUpdateStats, [handleUpdateStats])}
          timeToRemoved={timeToRemoved}
          populationSize={populationSize}
        />
        <Stats
          infected={infectedCount}
          susceptible={susceptibleCount}
          removed={removedCount}
        />
      </header>
      <Footer />
    </div>
  );
}

export default App;

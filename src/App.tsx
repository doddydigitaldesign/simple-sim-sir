import React from "react";
import "./App.css";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Main } from "./components/Main";

function App() {
  return (
    <>
      <Header />
      <div className="App container-fluid bg-dark text-light">
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <Main />
          </div>
          <div className="col"></div>
        </div>
        <div className="row">
          <div className="col">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

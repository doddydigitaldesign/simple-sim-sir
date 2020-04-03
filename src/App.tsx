import React from "react";
import "./App.css";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Main } from "./components/Main";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container-fluid bg-dark text-light">
        <Main />
        <Footer />
      </div>
    </div>
  );
}

export default App;

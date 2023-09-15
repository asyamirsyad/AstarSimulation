import React from "react";
import Navbar from "./components/NavBar";
import AStarSim from "./Pages/AStarSim";

function App() {
  return (
    <>
      <Navbar title={"A* Simulation"} />
      <AStarSim />
    </>
  );
}

export default App;

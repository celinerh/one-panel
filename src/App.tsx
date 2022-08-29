import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div className="flex App">
      <Navigation />
      <div className="w-full h-screen p-10">
        <Outlet />
      </div>
    </div>
  );
}

export default App;

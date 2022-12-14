import React from "react";
import { Outlet } from "react-router-dom";
import BottomNavigation from "./components/BottomNavigation";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div className="md:flex App">
      <Navigation />
      <h1 className="p-6 mb-8 text-3xl text-center border-b-2 border-gray-200 sm:text-4xl font-Pacifico md:hidden">
        OnePanel
      </h1>
      <div className="w-full h-screen p-6 mb-32 md:mb-0 md:p-6 lg:p-10">
        <Outlet />
      </div>
      <BottomNavigation className="md:hidden" />
    </div>
  );
}

export default App;

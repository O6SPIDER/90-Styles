import React from "react";
import "./styles/globals.css"; // Ensure global styles are imported
import LandingPage from "./pages/Landing/LandingPage";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <LandingPage />
    </div>
  );
};

export default App;

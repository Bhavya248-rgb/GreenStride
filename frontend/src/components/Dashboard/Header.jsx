import React from "react";

const DashboardHeader = () => {
  return (
    <header
      className="bg-[#FAFAFA] text-green-800 py-10 px-6 rounded-b-[3rem] shadow-lg"
    >
      {/* Container */}
      <div className="container mx-auto text-center">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-2 tracking-tight">
          Welcome Back, John! 🌿
        </h1>
        {/* Subtitle */}
        <p className="text-lg font-medium text-green-600 mb-6">
          Let’s make today count for the planet.
        </p>
        {/* Call-to-Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            className="bg-green-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-green-700 transition"
          >
            Start a Challenge
          </button>
          <button
            className="border border-green-600 text-green-800 font-semibold py-2 px-6 rounded-full hover:bg-green-50 transition"
          >
            View Leaderboard
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
import React from "react";

const StreakSection = () => {
  // Simulated backend data (replace with actual API call later)
  const streak = 11; // This value would come from the backend

  return (
    <section className="bg-white py-6 px-8 rounded-3xl shadow-lg my-8 mx-4">
      <div className="flex items-center justify-center space-x-4">
        {/* Title */}
        <h2 className="text-lg font-semibold text-green-700 tracking-wide">
          Your Current Streak 🌟
        </h2>
        {/* Streak Count */}
        <div className="flex items-center space-x-2">
          <p className="text-5xl font-extrabold text-green-600">{streak}</p>
          <span className="text-base font-medium text-gray-600">Days</span>
        </div>
      </div>
    </section>
  );
};

export default StreakSection;
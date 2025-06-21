import React from "react";
import TrackToday from "./TrackToday";
import TrackWeek from "./TrackWeek";
import TrackMonth from "./TrackMonth";

const TrackSections = () => {
  return (
    <section className="py-16 bg-gray-50">
      {/* Main Container */}
      <div className="container mx-auto px-4 space-y-12">
        {/* Section Title */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-green-700 mb-4">Track Your Sustainability Journey 🌱</h2>
          <p className="text-lg text-gray-600">
            Log your daily, weekly, and monthly actions to see your impact on the environment.
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

        {/* Track Today Section */}
        <div>
          <h3 className="text-2xl font-semibold text-green-600 mb-6 flex items-center gap-2">
            <span>🌞 Track Today</span>
          </h3>
          <TrackToday />
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

        {/* Track Week Section */}
        <div>
          <h3 className="text-2xl font-semibold text-blue-600 mb-6 flex items-center gap-2">
            <span>📅 Track Week</span>
          </h3>
          <TrackWeek />
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

        {/* Track Month Section */}
        {/* <div>
          <h3 className="text-2xl font-semibold text-purple-600 mb-6 flex items-center gap-2">
            <span>🌍 Track Month</span>
          </h3>
          <TrackMonth />
        </div> */}
      </div>
    </section>
  );
};

export default TrackSections;
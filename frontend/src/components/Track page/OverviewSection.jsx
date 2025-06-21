import React, { useState, useEffect } from "react";
import CountUp from "react-countup";

const OverviewSection = () => {
  // Simulated backend data (constants)
  const [impactData, setImpactData] = useState({
    today_co2_saved: 0,
    today_water_saved: 0,
    weekly_co2_saved: 0,
    weekly_water_saved: 0,
    monthly_co2_saved: 0,
    monthly_water_saved: 0,
  });

  // Simulate fetching data from the backend
  useEffect(() => {
    const fetchImpactData = async () => {
      // Simulate an API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulated backend response
      const simulatedBackendData = {
        today_co2_saved: 0.75,
        today_water_saved: 15,
        weekly_co2_saved: 4,
        weekly_water_saved: 60,
        monthly_co2_saved: 12,
        monthly_water_saved: 250,
      };

      // Update state with simulated backend data
      setImpactData(simulatedBackendData);
    };

    fetchImpactData();
  }, []);

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Impact 🌱</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Lifetime Impact Card */}
          <ImpactCard
            title="Lifetime Impact"
            co2_saved={
              impactData.today_co2_saved +
              impactData.weekly_co2_saved +
              impactData.monthly_co2_saved
            }
            water_saved={
              impactData.today_water_saved +
              impactData.weekly_water_saved +
              impactData.monthly_water_saved
            }
          />
          {/* Monthly Impact Card */}
          <ImpactCard
            title="Monthly Impact"
            co2_saved={impactData.monthly_co2_saved}
            water_saved={impactData.monthly_water_saved}
          />
          {/* Today's Impact Card */}
          <ImpactCard
            title="Today's Impact"
            co2_saved={impactData.today_co2_saved}
            water_saved={impactData.today_water_saved}
          />
        </div>
      </div>
    </section>
  );
};

// Reusable Impact Card Component
const ImpactCard = ({ title, co2_saved, water_saved }) => {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl text-center transform hover:scale-[1.02] transition-transform duration-300">
      <h3 className="text-xl font-semibold text-gray-700 mb-6">{title}</h3>
      <div className="space-y-4">
        {/* CO₂ Saved */}
        <div>
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">CO₂ Saved</p>
          <p className="text-4xl font-bold text-green-600">
            <CountUp start={0} end={co2_saved} duration={2} decimals={2} decimal="," /> kg
          </p>
        </div>
        {/* Water Saved */}
        <div>
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Water Saved</p>
          <p className="text-4xl font-bold text-blue-500">
            <CountUp start={0} end={water_saved} duration={2} decimals={0} decimal="," /> L
          </p>
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;
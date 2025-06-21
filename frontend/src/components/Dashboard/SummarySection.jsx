// SummarySection.jsx
import React, { useState, useEffect } from "react";

// Mock Data
const mockData = {
  dailyForms: [
    {
      _id: "1",
      user: "user1",
      transportMode: "Bicycle",
      sustainableDistance: 5,
      usedReusableBag: true,
      avoidedPlasticCount: 3,
      recycledPlastic: true,
      turnedOffDevices: true,
      usedEfficientAppliances: "Yes",
      spentTimeOutdoors: true,
      wastedWater: false,
      proofImage: "",
      motivationText: "Felt good about reducing carbon footprint.",
      easeRating: 4,
      submittedAt: "2023-10-01"
    },
    {
      _id: "2",
      user: "user1",
      transportMode: "Public Transport",
      sustainableDistance: 10,
      usedReusableBag: false,
      avoidedPlasticCount: 1,
      recycledPlastic: true,
      turnedOffDevices: false,
      usedEfficientAppliances: "No / Not Sure",
      spentTimeOutdoors: false,
      wastedWater: true,
      proofImage: "",
      motivationText: "Wanted to save money.",
      easeRating: 3,
      submittedAt: "2023-10-02"
    },
    {
      _id: "3",
      user: "user1",
      transportMode: "Walk",
      sustainableDistance: 2,
      usedReusableBag: true,
      avoidedPlasticCount: 5,
      recycledPlastic: false,
      turnedOffDevices: true,
      usedEfficientAppliances: "Yes",
      spentTimeOutdoors: true,
      wastedWater: false,
      proofImage: "",
      motivationText: "Enjoyed walking today.",
      easeRating: 5,
      submittedAt: "2023-09-30" // Previous month
    }
  ],
  weeklyForms: [
    {
      _id: "1",
      user: "user1",
      ecoPurchases: true,
      reusedItems: true,
      avoidedPlastics: false,
      communityActivity: false,
      mealPlanning: true,
      submittedAt: "2023-10-07"
    },
    {
      _id: "2",
      user: "user1",
      ecoPurchases: false,
      reusedItems: true,
      avoidedPlastics: true,
      communityActivity: true,
      mealPlanning: false,
      submittedAt: "2023-09-14" // Previous month
    }
  ]
};

const SummarySection = () => {
  const [dailyData, setDailyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    // Simulate fetching data from backend
    setTimeout(() => {
      setDailyData(mockData.dailyForms);
      setWeeklyData(mockData.weeklyForms);
    }, 1000);
  }, []);

  // Helper function to filter data for the current month
  const getCurrentMonthData = (data) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed

    return data.filter((entry) => {
      const entryDate = new Date(entry.submittedAt);
      const entryYear = entryDate.getFullYear();
      const entryMonth = entryDate.getMonth() + 1;
      return entryYear === currentYear && entryMonth === currentMonth;
    });
  };

  // Filter data for "This Month"
  const currentMonthDailyData = getCurrentMonthData(dailyData);
  const currentMonthWeeklyData = getCurrentMonthData(weeklyData);

  // Calculate Totals for "This Month"
  const calculateTotals = (dailyData, weeklyData) => ({
    totalSustainableDistance: dailyData.reduce(
      (acc, curr) => acc + curr.sustainableDistance,
      0
    ),
    totalAvoidedPlastics: dailyData.reduce(
      (acc, curr) => acc + curr.avoidedPlasticCount,
      0
    ),
    totalRecycledPlastics: dailyData.filter((entry) => entry.recycledPlastic).length,
    totalTurnedOffDevices: dailyData.filter((entry) => entry.turnedOffDevices).length,
    totalSpentTimeOutdoors: dailyData.filter((entry) => entry.spentTimeOutdoors).length,
    totalEcoPurchases: weeklyData.filter((entry) => entry.ecoPurchases).length,
    totalReusedItems: weeklyData.filter((entry) => entry.reusedItems).length,
    totalCommunityActivities: weeklyData.filter((entry) => entry.communityActivity).length
  });

  const totalsThisMonth = calculateTotals(currentMonthDailyData, currentMonthWeeklyData);
  const totalsLifetime = calculateTotals(dailyData, weeklyData);

  // Card Component
  const StatCard = ({ title, value, icon }) => (
    <div className="bg-white rounded-3xl shadow-lg p-6 flex items-center space-x-4">
      <div className="text-4xl text-green-600">{icon}</div>
      <div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-2xl font-bold text-gray-700">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="p-8 space-y-12">
      {/* This Month Section */}
      <div>
        <h1 className="text-3xl font-bold text-center text-green-700 mb-8">This Month</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <StatCard
            title="Sustainable Distance (km)"
            value={totalsThisMonth.totalSustainableDistance.toFixed(2)}
            icon="🚴‍♂️"
          />
          <StatCard
            title="Avoided Plastics"
            value={totalsThisMonth.totalAvoidedPlastics}
            icon="♻️"
          />
          <StatCard
            title="Times Recycled Plastic"
            value={totalsThisMonth.totalRecycledPlastics}
            icon="🗑️"
          />
          <StatCard
            title="Times Turned Off Devices"
            value={totalsThisMonth.totalTurnedOffDevices}
            icon="🔌"
          />
          <StatCard
            title="Times Spent Outdoors"
            value={totalsThisMonth.totalSpentTimeOutdoors}
            icon="🌳"
          />
          <StatCard
            title="Eco-Friendly Purchases"
            value={totalsThisMonth.totalEcoPurchases}
            icon="🛍️"
          />
          <StatCard
            title="Items Reused"
            value={totalsThisMonth.totalReusedItems}
            icon="🔄"
          />
          <StatCard
            title="Community Activities"
            value={totalsThisMonth.totalCommunityActivities}
            icon="👥"
          />
        </div>
      </div>

      {/* Lifetime Section */}
      <div>
        <h1 className="text-3xl font-bold text-center text-green-700 mb-8">Lifetime</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <StatCard
            title="Sustainable Distance (km)"
            value={totalsLifetime.totalSustainableDistance.toFixed(2)}
            icon="🚴‍♂️"
          />
          <StatCard
            title="Avoided Plastics"
            value={totalsLifetime.totalAvoidedPlastics}
            icon="♻️"
          />
          <StatCard
            title="Times Recycled Plastic"
            value={totalsLifetime.totalRecycledPlastics}
            icon="🗑️"
          />
          <StatCard
            title="Times Turned Off Devices"
            value={totalsLifetime.totalTurnedOffDevices}
            icon="🔌"
          />
          <StatCard
            title="Times Spent Outdoors"
            value={totalsLifetime.totalSpentTimeOutdoors}
            icon="🌳"
          />
          <StatCard
            title="Eco-Friendly Purchases"
            value={totalsLifetime.totalEcoPurchases}
            icon="🛍️"
          />
          <StatCard
            title="Items Reused"
            value={totalsLifetime.totalReusedItems}
            icon="🔄"
          />
          <StatCard
            title="Community Activities"
            value={totalsLifetime.totalCommunityActivities}
            icon="👥"
          />
        </div>
      </div>
    </div>
  );
};

export default SummarySection;
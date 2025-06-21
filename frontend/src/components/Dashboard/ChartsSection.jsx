// chartsSection.jsx
import React, { useState, useEffect } from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Cell,
  Legend
} from "recharts";

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
      submittedAt: "2023-10-03"
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
      submittedAt: "2023-10-14"
    }
  ]
};

const ChartsSection = () => {
  const [dailyData, setDailyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    // Simulate fetching data from backend
    setTimeout(() => {
      setDailyData(mockData.dailyForms);
      setWeeklyData(mockData.weeklyForms);
    }, 1000);
  }, []);

  // Aggregate weekly data for pie chart
  const weeklySummary = weeklyData.reduce(
    (acc, curr) => {
      acc.ecoPurchases += curr.ecoPurchases ? 1 : 0;
      acc.reusedItems += curr.reusedItems ? 1 : 0;
      acc.avoidedPlastics += curr.avoidedPlastics ? 1 : 0;
      acc.communityActivity += curr.communityActivity ? 1 : 0;
      acc.mealPlanning += curr.mealPlanning ? 1 : 0;
      return acc;
    },
    {
      ecoPurchases: 0,
      reusedItems: 0,
      avoidedPlastics: 0,
      communityActivity: 0,
      mealPlanning: 0
    }
  );

  // Heatmap data
  const heatmapData = dailyData.map((entry, index) => ({
    day: `Day ${index + 1}`,
    easeRating: entry.easeRating
  }));

  // Custom Chart Wrapper
  const ChartWrapper = ({ title, children }) => (
    <div
      className="w-full bg-white rounded-3xl p-6"
      style={{
        boxShadow:
          "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px -4px 6px -1px rgba(0, 0, 0, 0.1)"
      }}
    >
      <h3 className="text-xl font-semibold text-gray-700 mb-4">{title}</h3>
      <div className="h-96">{children}</div>
    </div>
  );

  return (
    <div className="p-8 space-y-12">
      <h1 className="text-3xl font-bold text-center text-green-700">Sustainability Dashboard</h1>

      {/* Sustainable Distance Chart */}
      <ChartWrapper title="Sustainable Distance Over Time">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={dailyData}>
            <XAxis dataKey="submittedAt" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="sustainableDistance"
              stroke="#34C759"
              strokeWidth={3}
              dot={{ r: 5, fill: "#34C759" }}
              activeDot={{ r: 8, fill: "#34C759" }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </ChartWrapper>

      {/* Plastic Avoidance Chart */}
      <ChartWrapper title="Plastic Avoidance Trends">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={dailyData}>
            <XAxis dataKey="submittedAt" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Tooltip />
            <Legend />
            <Bar dataKey="avoidedPlasticCount" fill="#FFA726" barSize={30} radius={[4, 4, 0, 0]} />
          </RechartsBarChart>
        </ResponsiveContainer>
      </ChartWrapper>

      {/* Weekly Activities Pie Chart */}
      <ChartWrapper title="Weekly Sustainability Activities">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={[
                { name: "Eco Purchases", value: weeklySummary.ecoPurchases },
                { name: "Reused Items", value: weeklySummary.reusedItems },
                { name: "Avoided Plastics", value: weeklySummary.avoidedPlastics },
                { name: "Community Activity", value: weeklySummary.communityActivity },
                { name: "Meal Planning", value: weeklySummary.mealPlanning }
              ]}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#4CAF50"
              dataKey="value"
            >
              {[
                "#4CAF50",
                "#FFC107",
                "#2196F3",
                "#9C27B0",
                "#FF5722"
              ].map((color, index) => (
                <Cell key={`cell-${index}`} fill={color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </RechartsPieChart>
        </ResponsiveContainer>
      </ChartWrapper>

      {/* Ease Rating Heatmap */}
      <ChartWrapper title="Ease Rating Heatmap">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={heatmapData}>
            <XAxis dataKey="day" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Tooltip />
            <Legend />
            <Bar dataKey="easeRating" fill="#E91E63" barSize={30} radius={[4, 4, 0, 0]} />
          </RechartsBarChart>
        </ResponsiveContainer>
      </ChartWrapper>

      {/* Overall Sustainability Radar Chart */}
      <ChartWrapper title="Overall Sustainability Score">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="80%"
            data={[
              { subject: "Transport", A: 80 },
              { subject: "Plastic", A: 60 },
              { subject: "Energy", A: 70 },
              { subject: "Water", A: 50 },
              { subject: "Community", A: 90 }
            ]}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" stroke="#8884d8" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name="Sustainability"
              dataKey="A"
              stroke="#4CAF50"
              fill="#4CAF50"
              fillOpacity={0.6}
            />
            <Tooltip />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </div>
  );
};

export default ChartsSection;
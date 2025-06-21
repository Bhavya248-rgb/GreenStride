import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

// Mock Data Embedded in the Same File
const userImpactData = {
  regions: [
    {
      name: "Tokyo",
      coordinates: [35.6895, 139.6917], // Latitude, Longitude
      userMetrics: {
        totalUsers: 1200,
        co2Saved: 50000, // kg
        waterSaved: 200000, // liters
      },
    },
    {
      name: "Berlin",
      coordinates: [52.5200, 13.4050],
      userMetrics: {
        totalUsers: 800,
        co2Saved: 40000,
        waterSaved: 150000,
      },
    },
    {
      name: "Los Angeles",
      coordinates: [34.0522, -118.2437],
      userMetrics: {
        totalUsers: 2000,
        co2Saved: 80000,
        waterSaved: 300000,
      },
    },
  ],
};

// Generate Shades of Green Based on Impact Level
const getMarkerColor = (co2Saved) => {
  const intensity = Math.min(co2Saved / 100000, 1); // Normalize between 0 and 1
  const red = Math.floor(0 + (1 - intensity) * 255); // Darker green for higher impact
  const green = Math.floor(255);
  const blue = Math.floor(0 + (1 - intensity) * 100);
  return `rgb(${red}, ${green}, ${blue})`;
};

// Custom Marker Icons with Dynamic Colors
const getMarkerIcon = (color) => {
  return new Icon({
    iconUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${encodeURIComponent(
      color
    )}" width="30" height="30"><circle cx="12" cy="12" r="10"/></svg>`,
    iconSize: [30, 30],
  });
};

const NeighborhoodPulseMap = () => {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    // Simulate fetching data (using the embedded mock data)
    setTimeout(() => {
      setRegions(userImpactData.regions);
    }, 500); // Simulate a slight delay for realism
  }, []);

  return (
    <div className="flex flex-col items-center p-6 bg-green-800 rounded-lg shadow-lg border border-gray-700 w-full mt-12">
      {/* Section Title */}
      <div className="w-full flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white tracking-wide">Neighborhood Pulse</h2>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300">
          View Full Report
        </button>
      </div>

      {/* Map Container */}
      <div className="w-full h-[500px] relative rounded-lg overflow-hidden border border-gray-600 shadow-md">
        <MapContainer
          center={[35.6895, 139.6917]} // Default center (Tokyo)
          zoom={4}
          style={{ height: "100%", width: "100%" }}
        >
          {/* Dark Map Theme */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          {regions.map((region) => {
            const markerColor = getMarkerColor(region.userMetrics.co2Saved);

            return (
              <Marker
                key={region.name}
                position={region.coordinates}
                icon={getMarkerIcon(markerColor)}
              >
                <Popup>
                  <div className="text-sm">
                    <h3 className="font-bold">{region.name}</h3>
                    <p>Total Users: {region.userMetrics.totalUsers}</p>
                    <p>CO₂ Saved: {region.userMetrics.co2Saved} kg</p>
                    <p>Water Saved: {region.userMetrics.waterSaved} L</p>
                    <p>Plastic Avoided: {region.userMetrics.plasticAvoided} items</p>
                    <p>Air Quality Improvement: {region.userMetrics.airQualityImprovement}%</p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default NeighborhoodPulseMap;
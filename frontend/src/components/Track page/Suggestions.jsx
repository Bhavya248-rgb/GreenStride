import React from "react";

// Simulated backend response
const backendResponse = {
  result: `✅ AWARENESS:
1. Travel & Carbon Emissions: Driving a car, even for a relatively short distance of 70km, contributes to carbon emissions and air pollution.  Consider that car travel is one of the biggest contributors to individual carbon footprints.  While 70km might seem manageable, exploring alternative, lower-carbon options for some journeys could significantly reduce your impact.

2. Energy: You're doing great by turning off devices and using energy-efficient appliances! This significantly reduces your energy consumption and lowers your carbon footprint. Keep up the good work!

3. Plastic:  Although you avoided 2 single-use plastic items and recycled plastic,  your reliance on avoiding plastic rather than using reusable bags indicates room for improvement.  The production of single use plastics has a huge impact on the environment and causes significant pollution.

4. Water:  Excellent job on not wasting water today!  Conserving water is crucial for preserving our water resources and reducing the energy needed for water treatment and distribution.

🚀 SUGGESTIONS:
1. Plastic:  Start using reusable shopping bags consistently to completely eliminate single-use plastic bags from your routine.  This small change can make a big difference over time.  Consider also carrying a reusable water bottle and coffee cup to further reduce your plastic consumption.

2. Travel & Carbon Emissions: Explore alternative transportation methods for at least some of your car journeys.  Could you walk, cycle, use public transport, or carpool for some trips? Even a few changes could significantly lower your carbon footprint.

3. Others: Consider using more sustainable transport.  If the 70km is a regular daily commute, look into options like electric vehicles or public transport to lower your carbon emissions substantially.`
};

// Extract awareness and suggestion data
const parseBackendResult = (result) => {
  const [awarenessRaw, suggestionsRaw] = result.split("🚀 SUGGESTIONS:");
  const awarenessItems = extractItems(awarenessRaw);
  const suggestionItems = extractItems(suggestionsRaw);
  return { awarenessItems, suggestionItems };
};

const extractItems = (text) => {
  return text
    .split(/\n\d+\.\s+/)
    .filter(Boolean)
    .map((item) => {
      const [title, ...rest] = item.split(":");
      return {
        category: title.trim(),
        description: rest.join(":").trim(),
      };
    });
};

// Icons based on category
const getIcon = (category) => {
  switch (category) {
    case "Travel & Carbon Emissions":
      return "🚗";
    case "Energy":
      return "💡";
    case "Plastic":
      return "🛍";
    case "Water":
      return "💧";
    case "Others":
      return "🌿";
    default:
      return "🔍";
  }
};

const Suggestions = () => {
  const { awarenessItems, suggestionItems } = parseBackendResult(backendResponse.result);

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 via-blue-50 to-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 space-y-12">

        {/* Awareness Section */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-green-500">
          <h3 className="text-3xl font-bold text-green-700 mb-6 flex items-center gap-3">
            🌱 Awareness
          </h3>
          <div className="space-y-6">
            {awarenessItems.map((item, index) => (
              <Item
                key={index}
                icon={getIcon(item.category)}
                title={item.category}
                text={item.description}
              />
            ))}
          </div>
        </div>

        {/* Suggestions Section */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-blue-500">
          <h3 className="text-3xl font-bold text-blue-700 mb-6 flex items-center gap-3">
            🚀 Suggestions
          </h3>
          <div className="space-y-6">
            {suggestionItems.map((item, index) => (
              <Item
                key={index}
                icon={getIcon(item.category)}
                title={item.category}
                text={item.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Reusable item display
const Item = ({ icon, title, text }) => (
  <div className="flex items-start gap-4">
    <div className="text-2xl mt-1">{icon}</div>
    <div>
      <h4 className="font-semibold text-gray-800">{title}</h4>
      <p className="text-gray-600">{text}</p>
    </div>
  </div>
);

export default Suggestions;
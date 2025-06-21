import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";

const TrackWeek = () => {
  const [isExpanded, setIsExpanded] = useState(false); // State to toggle card expansion
  const [formData, setFormData] = useState({
    sustainableProducts: false,
    donatedUpcycled: false,
    avoidedPlastics: false,
    participatedCleanup: false,
    plannedMeals: false,
    additionalNotes: "",
  });

  const { backendUrl } = useContext(AppContext);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Simulate sending data to the backend
      const response = await axios.post(`${backendUrl}/api/track-week`, formData);

      if (response.data.success) {
        toast.success("Your weekly sustainable actions have been logged successfully!");
        setIsExpanded(false); // Collapse the card after submission
        setFormData({
          sustainableProducts: false,
          donatedUpcycled: false,
          avoidedPlastics: false,
          participatedCleanup: false,
          plannedMeals: false,
          additionalNotes: "",
        });
      } else {
        toast.error(response.data.message || "Failed to log your actions.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Card Container */}
      <div
        className={`bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-300 ${
          isExpanded ? "p-8" : "p-4"
        }`}
      >
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-green-700">Track Your Weekly Impact 🌱</h2>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-green-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-700 transition-colors"
          >
            {isExpanded ? "Collapse" : "Track Week"}
          </button>
        </div>

        {/* Form Section (Hidden by Default) */}
        {isExpanded && (
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {/* Eco-Friendly Purchases */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-green-800">♻️ Eco-Friendly Purchases</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="sustainableProducts"
                    checked={formData.sustainableProducts}
                    onChange={handleChange}
                    className="form-checkbox text-green-600"
                  />
                  <span className="text-gray-700">
                    Did you buy any sustainable or local products this week?
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="donatedUpcycled"
                    checked={formData.donatedUpcycled}
                    onChange={handleChange}
                    className="form-checkbox text-green-600"
                  />
                  <span className="text-gray-700">
                    Did you donate, upcycle, or reuse any items this week?
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="avoidedPlastics"
                    checked={formData.avoidedPlastics}
                    onChange={handleChange}
                    className="form-checkbox text-green-600"
                  />
                  <span className="text-gray-700">
                    Did you avoid single-use plastics or reduce packaging waste?
                  </span>
                </label>
              </div>
            </div>

            {/* Community Actions */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-green-800">🌍 Community Actions</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="participatedCleanup"
                    checked={formData.participatedCleanup}
                    onChange={handleChange}
                    className="form-checkbox text-green-600"
                  />
                  <span className="text-gray-700">
                    Did you participate in any community clean-up or environmental awareness activity?
                  </span>
                </label>
              </div>
            </div>

            {/* Food Waste & Composting */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-green-800">🍽️ Food Waste & Composting</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="plannedMeals"
                    checked={formData.plannedMeals}
                    onChange={handleChange}
                    className="form-checkbox text-green-600"
                  />
                  <span className="text-gray-700">
                    Did you plan meals to avoid food waste or compost leftovers?
                  </span>
                </label>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-green-800">📝 Additional Notes</h3>
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Share any additional thoughts or actions..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TrackWeek;
import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";

const TrackToday = () => {
  const [isExpanded, setIsExpanded] = useState(false); // State to toggle card expansion
  const [formData, setFormData] = useState({
    transportMode: "",
          SustainableDistance: 0,
          usedReusableBag: false,
          avoidedPlasticCount: 0,
          recycledPlastic: false,
          turnedOffDevices: false,
          usedEfficientAppliances: false,
          spentTimeOutdoors: 0,
          wastedWater: false,
          motivationText: "",
          easeRating: 3,
  });

  const { backendUrl, token } = useContext(AppContext);

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
      // const response = await axios.post(`${backendUrl}/api/form/submit`, formData);
      const response = await axios.post(
        `${backendUrl}/api/form/submit`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      if (response.data.success) {
        toast.success("Your sustainable actions have been logged successfully!");
        setIsExpanded(false); // Collapse the card after submission
        setFormData({
          transportMode: "",
          SustainableDistance: 0,
          usedReusableBag: false,
          avoidedPlasticCount: 0,
          recycledPlastic: false,
          turnedOffDevices: false,
          usedEfficientAppliances: false,
          spentTimeOutdoors: 0,
          wastedWater: false,
          motivationText: "",
          easeRating: 3,
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
        className={`bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-300 ${isExpanded ? "p-8" : "p-4"
          }`}
      >
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-green-700">Track Your Impact 🌱</h2>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-green-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-700 transition-colors"
          >
            {isExpanded ? "Collapse" : "Track Today"}
          </button>
        </div>

        {/* Form Section (Hidden by Default) */}
        {isExpanded && (
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {/* Commute & Travel */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-green-800">Commute & Travel</h3>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  What mode of transport did you use today?
                </label>
                <div className="flex flex-wrap gap-4">
                  {[
                    "Walk",
                    "Bicycle",
                    "Public Transport",
                    "Electric Vehicle",
                    "Car / Bike (Petrol/Diesel)",
                    "Carpool / Ride-share",
                  ].map((mode) => (
                    <label key={mode} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="transportMode"
                        value={mode}
                        onChange={handleChange}
                        className="form-radio text-green-600"
                      />
                      <span className="text-gray-700">{mode}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Approximate distance traveled sustainably today (in km)?
                </label>
                <input
                  type="number"
                  name="sustainableDistance"
                  value={formData.sustainableDistance}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter distance in km"
                />
              </div>
            </div>

            {/* Plastic Usage */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-green-800">Plastic Usage</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="usedReusableBag"
                    usedReusableBag="Boolean"
                  checked={formData.usedReusableBag}
                  onChange={handleChange}
                  className="form-checkbox text-green-600"
                  />
                  <span className="text-gray-700">Did you use a reusable bag or container today?</span>
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  How many single-use plastic items did you avoid today?
                </label>
                <input
                  type="number"
                  name="avoidedPlasticCount"            
                  value={formData.avoidedPlasticCount}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-green-600"
                />
                <span className="text-center block text-gray-700">{formData.avoidedPlastic}</span>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="recycledPlastic"
                    checked={formData.recycledPlastic}
                    onChange={handleChange}
                    className="form-checkbox text-green-600"
                  />
                  <span className="text-gray-700">Did you recycle or dispose of plastic responsibly today?</span>
                </label>
              </div>
            </div>

            {/* Energy Saving */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-green-800">Energy Saving</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="turnedOffDevices"
                    checked={formData.turnedOffDevices}
                    onChange={handleChange}
                    className="form-checkbox text-green-600"
                  />
                  <span className="text-gray-700">Did you turn off unused lights and electronics today?</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="usedEfficientAppliances"
                    checked={formData.usedEfficientAppliances}
                    onChange={handleChange}
                    className="form-checkbox text-green-600"
                  />
                  <span className="text-gray-700">Did you use energy-efficient appliances today?</span>
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Did you spend time outdoors (instead of screen time)?
                </label>
                <input
                  type="number"
                  name="spentTimeOutdoors"
                  value={formData.spentTimeOutdoors}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter distance in km"
                />
                {/* <label className="flex items-center gap-2"> */}
                {/* <input */}
                {/* // type="checkbox" */}
                {/* // name="spentTimeOutdoors" */}
                {/* // checked={formData.spentTimeOutdoors} */}
                {/* // onChange={handleChange} */}
                {/* // className="form-checkbox text-green-600" */}
                {/* /> */}
                {/* <span className="text-gray-700">Did you spend time outdoors (instead of screen time)?</span> */}
                {/* </label> */}
              </div>
            </div>

            {/* Water Usage */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-green-800">Water Usage</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="wastedWater"
                    checked={formData.wastedWater}
                    onChange={handleChange}
                    className="form-checkbox text-green-600"
                  />
                  <span className="text-gray-700">Did you waste water today?</span>
                </label>
              </div>
            </div>

            {/* Bonus Questions */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  What motivated you today to live sustainably?
                </label>
                <textarea
                  name="motivationText"
                  value={formData.motivationText}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Share your thoughts..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  On a scale of 1–5, how easy was it to take eco-friendly actions today?
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setFormData({ ...formData, easeRating: rating })}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${formData.easeRating === rating
                          ? "bg-green-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              </div>
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

export default TrackToday;
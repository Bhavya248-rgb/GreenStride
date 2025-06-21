import React, { useState } from "react";

const TrackMonth = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    planted_trees: false,
    trees_nurtured: 0,
    composted_food_scraps: false,
    organic_waste_composted: "None",
    participated_cleanup: false,
    volunteer_hours: 0,
    educated_others: false,
    home_improvements: false,
    improvements_made: [],
    unplugged_devices: false,
    donated_to_causes: false,
    donation_amount: 0,
    advocated_policy_changes: false,
    bought_sustainable_products: false,
    avoided_fast_fashion: false,
    shopped_second_hand: false,
    met_goals: false,
    challenges_faced: "",
    new_habits: "",
    proof_upload: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    console.log("Submitting Month's Data:", formData);
    setIsOpen(false); // Collapse after submission
  };

  return (
    <div className="mb-8">
      {/* Section Header */}
      <div
        className="bg-purple-100 p-4 rounded-t-lg cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-semibold text-purple-700">Track Month 🌍</h3>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>
      {/* Collapsible Content */}
      {isOpen && (
        <div className="bg-white p-6 rounded-b-lg shadow-md space-y-6">
          {/* Nature & Biodiversity */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">🌳 Nature & Biodiversity</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Did you plant a tree or care for plants this month?</label>
                <div className="flex gap-4">
                  <label>
                    <input
                      type="radio"
                      name="planted_trees"
                      value={true}
                      checked={formData.planted_trees === true}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="planted_trees"
                      value={false}
                      checked={formData.planted_trees === false}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-gray-700">How many trees/plants did you nurture or plant?</label>
                <input
                  type="number"
                  name="trees_nurtured"
                  placeholder="Number of trees/plants"
                  className="w-full p-3 border border-gray-300 rounded"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-gray-700">Did you compost food scraps or organic waste this month?</label>
                <div className="flex gap-4">
                  <label>
                    <input
                      type="radio"
                      name="composted_food_scraps"
                      value={true}
                      checked={formData.composted_food_scraps === true}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="composted_food_scraps"
                      value={false}
                      checked={formData.composted_food_scraps === false}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-gray-700">How much organic waste did you compost?</label>
                <select
                  name="organic_waste_composted"
                  className="w-full p-3 border border-gray-300 rounded"
                  onChange={handleInputChange}
                >
                  <option value="None">None</option>
                  {/* <option value="<1kg"><1kg</option> */}
                  <option value="1–5kg">1–5kg</option>
                  {/* <option value=">5kg">>5kg</option> */}
                </select>
              </div>
            </div>
          </div>

          {/* Community Engagement */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">🎉 Community Engagement</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">
                  Did you participate in any community cleanups or events this month?
                </label>
                <div className="flex gap-4">
                  <label>
                    <input
                      type="radio"
                      name="participated_cleanup"
                      value={true}
                      checked={formData.participated_cleanup === true}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="participated_cleanup"
                      value={false}
                      checked={formData.participated_cleanup === false}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-gray-700">
                  How many hours did you volunteer for sustainability-related activities?
                </label>
                <input
                  type="number"
                  name="volunteer_hours"
                  placeholder="Hours volunteered"
                  className="w-full p-3 border border-gray-300 rounded"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-gray-700">Did you educate someone about sustainability this month?</label>
                <div className="flex gap-4">
                  <label>
                    <input
                      type="radio"
                      name="educated_others"
                      value={true}
                      checked={formData.educated_others === true}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="educated_others"
                      value={false}
                      checked={formData.educated_others === false}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Home Sustainability */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">🏠 Home Sustainability</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">
                  Did you make any home improvements to reduce energy/water usage this month?
                </label>
                <div className="flex gap-4">
                  <label>
                    <input
                      type="radio"
                      name="home_improvements"
                      value={true}
                      checked={formData.home_improvements === true}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="home_improvements"
                      value={false}
                      checked={formData.home_improvements === false}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-gray-700">What improvements did you make?</label>
                <select
                  name="improvements_made"
                  multiple
                  className="w-full p-3 border border-gray-300 rounded"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      improvements_made: Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      ),
                    }))
                  }
                >
                  <option value="Installed Solar Panels">Installed Solar Panels</option>
                  <option value="Switched to LED Bulbs">Switched to LED Bulbs</option>
                  <option value="Added Insulation">Added Insulation</option>
                  <option value="Installed Low-Flow Fixtures">Installed Low-Flow Fixtures</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700">
                  Did you unplug chargers/devices when not in use consistently this month?
                </label>
                <div className="flex gap-4">
                  <label>
                    <input
                      type="radio"
                      name="unplugged_devices"
                      value={true}
                      checked={formData.unplugged_devices === true}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="unplugged_devices"
                      value={false}
                      checked={formData.unplugged_devices === false}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Global Impact */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">🌍 Global Impact</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">
                  Did you donate to or support any environmental causes this month?
                </label>
                <div className="flex gap-4">
                  <label>
                    <input
                      type="radio"
                      name="donated_to_causes"
                      value={true}
                      checked={formData.donated_to_causes === true}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="donated_to_causes"
                      value={false}
                      checked={formData.donated_to_causes === false}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-gray-700">How much did you contribute (if applicable)?</label>
                <input
                  type="number"
                  name="donation_amount"
                  placeholder="$ Amount"
                  className="w-full p-3 border border-gray-300 rounded"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-gray-700">
                  Did you advocate for policy changes or sign petitions related to sustainability this month?
                </label>
                <div className="flex gap-4">
                  <label>
                    <input
                      type="radio"
                      name="advocated_policy_changes"
                      value={true}
                      checked={formData.advocated_policy_changes === true}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="advocated_policy_changes"
                      value={false}
                      checked={formData.advocated_policy_changes === false}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Sustainable Spending */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">💰 Sustainable Spending</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">
                  Did you buy any sustainable or local products this month?
                </label>
                <div className="flex gap-4">
                  <label>
                    <input
                      type="radio"
                      name="bought_sustainable_products"
                      value={true}
                      checked={formData.bought_sustainable_products === true}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="bought_sustainable_products"
                      value={false}
                      checked={formData.bought_sustainable_products === false}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-gray-700">
                  Did you avoid fast fashion or unsustainable purchases this month?
                </label>
                <div className="flex gap-4">
                  <label>
                    <input
                      type="radio"
                      name="avoided_fast_fashion"
                      value={true}
                      checked={formData.avoided_fast_fashion === true}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="avoided_fast_fashion"
                      value={false}
                      checked={formData.avoided_fast_fashion === false}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-gray-700">
                  Did you shop second-hand or thrift this month?
                </label>
                <div className="flex gap-4">
                  <label>
                    <input
                      type="radio"
                      name="shopped_second_hand"
                      value={true}
                      checked={formData.shopped_second_hand === true}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="shopped_second_hand"
                      value={false}
                      checked={formData.shopped_second_hand === false}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Goal Reflection */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">🎯 Goal Reflection</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">
                  Did you meet your monthly sustainability goals?
                </label>
                <div className="flex gap-4">
                  <label>
                    <input
                      type="radio"
                      name="met_goals"
                      value={true}
                      checked={formData.met_goals === true}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="met_goals"
                      value={false}
                      checked={formData.met_goals === false}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-gray-700">
                  What challenges did you face this month in living sustainably?
                </label>
                <textarea
                  name="challenges_faced"
                  placeholder="Describe challenges..."
                  className="w-full p-3 border border-gray-300 rounded"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-gray-700">
                  What new habits would you like to adopt next month?
                </label>
                <textarea
                  name="new_habits"
                  placeholder="Describe new habits..."
                  className="w-full p-3 border border-gray-300 rounded"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Upload Proof */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">📸 Upload Proof (Optional)</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">
                  Upload a photo of any significant sustainable action this month:
                </label>
                <input
                  type="file"
                  name="proof_upload"
                  className="w-full p-3 border border-gray-300 rounded"
                  onChange={(e) => setFormData((prev) => ({ ...prev, proof_upload: e.target.files[0] }))}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="bg-purple-500 text-white px-6 py-3 rounded hover:bg-purple-600 transition-colors w-full"
          >
            Submit This Month’s Actions 🌍
          </button>
        </div>
      )}
    </div>
  );
};

export default TrackMonth;
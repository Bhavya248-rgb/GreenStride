import React, { useState, useContext } from "react";
import axios from "axios";

// Importing AppContext for token and backendUrl
import { AppContext } from "../context/AppContext";

const ProfilePage = () => {
  const { token, backendUrl } = useContext(AppContext);

  // Initial state for user data (simulated)
  const [userData, setUserData] = useState({
    profilePicture: "",
    name: "John Doe",
    username: "@johndoe",
    bio: "Eco-warrior saving the planet",
    location: "Berlin, Germany",
    email: "johndoe@example.com",
    password: "",
    notificationPreferences: {
      appNotifications: true,
      emailUpdates: true,
    },
    privacySettings: {
      profileVisibility: "Public",
      activityVisibility: "Friends Only",
    },
    connectedAccounts: ["Strava", "Fitbit"],
  });

  // State to toggle edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handler for nested object changes (e.g., notificationPreferences)
  const handleNestedChange = (section, key, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [key]: value,
      },
    }));
  };

  // Simulate saving data to the backend
  const saveProfile = async () => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/profile`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Profile updated successfully!");
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-12">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        Profile
      </h1>

      {/* Profile Overview */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            <img
              src={userData.profilePicture || "/default-avatar.png"}
              alt="Profile"
              className={`w-24 h-24 rounded-full object-cover border-2 border-green-500 ${
                !isEditing && "opacity-75 cursor-not-allowed"
              }`}
            />
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    profilePicture: URL.createObjectURL(e.target.files[0]),
                  })
                }
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />
            )}
          </div>

          {/* Details Section */}
          <div className="col-span-2 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                  !isEditing && "opacity-75 cursor-not-allowed"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username:
              </label>
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                  !isEditing && "opacity-75 cursor-not-allowed"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bio:
              </label>
              <textarea
                name="bio"
                value={userData.bio}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                  !isEditing && "opacity-75 cursor-not-allowed"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location:
              </label>
              <input
                type="text"
                name="location"
                value={userData.location}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                  !isEditing && "opacity-75 cursor-not-allowed"
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Account Settings
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address:
            </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                !isEditing && "opacity-75 cursor-not-allowed"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                !isEditing && "opacity-75 cursor-not-allowed"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notification Preferences:
            </label>
            <div className="space-y-2 mt-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={userData.notificationPreferences.appNotifications}
                  onChange={(e) =>
                    handleNestedChange(
                      "notificationPreferences",
                      "appNotifications",
                      e.target.checked
                    )
                  }
                  disabled={!isEditing}
                  className={`h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500 ${
                    !isEditing && "opacity-75 cursor-not-allowed"
                  }`}
                />
                <span className="ml-2 text-gray-700">App Notifications</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={userData.notificationPreferences.emailUpdates}
                  onChange={(e) =>
                    handleNestedChange(
                      "notificationPreferences",
                      "emailUpdates",
                      e.target.checked
                    )
                  }
                  disabled={!isEditing}
                  className={`h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500 ${
                    !isEditing && "opacity-75 cursor-not-allowed"
                  }`}
                />
                <span className="ml-2 text-gray-700">Email Updates</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-black font-medium ">
              Privacy Settings:
            </label>
            <div className="space-y-4 mt-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Profile Visibility:
                </label>
                <select
                  name="profileVisibility"
                  value={userData.privacySettings.profileVisibility}
                  onChange={(e) =>
                    handleNestedChange(
                      "privacySettings",
                      "profileVisibility",
                      e.target.value
                    )
                  }
                  disabled={!isEditing}
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                    !isEditing && "opacity-75 cursor-not-allowed"
                  }`}
                >
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Activity Visibility:
                </label>
                <select
                  name="activityVisibility"
                  value={userData.privacySettings.activityVisibility}
                  onChange={(e) =>
                    handleNestedChange(
                      "privacySettings",
                      "activityVisibility",
                      e.target.value
                    )
                  }
                  disabled={!isEditing}
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                    !isEditing && "opacity-75 cursor-not-allowed"
                  }`}
                >
                  <option value="Friends Only">Friends Only</option>
                  <option value="Public">Public</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Connected Accounts:
            </label>
            <ul className="list-disc pl-5 mt-2 text-gray-700">
              {userData.connectedAccounts.map((account, index) => (
                <li key={index}>{account}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Edit/Save Buttons */}
      <div className="flex justify-end space-x-4">
        {isEditing ? (
          <>
            <button
              onClick={saveProfile}
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
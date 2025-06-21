import Profile from '../models/profileModel.js';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';


// @desc    Create a user profile
// @route   POST /api/profile/create
// @access  Private (requires authentication)
const createProfile = asyncHandler(async (req, res) => {
    console.log("User ID:",req);
    const userId = req.user.id;
    console.log("User ID:",userId);
  try {
    const {
        name,
      username,
      email,
      profileImage,
      bio,
      location,
      notificationPreferences,
      privacySettings,
      connectedAccounts
    } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // const existingProfile = await Profile.findOne({ user: userId });
    // if (existingProfile) return res.status(400).json({ error: 'Profile already exists for this user.' });

    const newProfile = new Profile({
      user: userId,
      name,
      username,
      email,
    //   password: user.password, // already hashed
      profileImage,
      bio,
      location,
      notificationPreferences: {
        appNotifications: notificationPreferences?.appNotifications ?? true,
        emailUpdates: notificationPreferences?.emailUpdates ?? true,
      },
      privacySettings: {
        profileVisibility: privacySettings?.profileVisibility ?? 'public',
        activityVisibility: privacySettings?.activityVisibility ?? 'public',
      },
      connectedAccounts: {
        strava: connectedAccounts?.strava || '',
        fitbit: connectedAccounts?.fitbit || '',
        facebook: connectedAccounts?.facebook || '',
        instagram: connectedAccounts?.instagram || ''
      }
      
    });

    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    console.error("ERROR:",error);
    res.status(500).json({ error: 'Server error while creating profile' });
  }
});

const getAllProfiles = async (req, res) => {
    try {
      const profiles = await Profile.find();
      res.status(200).json(profiles);
    } catch (error) {
      res.status(500).json({ error: 'Server error while fetching profiles' });
    }
  };
  
  const getProfileByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
      const profile = await Profile.findOne({ user: userId }).populate('user', 'name email');
      if (!profile) return res.status(404).json({ error: 'Profile not found' });
      res.status(200).json(profile);
    } catch (error) {
        console.error("ERROR:",error);
      res.status(500).json({ error: 'Server error while fetching profile' });
    }
  };
  

export default {createProfile,getAllProfiles,getProfileByUserId};
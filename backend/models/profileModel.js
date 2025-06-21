// models/User.js
import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to your existing User model
    required: true
    },
  name: String,
  username: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  // password: String, // hashed

  profileImage: String,
  bio: String,
  location: String,

  notificationPreferences: {
    appNotifications: { type: Boolean, default: true },
    emailUpdates: { type: Boolean, default: true }
  },

  privacySettings: {
    profileVisibility: { type: String, enum: ['public', 'private'], default: 'public' },
    activityVisibility: { type: String, enum: ['public', 'friends'], default: 'public' }
  },

  connectedAccounts: {
    strava: String,
    fitbit: String,
    facebook: String,
    instagram: String,
    // Add more as needed
  },
  greenPoints : Number,
  streak : Number,

  createdAt: { type: Date, default: Date.now }
});

const Profile = mongoose.model('Profile', ProfileSchema);
export default Profile;



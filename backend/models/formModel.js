
import mongoose from 'mongoose';
// import User from './userModel.js'; // Import the User model

const formSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to your existing User model
    required: true
  },
  transportMode: String,
  sustainableDistance: Number,
  usedReusableBag: Boolean,
  avoidedPlasticCount: Number,
  recycledPlastic: Boolean,
  turnedOffDevices: Boolean,
  usedEfficientAppliances: String,
  spentTimeOutdoors: Boolean,
  wastedWater: Boolean,
  proofImage: String,
  motivationText: String,
  easeRating: Number,
  weeklyResponses: {
    ecoPurchases: Boolean,
    reusedItems: Boolean,
    avoidedPlastics: Boolean,
    communityActivity: Boolean,
    mealPlanning: Boolean
  },
  
  submittedAt: { type: Date, default: Date.now }
});

// module.exports = mongoose.model('SustainabilityForm', formSchema);
const Form = mongoose.model('Form', formSchema);
export default Form;

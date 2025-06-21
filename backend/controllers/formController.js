import Form from '../models/formModel.js';
import multer from 'multer';
import asyncHandler from "express-async-handler";
import axios from 'axios';
import Profile from '../models/profileModel.js';

const isSunday = () => new Date().getDay() === 0;

const submitForm = asyncHandler(async (req, res) => {
  console.log("Date:", new Date().getDay());
  try {
    console.log("Form Data:", req.body);
    const formData = req.body;
    const proofImage = req.file ? req.file.filename : null;
    const userId = req.user.id; // Assuming you have user ID from the token

    // Create a new form entry
    const newForm = new Form({
      user: userId,
      transportMode: formData.transportMode,
      sustainableDistance: formData.sustainableDistance,
      usedReusableBag: formData.usedReusableBag === 'true',
      avoidedPlasticCount: formData.avoidedPlasticCount,
      recycledPlastic: formData.recycledPlastic === 'true',
      turnedOffDevices: formData.turnedOffDevices === 'true',
      usedEfficientAppliances: formData.usedEfficientAppliances,
      spentTimeOutdoors: formData.spentTimeOutdoors === 'true',
      wastedWater: formData.wastedWater === 'true',
      proofImage: proofImage,
      motivationText: formData.motivationText,
      easeRating: parseInt(formData.easeRating)
    });

    if (isSunday()) {
      newForm.weeklyResponses = {
        ecoPurchases: formData.weekly_ecoPurchases === 'true',
        reusedItems: formData.weekly_reusedItems === 'true',
        avoidedPlastics: formData.weekly_avoidedPlastics === 'true',
        communityActivity: formData.weekly_communityActivity === 'true',
        mealPlanning: formData.weekly_mealPlanning === 'true'
      };
    }
    await newForm.save();

    await Profile.findByIdAndUpdate(
      user,
      { $inc: { greenPoints: 5 } }, // increment by 5
      { new: true, upsert: false }
    );

    res.status(201).json({ message: 'Form submitted successfully', form: newForm });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const FormAnalysis = asyncHandler(async (req, res) => {
  const API_KEY = process.env.GOOGLE_API_KEY; // Load API key from .env
  // const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText`;
  const ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";


  const formData = req.body;

  // Helper: Generate prompt and call Google AI API
  async function generateSuggestions(formData) {
    console.log('Form Data:', formData);
    console.log('API Key:', API_KEY);
    const prompt = `You are an eco-friendly assistant. A user has submitted a daily sustainability form. Based on their answers, generate:
    1. AWARENESS: Make them aware of the environmental impact of their actions in these 4 areas:
       - Travel and Carbon Emissions
       - Energy Usage
       - Plastic Usage
       - Water Usage
    2. SUGGESTIONS: Give suggestions for improvement only where they missed or could do better.
    Here is the user's data:
    {
  "transportMode": "${formData.transportMode}",
  "sustainableDistance": ${formData.sustainableDistance},
  "usedReusableBag": ${formData.usedReusableBag},
  "avoidedPlasticCount": ${formData.avoidedPlasticCount},
  "recycledPlastic": ${formData.recycledPlastic},
  "turnedOffDevices": ${formData.turnedOffDevices},
  "usedEfficientAppliances": ${formData.usedEfficientAppliances},
  "spentTimeOutdoors": ${formData.spentTimeOutdoors},
  "wastedWater": ${formData.wastedWater},
  "motivationText": "${formData.motivationText}",
  "easeRating": ${formData.easeRating},
}
    Format your output like this:
    ✅ AWARENESS:
    1. Travel & Carbon Emissions: ...
    2. Energy: ...
    3. Plastic: ...
    4. Water: ...
    🚀 SUGGESTIONS:
    1. Plastic: ...
    2. Water: ...
    3. Others (if applicable): ...
    Only suggest where action was missing or can be improved. Skip categories that are already positive.
  `;
    // const prompt = `You are an eco-friendly assistant. A user has submitted a daily sustainability form. Based on their answers, generate: 1. AWARENESS: Make them aware of the environmental impact of their actions in these 4 areas: - Travel and Carbon Emissions - Energy Usage - Plastic Usage - Water Usage 2. SUGGESTIONS: Provide suggestions for improvement only where they missed or could do better. Here is the user's data: { "transportMode": "${formData.transportMode}", "sustainableDistance": ${formData.sustainableDistance}, "usedReusableBag": ${formData.usedReusableBag}, "avoidedPlasticCount": ${formData.avoidedPlasticCount}, "recycledPlastic": ${formData.recycledPlastic}, "turnedOffDevices": ${formData.turnedOffDevices}, "usedEfficientAppliances": ${formData.usedEfficientAppliances}, "spentTimeOutdoors": ${formData.spentTimeOutdoors}, "wastedWater": ${formData.wastedWater}, "motivationText": "${formData.motivationText}", "easeRating": ${formData.easeRating} } Format your output like this: ✅ AWARENESS: • Travel & Carbon Emissions: ... • Energy: ... • Plastic: ... • Water: ... 🚀 SUGGESTIONS: • Plastic: ... • Water: ... • Others (if applicable): ... Only suggest where action was missing or can be improved. Skip categories that are already positive.`;
    // const{
    // const prompt = "You are an eco-friendly assistant. A user has submitted a daily sustainability form. Based on their answers, generate: 1. AWARENESS: Make them aware of the environmental impact of their actions in these 4 areas: - Travel and Carbon Emissions - Energy Usage - Plastic Usage - Water Usage 2. SUGGESTIONS: Provide suggestions for improvement only where they missed or could do better. Here is the user's data: {\"transportMode\": \"bike\", \"sustainableDistance\": 5, \"usedReusableBag\": true, \"avoidedPlasticCount\": 2, \"recycledPlastic\": true, \"turnedOffDevices\": true, \"usedEfficientAppliances\": true, \"spentTimeOutdoors\": true, \"wastedWater\": false, \"motivationText\": \"Trying to help the planet!\", \"easeRating\": 4} Format your output like this: ✅ AWARENESS: • Travel & Carbon Emissions: ... • Energy: ... • Plastic: ... • Water: ... 🚀 SUGGESTIONS: • Plastic: ... • Water: ... • Others (if applicable): ... Only suggest where action was missing or can be improved. Skip categories that are already positive.";
    // }
    // prompt = "Tell about Environmental sustainability";

    const payload = {
      contents: [{
        role: "user",
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 1.0,
        maxOutputTokens: 1000
      }
    };
    

    try {
      console.log('Prompt:', prompt);
      const response = await axios.post(
        ENDPOINT,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': process.env.GOOGLE_API_KEY,
          }
        }
      );
      // console.log('AI API response:', response);
      console.log('AI API response data:', response.data.candidates[0].content.parts[0].text);
      const resultText = response.data.candidates[0].content.parts[0].text;
      return resultText;
    } catch (error) {
      console.error('AI API error:', error.response?.data || error.message);
      throw new Error('AI generation failed');
    }
  }
  try {
    const analysisResult = await generateSuggestions(formData);
    res.status(200).json({ result: analysisResult });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// try {
// const forms = await Form.find({}).populate('user', 'username email'); // Populate user details
// res.status(200).json(forms);
// } catch (error) {
// console.error('Error fetching forms:', error);
// res.status(500).json({ message: 'Internal server error' });
// }


export default { submitForm, FormAnalysis };
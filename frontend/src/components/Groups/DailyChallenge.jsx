import React from 'react';

const DailyChallenge = ({ onLogSubmit, setImageProof }) => {
  const todaysChallenge = {
    question: "How many kilometers did you walk today?",
    tip: "Walking reduces your carbon footprint and keeps you healthy!",
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageProof(file);
    }
  };

  return (
    <section className="bg-white shadow-2xl rounded-3xl p-8 space-y-4 mx-4 mt-8">
      <h2 className="text-2xl font-bold text-gray-800">Group Challenge</h2>
      <p className="text-gray-700">{todaysChallenge.question}</p>
      <p className="text-sm text-gray-500 italic">{todaysChallenge.tip}</p>
      <div className="flex items-center space-x-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border border-gray-300 rounded p-2"
        />
        <button
          onClick={onLogSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
        >
          Submit Proof
        </button>
      </div>
    </section>
  );
};

export default DailyChallenge;
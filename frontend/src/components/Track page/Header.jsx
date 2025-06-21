import React from "react";

const Header = () => {
  return (
    <header
      className="bg-gradient-to-br from-green-600 to-green-800 text-white py-12 px-6 rounded-b-[4rem] shadow-lg"
    >
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">
        Track. Reduce. Reward. 🌱
        </h1>
        <p className="text-xl font-medium text-green-200">
          Log your sustainable actions and see your progress!
        </p>
      </div>
    </header>
  );
};

export default Header;
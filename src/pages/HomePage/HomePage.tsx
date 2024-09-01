import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Welcome to Mood Manager!
      </h1>
      <p className="text-lg text-gray-700 text-center mb-6">
        This page has been created to help you manage your mood effectively.
        Track your feelings and make informed decisions to improve your
        well-being.
      </p>
      <a
        href="/mood"
        className="bg-blue-600 text-white py-3 px-6 rounded-lg text-center font-medium transition-colors duration-300 hover:bg-blue-700"
      >
        View Your Notes
      </a>
    </div>
  );
};

export default HomePage;

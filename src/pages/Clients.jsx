import React from "react";

const Home = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-white px-6 text-center">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Agenda Pro</h1>
      <p className="text-lg text-gray-600 mb-8">
        A simple and smart scheduling tool for solo professionals.
      </p>
      <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition">
        Get Started
      </button>
    </section>
  );
};

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';

export default function WordWizard() {
  return (
    <div className="min-h-screen bg-purple-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-purple-600 mb-8">Word Wizard</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <p className="text-gray-600 mb-4">Game coming soon!</p>
        <Link 
          to="/" 
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Back to Arcade
        </Link>
      </div>
    </div>
  );
}
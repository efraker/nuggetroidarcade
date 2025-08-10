// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css'; // Make sure to import Tailwind's CSS

// Magic part: This automatically imports all game components
const gameModules = import.meta.glob('./games/**/*.jsx', { eager: true });

const games = Object.keys(gameModules).map((path) => {
  const name = path.split('/').slice(-2)[0]; // e.g., "word-wizard"
  const component = gameModules[path].default;
  return {
    path: `/${name}`,
    name: name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), // "Word Wizard"
    Component: component,
  };
});

// The main page that lists all the games
function GameMenu() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-5xl font-bold text-indigo-600 mb-8">Nuggetroid Arcade 🕹️</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map(game => (
          <Link key={game.path} to={game.path} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1">
            <h2 className="text-2xl font-semibold text-gray-800">{game.name}</h2>
            <p className="text-gray-500 mt-2">Click to play!</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

// The main App component that handles routing
export default function App() {
  return (
    <Router basename="/nuggetroidarcade/"> {/* IMPORTANT: Set basename for GitHub Pages */}
      <Routes>
        <Route path="/" element={<GameMenu />} />
        {/* eslint-disable-next-line no-unused-vars */}
        {games.map(({ path, Component: GameComponent }) => (
          <Route key={path} path={path} element={<GameComponent />} />
        ))}
      </Routes>
    </Router>
  );
}
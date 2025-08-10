// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NeonSign from './components/NeonSign'; // <-- IMPORT the new component
import './index.css';

// Magic part: This automatically imports all game components
const gameModules = import.meta.glob('./games/**/*.jsx', { eager: true });

const games = Object.keys(gameModules).map((path) => {
  const name = path.split('/').slice(-2)[0];
  const component = gameModules[path].default;
  return {
    path: `/${name}`,
    name: name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    Component: component,
  };
});

// The main page that lists all the games
function GameMenu() {
  return (
    // UPDATED: Switched to a dark theme to make the neon pop
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-8">
      {/* REPLACED the h1 with our NeonSign component */}
      <NeonSign />
      
      {/* UPDATED: Game links styled for a dark background */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map(game => (
          <Link key={game.path} to={game.path} className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-lg hover:shadow-2xl hover:shadow-indigo-500/50 transition-all transform hover:-translate-y-1">
            <h2 className="text-2xl font-semibold text-gray-100">{game.name}</h2>
            <p className="text-gray-400 mt-2">Click to play!</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

// The main App component that handles routing
export default function App() {
  return (
    // Your basename is preserved
    <Router basename="/nuggetroidarcade/">
      <Routes>
        <Route path="/" element={<GameMenu />} />
        {games.map(({ path, Component: GameComponent }) => (
          <Route key={path} path={path} element={<GameComponent />} />
        ))}
      </Routes>
    </Router>
  );
}
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NeonSign from './components/NeonSign';
import './index.css';

// --- SOUND SETUP ---
const soundFiles = [
  '/sounds/jump.mp3',
  '/sounds/laser.mp3',
  '/sounds/howl.mp3',
  '/sounds/explosion.mp3'
];

const hoverSound = new Audio();
hoverSound.volume = 0.4;

const playRandomHoverSound = () => {
  const randomSoundSrc = soundFiles[Math.floor(Math.random() * soundFiles.length)];
  hoverSound.src = randomSoundSrc;
  hoverSound.play().catch(e => console.error("Error playing sound:", e));
};

// --- GAME LOADER ---
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

// --- COMPONENTS ---
function GameMenu() {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center p-4 sm:p-8 overflow-hidden"
      style={{ fontFamily: "'Press Start 2P', cursive" }}
    >
      {/* Animated Starfield Background Elements */}
      <div className="stars"></div>
      <div className="twinkling"></div>

      {/* Main content, using z-10 to ensure it appears above the background */}
      <div className="relative z-10 flex flex-col items-center w-full">
        <NeonSign />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mt-4">
          {games.map(game => (
            <Link
              key={game.path}
              to={game.path}
              onMouseEnter={playRandomHoverSound}
              className="bg-gray-800/70 backdrop-blur-sm border border-indigo-500/50 p-6 rounded-lg shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-400/40 hover:bg-gray-700/80 transition-all transform hover:-translate-y-1.5"
            >
              <h2 className="text-xl font-semibold text-gray-100">{game.name}</h2>
              <p className="text-gray-400 text-sm mt-2">Click to play!</p>
            </Link>
          ))}
        </div>
      </div> {/* <-- FIX: This was the missing closing div tag */}
    </div>
  );
}

// The main App component that handles all the routing
export default function App() {
  return (
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
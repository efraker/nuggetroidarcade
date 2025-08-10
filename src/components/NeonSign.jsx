import React, { useEffect } from 'react';

// Neon color palette
const neonColors = [
    '#ff00de', // Magenta
    '#00f7ff', // Cyan
    '#f3ff64', // Lemon
    '#ff3333', // Red
    '#00ff9d', // Mint Green
    '#70ff00', // Lime Green
    '#ff9e00'  // Orange
];

function getRandomColor(colors) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

export default function NeonSign() {
  useEffect(() => {
    const root = document.documentElement;
    const randomColor1 = getRandomColor(neonColors);
    const randomColor2 = getRandomColor(neonColors);
    root.style.setProperty('--color1', randomColor1);
    root.style.setProperty('--color2', randomColor2);
  }, []);

  return (
    // This outer div is the frame
    <div className="neon-sign-frame mb-8">
      {/* This inner div is the sign's backing */}
      <div className="neon-sign-backing">
        <span className="line1">Nuggetroid</span>
        <span className="line2">Arcade</span>
      </div>
    </div>
  );
}
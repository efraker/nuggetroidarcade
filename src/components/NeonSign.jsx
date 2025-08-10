import React, { useEffect } from 'react';

// An array of vibrant neon colors
const neonColors = [
    '#ff00de', // Pink
    '#00f7ff', // Cyan
    '#f3ff64', // Yellow
    '#ff3333', // Red
    '#64ffda', // Turquoise
    '#70ff00'  // Lime Green
];

// Function to get a random item from an array
function getRandomColor(colors) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

export default function NeonSign() {
  // useEffect with an empty dependency array [] runs once when the component mounts
  useEffect(() => {
    const root = document.documentElement;
    
    // Pick two random colors from our array
    const randomColor1 = getRandomColor(neonColors);
    const randomColor2 = getRandomColor(neonColors);

    // Set the CSS variables on the root element
    root.style.setProperty('--color1', randomColor1);
    root.style.setProperty('--color2', randomColor2);
  }, []);

  return (
    <div className="neon-sign mb-8">
      <span className="line1">Nuggetroid</span>
      <span className="line2">Arcade</span>
    </div>
  );
}
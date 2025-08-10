import React from 'react';

/**
 * Confetti celebration effect for game completion
 * 
 * SEMANTIC CUE: Victory celebration particles
 * - Colorful particles falling from top
 * - Used for high scores, game completion, achievements
 * - Physics-based falling animation
 */
export const ConfettiEffect = ({ 
  particleCount = 20,
  colors = ['bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-purple-400'],
  duration = 3000 
}) => {
  // Generate random confetti pieces with different properties
  const confettiPieces = [...Array(particleCount)].map((_, i) => ({
    id: i,
    color: colors[i % colors.length],
    delay: Math.random() * 1000, // Stagger the start times
    horizontalOffset: Math.random() * 100, // Random horizontal position
    rotationSpeed: 180 + Math.random() * 360, // Varying rotation speeds
    fallDuration: 2000 + Math.random() * 1000, // Varying fall speeds
    size: Math.random() > 0.5 ? 'w-3 h-3' : 'w-2 h-2' // Random sizes
  }));

  return (
    <>
      {/* CSS Animation Definition */}
      <style jsx>{`
        @keyframes confettiFall {
          0% { 
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          10% { 
            opacity: 1;
          }
          90% { 
            opacity: 0.8;
          }
          100% { 
            transform: translateY(100vh) rotate(var(--rotation));
            opacity: 0;
          }
        }
        
        @keyframes confettiSway {
          0%, 100% { 
            transform: translateX(0px);
          }
          25% { 
            transform: translateX(-10px);
          }
          75% { 
            transform: translateX(10px);
          }
        }
      `}</style>
      
      {/* Confetti Particles */}
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className={`absolute ${piece.color} ${piece.size} rounded-sm`}
          style={{
            left: `${piece.horizontalOffset}%`,
            top: '-10px',
            '--rotation': `${piece.rotationSpeed}deg`,
            animation: `confettiFall ${piece.fallDuration}ms linear forwards, confettiSway 1s ease-in-out infinite`,
            animationDelay: `${piece.delay}ms`,
            zIndex: 90
          }}
        />
      ))}
      
      {/* Burst effect at the top */}
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2"
        style={{
          animation: 'confettiFall 0.5s ease-out forwards'
        }}
      >
        <div className="text-6xl">🎉</div>
      </div>
    </>
  );
};
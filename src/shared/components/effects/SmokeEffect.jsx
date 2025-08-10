import React from 'react';

/**
 * Smoke particle effect for incorrect answers
 * 
 * SEMANTIC CUE: Ninja smoke bomb effect
 * - Creates dispersing particles
 * - Used for wrong answers to show "missed strike"
 * - Configurable particle count and positioning
 */
export const SmokeEffect = ({ 
  particleCount = 6,
  baseColor = 'bg-gray-400',
  opacity = 'opacity-60' 
}) => {
  return (
    <>
      {/* CSS Animation Definition */}
      <style jsx>{`
        @keyframes smokeDisperse {
          0% { 
            opacity: 1; 
            transform: scale(0.3) rotate(0deg); 
          }
          50% { 
            opacity: 0.8; 
            transform: scale(1.2) rotate(180deg); 
          }
          100% { 
            opacity: 0; 
            transform: scale(2.5) rotate(360deg); 
          }
        }
        
        .smoke-particle {
          animation: smokeDisperse 0.8s ease-out forwards;
        }
      `}</style>
      
      {/* Smoke Particles */}
      {[...Array(particleCount)].map((_, i) => (
        <div
          key={`smoke-${i}`}
          className={`absolute w-6 h-6 ${baseColor} rounded-full ${opacity} smoke-particle`}
          style={{
            left: `${20 + i * 12}%`,
            top: `${30 + (Math.random() * 40)}%`,
            animationDelay: `${i * 0.1}s`,
            filter: 'blur(1px)'
          }}
        />
      ))}
      
      {/* Central smoke burst */}
      <div
        className={`absolute w-12 h-12 ${baseColor} rounded-full ${opacity}`}
        style={{
          left: '45%',
          top: '40%',
          animation: 'smokeDisperse 1s ease-out forwards',
          filter: 'blur(2px)'
        }}
      />
    </>
  );
};
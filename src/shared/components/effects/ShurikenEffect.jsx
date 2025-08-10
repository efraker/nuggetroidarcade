import React from 'react';

/**
 * Shuriken throwing effect for correct answers
 * 
 * SEMANTIC CUE: Ninja weapon throwing animation
 * - Flies across screen with spinning motion
 * - Used for correct answers to show "successful strike"
 * - Configurable trajectory and speed
 */
export const ShurikenEffect = ({ 
  symbol = '⭐',
  size = 'text-4xl',
  trajectory = 'straight' // 'straight', 'arc', 'diagonal'
}) => {
  const getTrajectoryAnimation = () => {
    switch(trajectory) {
      case 'arc':
        return {
          animation: 'shurikenArc 1s ease-out forwards',
          animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        };
      case 'diagonal':
        return {
          animation: 'shurikenDiagonal 0.8s ease-out forwards'
        };
      default:
        return {
          animation: 'shurikenStraight 1s ease-out forwards'
        };
    }
  };

  return (
    <>
      {/* CSS Animation Definitions */}
      <style jsx>{`
        @keyframes shurikenStraight {
          0% { 
            transform: translateX(-100px) rotate(0deg); 
            opacity: 0; 
          }
          20% { 
            opacity: 1; 
          }
          80% { 
            opacity: 1; 
          }
          100% { 
            transform: translateX(100vw) rotate(720deg); 
            opacity: 0; 
          }
        }
        
        @keyframes shurikenArc {
          0% { 
            transform: translateX(-100px) translateY(0px) rotate(0deg); 
            opacity: 0; 
          }
          20% { 
            opacity: 1; 
          }
          50% { 
            transform: translateX(50vw) translateY(-30px) rotate(360deg); 
            opacity: 1; 
          }
          100% { 
            transform: translateX(100vw) translateY(20px) rotate(720deg); 
            opacity: 0; 
          }
        }
        
        @keyframes shurikenDiagonal {
          0% { 
            transform: translateX(-50px) translateY(50px) rotate(0deg); 
            opacity: 0; 
          }
          20% { 
            opacity: 1; 
          }
          100% { 
            transform: translateX(100vw) translateY(-50px) rotate(540deg); 
            opacity: 0; 
          }
        }
        
        .shuriken {
          filter: drop-shadow(0 0 8px rgba(34, 197, 94, 0.6));
        }
      `}</style>
      
      {/* Main Shuriken */}
      <div
        className={`absolute top-1/2 left-0 ${size} text-green-400 shuriken`}
        style={{
          ...getTrajectoryAnimation(),
          zIndex: 100
        }}
      >
        {symbol}
      </div>
      
      {/* Trail Effect */}
      <div
        className={`absolute top-1/2 left-0 ${size} text-green-400 opacity-40`}
        style={{
          ...getTrajectoryAnimation(),
          animationDelay: '0.1s',
          zIndex: 99
        }}
      >
        {symbol}
      </div>
      
      {/* Secondary smaller shuriken for more impact */}
      <div
        className="absolute top-1/2 left-0 text-2xl text-yellow-400"
        style={{
          animation: 'shurikenStraight 1.2s ease-out forwards',
          animationDelay: '0.3s',
          zIndex: 98,
          filter: 'drop-shadow(0 0 6px rgba(234, 179, 8, 0.4))'
        }}
      >
        ✦
      </div>
    </>
  );
};
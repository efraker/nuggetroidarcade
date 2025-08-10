import React from 'react';

/**
 * Lightning flash effect for special achievements
 * 
 * SEMANTIC CUE: Dramatic lightning strike effect
 * - Bright flash with electric patterns
 * - Used for streaks, perfect scores, special achievements
 * - Creates dramatic moment emphasis
 */
export const LightningEffect = ({ 
  intensity = 'high', // 'low', 'medium', 'high'
  color = 'yellow' // 'yellow', 'blue', 'purple'
}) => {
  const getColorClasses = () => {
    switch(color) {
      case 'blue':
        return {
          main: 'bg-blue-400',
          glow: 'shadow-blue-400/50',
          border: 'border-blue-300'
        };
      case 'purple':
        return {
          main: 'bg-purple-400',
          glow: 'shadow-purple-400/50',
          border: 'border-purple-300'
        };
      default:
        return {
          main: 'bg-yellow-400',
          glow: 'shadow-yellow-400/50',
          border: 'border-yellow-300'
        };
    }
  };

  const colors = getColorClasses();

  return (
    <>
      {/* CSS Animation Definition */}
      <style jsx>{`
        @keyframes lightningFlash {
          0% { opacity: 0; transform: scaleY(0); }
          10% { opacity: 1; transform: scaleY(1); }
          20% { opacity: 0.8; transform: scaleY(0.9); }
          30% { opacity: 1; transform: scaleY(1); }
          40% { opacity: 0; transform: scaleY(0.8); }
          50% { opacity: 1; transform: scaleY(1); }
          100% { opacity: 0; transform: scaleY(0); }
        }
        
        @keyframes lightningBolt {
          0% { 
            opacity: 0; 
            transform: translateY(-100%) scaleX(0);
          }
          20% { 
            opacity: 1; 
            transform: translateY(-50%) scaleX(0.5);
          }
          40% { 
            opacity: 1; 
            transform: translateY(0%) scaleX(1);
          }
          60% { 
            opacity: 0.8; 
            transform: translateY(50%) scaleX(0.8);
          }
          100% { 
            opacity: 0; 
            transform: translateY(100%) scaleX(0);
          }
        }
        
        @keyframes screenFlash {
          0% { opacity: 0; }
          5% { opacity: 0.3; }
          10% { opacity: 0; }
          15% { opacity: 0.2; }
          20% { opacity: 0; }
        }
      `}</style>
      
      {/* Screen Flash Overlay */}
      <div
        className={`absolute inset-0 ${colors.main} pointer-events-none`}
        style={{
          animation: 'screenFlash 1s ease-out forwards',
          zIndex: 80
        }}
      />
      
      {/* Lightning Bolt - Vertical */}
      <div
        className={`absolute left-1/4 top-0 w-1 h-full ${colors.main} ${colors.glow} shadow-2xl`}
        style={{
          animation: 'lightningBolt 0.8s ease-out forwards',
          transformOrigin: 'top',
          filter: 'blur(0.5px)'
        }}
      />
      
      {/* Lightning Bolt - Diagonal */}
      <div
        className={`absolute right-1/3 top-0 w-0.5 h-full ${colors.main} ${colors.glow} shadow-xl`}
        style={{
          animation: 'lightningBolt 0.6s ease-out forwards',
          animationDelay: '0.2s',
          transformOrigin: 'top',
          transform: 'rotate(15deg)',
          filter: 'blur(0.5px)'
        }}
      />
      
      {/* Electric Sparks */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`spark-${i}`}
          className={`absolute w-2 h-2 ${colors.main} rounded-full`}
          style={{
            left: `${20 + i * 10}%`,
            top: `${30 + Math.random() * 40}%`,
            animation: 'lightningFlash 1.2s ease-out forwards',
            animationDelay: `${i * 0.05}s`,
            filter: 'blur(1px)',
            zIndex: 85
          }}
        />
      ))}
      
      {/* Central Lightning Symbol */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl"
        style={{
          animation: 'lightningFlash 0.8s ease-out forwards',
          filter: `drop-shadow(0 0 10px ${color === 'blue' ? '#60a5fa' : color === 'purple' ? '#c084fc' : '#facc15'})`,
          zIndex: 90
        }}
      >
        ⚡
      </div>
    </>
  );
};
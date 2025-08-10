import React from 'react';

/**
 * Animated score display component
 * 
 * SEMANTIC CUE: Score animation system
 * - Smoothly animates score changes
 * - Visual feedback for point increases
 * - Configurable animation styles and colors
 */
export const AnimatedScore = ({ 
  score, 
  isAnimating, 
  animationType = 'glow', // 'glow', 'scale', 'bounce', 'pulse'
  baseColor = 'text-indigo-400',
  animatedColor = 'text-green-400' 
}) => {
  const getAnimationClasses = () => {
    if (!isAnimating) return '';
    
    switch(animationType) {
      case 'scale':
        return 'scale-110 transition-transform duration-300';
      case 'bounce':
        return 'animate-bounce';
      case 'pulse':
        return 'animate-pulse scale-105';
      default: // 'glow'
        return 'scale-110 drop-shadow-lg transition-all duration-300';
    }
  };

  const getColorClass = () => {
    return isAnimating ? animatedColor : baseColor;
  };

  return (
    <>
      {/* CSS for custom animations */}
      <style jsx>{`
        @keyframes scoreIncrease {
          0% { 
            transform: scale(1);
            filter: drop-shadow(0 0 0px rgba(34, 197, 94, 0.6));
          }
          50% { 
            transform: scale(1.15);
            filter: drop-shadow(0 0 8px rgba(34, 197, 94, 0.8));
          }
          100% { 
            transform: scale(1);
            filter: drop-shadow(0 0 0px rgba(34, 197, 94, 0.6));
          }
        }
        
        .score-increase {
          animation: scoreIncrease 0.6s ease-out;
        }
      `}</style>
      
      <span 
        className={`
          ${getColorClass()} 
          ${getAnimationClasses()}
          font-bold
          ${isAnimating ? 'score-increase' : ''}
        `}
      >
        Score: {score.toLocaleString()}
      </span>
      
      {/* Score increase indicator */}
      {isAnimating && (
        <span 
          className="absolute ml-2 text-green-400 text-sm font-bold opacity-80"
          style={{
            animation: 'scoreIncrease 0.8s ease-out forwards'
          }}
        >
          +100
        </span>
      )}
    </>
  );
};
import React from 'react';

/**
 * Streak display component with visual progression
 * 
 * SEMANTIC CUE: Shows current streak with milestone progress
 * - Visual streak counter with fire effects
 * - Progress bar to next milestone
 * - Animated when streak increases
 */
export const StreakDisplay = ({ streakInfo, isAnimating = false }) => {
  const { current, level, nextMilestone, progress, remainingToNext } = streakInfo;
  
  const getStreakColor = () => {
    if (current >= 10) return 'text-red-400'; // Legendary
    if (current >= 5) return 'text-orange-400'; // On Fire
    if (current >= 3) return 'text-yellow-400'; // Hot Streak
    return 'text-indigo-400'; // Building
  };
  
  const getStreakEmoji = () => {
    if (current >= 10) return '🔥'; // Legendary
    if (current >= 5) return '⚡'; // On Fire
    if (current >= 3) return '✨'; // Hot Streak
    return '🎯'; // Building
  };

  return (
    <div className={`flex items-center gap-2 transition-all duration-300 ${isAnimating ? 'scale-110' : 'scale-100'}`}>
      {/* Streak Icon */}
      <span className="text-2xl">
        {getStreakEmoji()}
      </span>
      
      {/* Streak Counter */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span className={`font-bold text-lg ${getStreakColor()}`}>
            {current}
          </span>
          <span className="text-gray-400 text-sm">streak</span>
        </div>
        
        {/* Level Name */}
        {level.isActive && (
          <span className={`text-xs ${getStreakColor()} opacity-80`}>
            {level.name}
          </span>
        )}
      </div>
      
      {/* Progress to Next Milestone */}
      {nextMilestone && (
        <div className="flex flex-col items-center ml-2">
          <div className="text-xs text-gray-400 mb-1">
            {remainingToNext} to {nextMilestone}
          </div>
          <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full ${getStreakColor().replace('text-', 'bg-')} transition-all duration-500`}
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
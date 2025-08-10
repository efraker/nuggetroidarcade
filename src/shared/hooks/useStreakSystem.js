import { useState, useCallback, useEffect } from 'react';

/**
 * Shared streak and combo system for all arcade games
 * 
 * SEMANTIC CUE: This manages consecutive correct answers with escalating rewards
 * - Tracks current streak length
 * - Triggers special effects at milestone streaks (3, 5, 10, etc.)
 * - Integrates with audio-visual effects system
 * - Persists best streak as achievement data
 * 
 * Usage:
 * const { currentStreak, maxStreak, handleCorrectAnswer, handleIncorrectAnswer, getStreakLevel } = useStreakSystem();
 */
export const useStreakSystem = (onStreakMilestone) => {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(() => {
    // Load max streak from localStorage
    const saved = localStorage.getItem('maxStreak');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Streak milestone definitions
  const STREAK_MILESTONES = {
    3: { name: 'Hot Streak', effect: 'streak3', multiplier: 1.5 },
    5: { name: 'On Fire!', effect: 'streak5', multiplier: 2.0 },
    7: { name: 'Unstoppable', effect: 'streak5', multiplier: 2.5 },
    10: { name: 'Legendary', effect: 'streak10', multiplier: 3.0 },
    15: { name: 'Godlike', effect: 'streak10', multiplier: 4.0 },
    20: { name: 'Ninja Master', effect: 'streak10', multiplier: 5.0 }
  };

  /**
   * Get the current streak level and associated effects
   */
  const getStreakLevel = useCallback(() => {
    const milestones = Object.keys(STREAK_MILESTONES)
      .map(Number)
      .sort((a, b) => b - a); // Sort descending
    
    for (const milestone of milestones) {
      if (currentStreak >= milestone) {
        return {
          level: milestone,
          ...STREAK_MILESTONES[milestone],
          isActive: true
        };
      }
    }
    
    return { level: 0, name: 'Building...', multiplier: 1.0, isActive: false };
  }, [currentStreak]);

  /**
   * Handle correct answer - increment streak and check for milestones
   */
  const handleCorrectAnswer = useCallback((baseScore = 100) => {
    const newStreak = currentStreak + 1;
    setCurrentStreak(newStreak);
    
    // Update max streak if necessary
    if (newStreak > maxStreak) {
      setMaxStreak(newStreak);
      localStorage.setItem('maxStreak', newStreak.toString());
    }
    
    // Check for streak milestone
    const milestone = STREAK_MILESTONES[newStreak];
    if (milestone && onStreakMilestone) {
      onStreakMilestone(newStreak, milestone);
    }
    
    // Calculate bonus score based on streak
    const streakLevel = getStreakLevel();
    const bonusScore = Math.floor(baseScore * (streakLevel.multiplier - 1));
    
    return {
      streak: newStreak,
      bonusScore,
      totalScore: baseScore + bonusScore,
      milestone: milestone || null,
      streakLevel
    };
  }, [currentStreak, maxStreak, onStreakMilestone, getStreakLevel]);

  /**
   * Handle incorrect answer - reset streak
   */
  const handleIncorrectAnswer = useCallback(() => {
    setCurrentStreak(0);
    return {
      streak: 0,
      bonusScore: 0,
      streakLevel: { level: 0, name: 'Building...', multiplier: 1.0, isActive: false }
    };
  }, []);

  /**
   * Get streak display information
   */
  const getStreakDisplay = useCallback(() => {
    const level = getStreakLevel();
    const nextMilestone = Object.keys(STREAK_MILESTONES)
      .map(Number)
      .find(milestone => milestone > currentStreak);
    
    return {
      current: currentStreak,
      max: maxStreak,
      level,
      nextMilestone,
      progress: nextMilestone ? (currentStreak / nextMilestone) : 1,
      remainingToNext: nextMilestone ? (nextMilestone - currentStreak) : 0
    };
  }, [currentStreak, maxStreak, getStreakLevel]);

  /**
   * Reset streak system (useful for new games)
   */
  const resetStreak = useCallback(() => {
    setCurrentStreak(0);
  }, []);

  return {
    currentStreak,
    maxStreak,
    handleCorrectAnswer,
    handleIncorrectAnswer,
    getStreakLevel,
    getStreakDisplay,
    resetStreak,
    STREAK_MILESTONES
  };
};
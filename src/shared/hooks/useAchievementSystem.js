import { useState, useCallback, useEffect } from 'react';

/**
 * Shared achievement system for all arcade games
 * 
 * SEMANTIC CUE: This manages unlockable achievements with special celebrations
 * - Tracks progress toward various achievements
 * - Unlocks special emoji rain themes and effects
 * - Persists achievement data in localStorage
 * - Triggers celebration effects when achievements are earned
 * 
 * Usage:
 * const { achievements, checkAchievement, getUnlockedThemes } = useAchievementSystem();
 */
export const useAchievementSystem = (onAchievementUnlocked) => {
  const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
    const saved = localStorage.getItem('unlockedAchievements');
    return saved ? JSON.parse(saved) : [];
  });

  // Achievement definitions with unlock conditions and rewards
  const ACHIEVEMENTS = {
    // Score-based achievements
    first_blood: {
      id: 'first_blood',
      name: 'First Blood',
      description: 'Answer your first question correctly',
      condition: (stats) => stats.totalCorrect >= 1,
      reward: { type: 'theme', value: 'celebration' },
      icon: '🥷',
      rarity: 'common'
    },
    
    century: {
      id: 'century',
      name: 'Centurion',
      description: 'Answer 100 questions correctly',
      condition: (stats) => stats.totalCorrect >= 100,
      reward: { type: 'theme', value: 'roman' },
      icon: '🏛️',
      rarity: 'rare'
    },
    
    // Streak achievements
    streak_master: {
      id: 'streak_master',
      name: 'Streak Master',
      description: 'Get a 5-question streak',
      condition: (stats) => stats.maxStreak >= 5,
      reward: { type: 'theme', value: 'lightning' },
      icon: '⚡',
      rarity: 'uncommon'
    },
    
    unstoppable: {
      id: 'unstoppable',
      name: 'Unstoppable Force',
      description: 'Get a 10-question streak',
      condition: (stats) => stats.maxStreak >= 10,
      reward: { type: 'theme', value: 'legendary' },
      icon: '🔥',
      rarity: 'epic'
    },
    
    // Perfect game achievements
    flawless_american: {
      id: 'flawless_american',
      name: 'Flawless Victory',
      description: 'Complete American history without mistakes',
      condition: (stats) => stats.americanPerfect === true,
      reward: { type: 'theme', value: 'american_elite' },
      icon: '🦅',
      rarity: 'legendary'
    },
    
    // Speed achievements
    quick_draw: {
      id: 'quick_draw',
      name: 'Quick Draw',
      description: 'Answer 10 questions in under 30 seconds',
      condition: (stats) => stats.fastAnswers >= 10,
      reward: { type: 'effect', value: 'speed_boost' },
      icon: '💨',
      rarity: 'rare'
    },
    
    // Category mastery
    history_scholar: {
      id: 'history_scholar',
      name: 'History Scholar',
      description: 'Master all available categories',
      condition: (stats) => stats.categoriesCompleted >= 3,
      reward: { type: 'theme', value: 'scholar' },
      icon: '📚',
      rarity: 'epic'
    },
    
    // Word Wizard specific achievements
    spelling_bee: {
      id: 'spelling_bee',
      name: 'Spelling Bee Champion',
      description: 'Spell 50 words correctly',
      condition: (stats) => stats.wordsSpelled >= 50,
      reward: { type: 'theme', value: 'scholar' },
      icon: '🐝',
      rarity: 'rare'
    },
    
    word_streak_master: {
      id: 'word_streak_master',
      name: 'Word Streak Master',
      description: 'Get a 10-word spelling streak',
      condition: (stats) => stats.maxStreak >= 10,
      reward: { type: 'theme', value: 'lightning' },
      icon: '⚡',
      rarity: 'epic'
    },
    
    expert_speller: {
      id: 'expert_speller',
      name: 'Expert Speller',
      description: 'Successfully spell 10 expert difficulty words',
      condition: (stats) => stats.expertWords >= 10,
      reward: { type: 'theme', value: 'legendary' },
      icon: '🎓',
      rarity: 'legendary'
    },

    // Special achievements
    easter_egg: {
      id: 'easter_egg',
      name: 'Hidden Dragon',
      description: 'Find the secret ninja path',
      condition: (stats) => stats.secretFound === true,
      reward: { type: 'theme', value: 'dragon' },
      icon: '🐉',
      rarity: 'mythic'
    }
  };

  // Theme unlocks based on achievements
  const ACHIEVEMENT_THEMES = {
    celebration: ['🎉', '🎊', '⭐', '🏆', '🎆'],
    roman: ['🏛️', '⚔️', '🛡️', '🦅', '🏺'],
    lightning: ['⚡', '🌩️', '⚡', '💫', '✨'],
    legendary: ['🔥', '💎', '👑', '🌟', '🏆'],
    american_elite: ['🦅', '🇺🇸', '🗽', '⭐', '💎'],
    scholar: ['📚', '🎓', '📜', '🖋️', '🏛️'],
    dragon: ['🐉', '🔥', '⚡', '💎', '🌟']
  };

  /**
   * Save achievements to localStorage
   */
  const saveAchievements = useCallback((achievements) => {
    localStorage.setItem('unlockedAchievements', JSON.stringify(achievements));
  }, []);

  /**
   * Check if an achievement should be unlocked
   */
  const checkAchievement = useCallback((achievementId, gameStats) => {
    // Don't re-unlock already unlocked achievements
    if (unlockedAchievements.includes(achievementId)) {
      return false;
    }
    
    const achievement = ACHIEVEMENTS[achievementId];
    if (!achievement) return false;
    
    // Check if condition is met
    if (achievement.condition(gameStats)) {
      const newUnlocked = [...unlockedAchievements, achievementId];
      setUnlockedAchievements(newUnlocked);
      saveAchievements(newUnlocked);
      
      // Trigger celebration callback
      if (onAchievementUnlocked) {
        onAchievementUnlocked(achievement);
      }
      
      return true;
    }
    
    return false;
  }, [unlockedAchievements, onAchievementUnlocked, saveAchievements]);

  /**
   * Check multiple achievements at once
   */
  const checkMultipleAchievements = useCallback((gameStats) => {
    const newlyUnlocked = [];
    
    Object.keys(ACHIEVEMENTS).forEach(achievementId => {
      if (checkAchievement(achievementId, gameStats)) {
        newlyUnlocked.push(ACHIEVEMENTS[achievementId]);
      }
    });
    
    return newlyUnlocked;
  }, [checkAchievement]);

  /**
   * Get all unlocked emoji themes for effects
   */
  const getUnlockedThemes = useCallback(() => {
    const themes = { celebration: ACHIEVEMENT_THEMES.celebration }; // Default theme
    
    unlockedAchievements.forEach(achievementId => {
      const achievement = ACHIEVEMENTS[achievementId];
      if (achievement && achievement.reward.type === 'theme') {
        const themeKey = achievement.reward.value;
        if (ACHIEVEMENT_THEMES[themeKey]) {
          themes[themeKey] = ACHIEVEMENT_THEMES[themeKey];
        }
      }
    });
    
    return themes;
  }, [unlockedAchievements]);

  /**
   * Get achievement progress for display
   */
  const getAchievementProgress = useCallback((gameStats) => {
    return Object.values(ACHIEVEMENTS).map(achievement => {
      const isUnlocked = unlockedAchievements.includes(achievement.id);
      let progress = 0;
      
      // Calculate progress percentage (simplified)
      if (!isUnlocked) {
        // This is a simplified progress calculation
        // In a real implementation, you'd want more sophisticated progress tracking
        progress = achievement.condition(gameStats) ? 100 : 0;
      } else {
        progress = 100;
      }
      
      return {
        ...achievement,
        isUnlocked,
        progress
      };
    });
  }, [unlockedAchievements]);

  return {
    unlockedAchievements,
    checkAchievement,
    checkMultipleAchievements,
    getUnlockedThemes,
    getAchievementProgress,
    ACHIEVEMENTS,
    ACHIEVEMENT_THEMES
  };
};
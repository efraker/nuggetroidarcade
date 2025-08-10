/**
 * Centralized animation configuration for History Ninja
 * 
 * SEMANTIC CUE: This is the animation control center
 * - All timing, duration, and effect combinations defined here
 * - Easy to modify animation behavior without touching components
 * - Supports different difficulty levels and themes
 * 
 * Usage:
 * import { ANIMATIONS } from './config/animations';
 * triggerMultipleEffects(ANIMATIONS.combinations.correctAnswer);
 */

export const ANIMATIONS = {
  // Individual effect configurations
  effects: {
    smoke: { 
      duration: 800, 
      particles: 6,
      description: "Dispersing smoke particles for wrong answers"
    },
    shuriken: { 
      duration: 1000, 
      rotations: 2,
      trajectory: 'straight', // 'straight', 'arc', 'diagonal'
      description: "Spinning projectile for correct answers"
    },
    scoreGlow: { 
      duration: 600, 
      scale: 1.1,
      animationType: 'glow', // 'glow', 'scale', 'bounce', 'pulse'
      description: "Score increase animation"
    },
    transition: { 
      duration: 300, 
      direction: 'slide-right', // 'slide-right', 'fade', 'slash'
      description: "Question transition effect"
    },
    confetti: { 
      duration: 2000, 
      particles: 20,
      colors: ['bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-purple-400'],
      description: "Celebration particles for victories"
    },
    lightning: { 
      duration: 1200, 
      intensity: 'high', // 'low', 'medium', 'high'
      color: 'yellow', // 'yellow', 'blue', 'purple'
      description: "Dramatic flash for special achievements"
    },
    sparks: { 
      duration: 800, 
      particles: 8,
      spread: 'wide', // 'narrow', 'medium', 'wide'
      description: "Electric sparks for streak bonuses"
    },
    
    emojiRain: {
      duration: 4000,
      particles: 25,
      intensity: 'medium', // 'light', 'medium', 'heavy'
      windEffect: true,
      bounceEffect: false,
      description: "Themed emoji celebration rain"
    }
  },
  
  // SEMANTIC CUE: Audio-visual synchronization mappings
  audio: {
    // Maps visual effect combinations to sound combinations
    correctAnswer: 'correctAnswer',
    incorrectAnswer: 'incorrectAnswer', 
    zanyAnswer: 'zanyAnswer',
    perfectStreak: 'perfectStreak',
    gameComplete: 'gameComplete',
    newHighScore: 'newHighScore',
    questionTransition: 'questionTransition',
    streakBonus: 'streakBonus',
    // Country-specific completions get game completion sounds
    americanComplete: 'gameComplete',
    britishComplete: 'gameComplete',
    japaneseComplete: 'gameComplete',
    countryComplete: 'gameComplete',
    // New themed categories
    'ancient-romeComplete': 'gameComplete',
    'space-raceComplete': 'gameComplete', 
    piratesComplete: 'gameComplete',
    // Streak and combo effects
    streak3: 'streakBonus',
    streak5: 'perfectStreak',
    streak10: 'perfectStreak',
    comboBreaker: 'incorrectAnswer',
    // Word Wizard specific audio mappings
    correctSpelling: 'correctAnswer',
    incorrectSpelling: 'incorrectAnswer',
    spellingStreak: 'streakBonus'
  },

  // Predefined effect combinations for common game events
  combinations: {
    correctAnswer: [
      { name: 'shuriken', duration: 1000, delay: 0 },
      { name: 'scoreGlow', duration: 600, delay: 200 }
    ],
    
    incorrectAnswer: [
      { name: 'smoke', duration: 800, delay: 0 }
    ],
    
    zanyAnswer: [
      { name: 'smoke', duration: 800, delay: 0 },
      { name: 'sparks', duration: 400, delay: 300 }
    ],
    
    perfectStreak: [
      { name: 'lightning', duration: 1200, delay: 0 },
      { name: 'scoreGlow', duration: 800, delay: 200 },
      { name: 'confetti', duration: 2000, delay: 400 }
    ],
    
    gameComplete: [
      { name: 'confetti', duration: 2000, delay: 0 },
      { name: 'scoreGlow', duration: 1000, delay: 500 }
    ],
    
    newHighScore: [
      { name: 'lightning', duration: 1200, delay: 0 },
      { name: 'confetti', duration: 3000, delay: 300 },
      { name: 'scoreGlow', duration: 1500, delay: 600 }
    ],
    
    questionTransition: [
      { name: 'transition', duration: 300, delay: 0 }
    ],
    
    streakBonus: [
      { name: 'sparks', duration: 800, delay: 0 },
      { name: 'scoreGlow', duration: 600, delay: 200 }
    ],
    
    // SEMANTIC CUE: Country-specific completion celebrations
    americanComplete: [
      { name: 'emojiRain', duration: 4000, delay: 0, theme: 'american' },
      { name: 'confetti', duration: 3000, delay: 500 },
      { name: 'scoreGlow', duration: 1000, delay: 800 }
    ],
    
    britishComplete: [
      { name: 'emojiRain', duration: 4000, delay: 0, theme: 'british' },
      { name: 'confetti', duration: 3000, delay: 500 }
    ],
    
    japaneseComplete: [
      { name: 'emojiRain', duration: 4000, delay: 0, theme: 'japanese' },
      { name: 'lightning', duration: 1000, delay: 200 }
    ],
    
    // Generic country completion fallback
    countryComplete: [
      { name: 'emojiRain', duration: 4000, delay: 0, theme: 'celebration' },
      { name: 'confetti', duration: 2000, delay: 500 }
    ],
    
    // SEMANTIC CUE: New themed category completions
    'ancient-romeComplete': [
      { name: 'emojiRain', duration: 4000, delay: 0, theme: 'ancient-rome' },
      { name: 'lightning', duration: 800, delay: 200 },
      { name: 'confetti', duration: 2000, delay: 600 }
    ],
    
    'space-raceComplete': [
      { name: 'emojiRain', duration: 4000, delay: 0, theme: 'space-race' },
      { name: 'sparks', duration: 1000, delay: 300 },
      { name: 'scoreGlow', duration: 800, delay: 500 }
    ],
    
    piratesComplete: [
      { name: 'emojiRain', duration: 4000, delay: 0, theme: 'pirate' },
      { name: 'confetti', duration: 2500, delay: 400 }
    ],
    
    // SEMANTIC CUE: Streak milestone celebrations
    streak3: [
      { name: 'lightning', duration: 600, delay: 0 },
      { name: 'scoreGlow', duration: 800, delay: 200 }
    ],
    
    streak5: [
      { name: 'lightning', duration: 1000, delay: 0 },
      { name: 'sparks', duration: 800, delay: 300 },
      { name: 'scoreGlow', duration: 1000, delay: 500 }
    ],
    
    streak10: [
      { name: 'lightning', duration: 1200, delay: 0 },
      { name: 'emojiRain', duration: 3000, delay: 400, theme: 'legendary' },
      { name: 'confetti', duration: 2000, delay: 800 }
    ],
    
    // SEMANTIC CUE: Achievement unlock celebrations
    achievementUnlock: [
      { name: 'confetti', duration: 2500, delay: 0 },
      { name: 'scoreGlow', duration: 1000, delay: 300 }
    ]
  },
  
  // Difficulty-based animation settings
  difficulty: {
    easy: {
      effectIntensity: 0.8,
      durationMultiplier: 1.2,
      particleReduction: 0.7
    },
    medium: {
      effectIntensity: 1.0,
      durationMultiplier: 1.0,
      particleReduction: 1.0
    },
    hard: {
      effectIntensity: 1.3,
      durationMultiplier: 0.8,
      particleReduction: 1.3
    }
  },
  
  // Theme-based effect variations
  themes: {
    ninja: {
      primaryColor: 'indigo',
      successColor: 'green',
      errorColor: 'red',
      effectStyle: 'sharp', // 'smooth', 'sharp', 'dramatic'
      soundEnabled: true
    },
    
    samurai: {
      primaryColor: 'red',
      successColor: 'gold',
      errorColor: 'gray',
      effectStyle: 'dramatic',
      soundEnabled: true
    },
    
    zen: {
      primaryColor: 'blue',
      successColor: 'teal',
      errorColor: 'orange',
      effectStyle: 'smooth',
      soundEnabled: false
    }
  },
  
  // Performance optimization settings
  performance: {
    // Reduce effects on slower devices
    reducedMotion: {
      enableEffects: true,
      maxParticles: 3,
      simplifiedAnimations: true
    },
    
    // Mobile-specific optimizations
    mobile: {
      maxConcurrentEffects: 2,
      reducedParticles: 0.5,
      fasterAnimations: 1.5
    },
    
    // Desktop settings for full experience
    desktop: {
      maxConcurrentEffects: 5,
      fullParticles: 1.0,
      standardAnimations: 1.0
    }
  }
};

/**
 * Helper function to get animation config based on device capabilities
 * 
 * SEMANTIC CUE: Performance optimization helper
 * - Automatically adjusts effects based on device
 * - Maintains smooth 60fps experience
 * - Falls back gracefully on slower devices
 */
export const getOptimizedAnimations = (userAgent, reducedMotion = false) => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
  if (reducedMotion) {
    return {
      ...ANIMATIONS,
      effects: Object.fromEntries(
        Object.entries(ANIMATIONS.effects).map(([key, config]) => [
          key, 
          { ...config, duration: config.duration * 0.3 }
        ])
      )
    };
  }
  
  if (isMobile) {
    return {
      ...ANIMATIONS,
      effects: Object.fromEntries(
        Object.entries(ANIMATIONS.effects).map(([key, config]) => [
          key, 
          { 
            ...config, 
            duration: config.duration * ANIMATIONS.performance.mobile.fasterAnimations,
            particles: Math.floor((config.particles || 1) * ANIMATIONS.performance.mobile.reducedParticles)
          }
        ])
      )
    };
  }
  
  return ANIMATIONS;
};

/**
 * Helper function to create custom effect combinations
 * 
 * SEMANTIC CUE: Effect combination builder
 * - Allows dynamic creation of effect sequences
 * - Useful for custom game modes or special events
 */
export const createEffectCombination = (effects) => {
  return effects.map(effect => ({
    duration: ANIMATIONS.effects[effect.name]?.duration || 1000,
    delay: 0,
    ...effect
  }));
};

/**
 * Country-to-theme mapping for emoji rain effects
 * 
 * SEMANTIC CUE: Maps game country selections to emoji themes
 * - Automatically triggers appropriate emoji rain on completion
 * - Extensible for new countries and themes
 */
export const COUNTRY_EMOJI_THEMES = {
  american: 'american',
  british: 'british', 
  japanese: 'japanese',
  french: 'french',
  german: 'german',
  chinese: 'chinese',
  egyptian: 'egyptian',
  // SEMANTIC CUE: New themed categories
  'ancient-rome': 'ancient-rome',
  'space-race': 'space-race',
  pirates: 'pirate',
  // Fallback for unmapped countries
  default: 'celebration'
};

/**
 * Helper function to get country-specific completion effects
 * 
 * SEMANTIC CUE: Dynamic effect selection based on country
 * Usage: getCountryCompletionEffects('american') → americanComplete effects
 */
export const getCountryCompletionEffects = (country) => {
  const completionKey = `${country}Complete`;
  return ANIMATIONS.combinations[completionKey] || ANIMATIONS.combinations.countryComplete;
};

// Export commonly used combinations for easy access
export const EFFECT_COMBOS = ANIMATIONS.combinations;
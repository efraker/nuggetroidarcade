import { useCallback, useRef, useEffect } from 'react';

/**
 * Shared sound effects system for all arcade games
 * 
 * SEMANTIC CUE: This is the central audio management system
 * - Preloads and manages game audio assets
 * - Coordinates with visual effects for synchronized experiences
 * - Supports volume control and muting
 * - Optimized for mobile performance
 * 
 * Usage:
 * const { playSound, playSoundCombo } = useGameSounds();
 * playSound('katana_cut'); // Single sound
 * playSoundCombo('correctAnswer'); // Predefined sound sequence
 */
export const useGameSounds = (volume = 0.7, enabled = true) => {
  const audioRefs = useRef({});
  const isInitialized = useRef(false);
  
  // Sound file mappings
  const SOUND_FILES = {
    // Ninja-themed sounds for correct answers and actions
    katana_cut: '/src/assets/sounds/katana_cut.mp3',
    fighting_hiya: '/src/assets/sounds/fighting-game-hiya-sound.mp3', 
    sai_deflect: '/src/assets/sounds/sai_rapid_deflecting_spin_hit.mp3',
    ninja_teleport: '/src/assets/sounds/ninja_teleport.mp3',
    
    // Atmospheric and feedback sounds
    poof_smoke: '/src/assets/sounds/poof_in_cloud.mp3',
    explosion: '/src/assets/sounds/explosion.mp3',
    howl: '/src/assets/sounds/howl.mp3',
    jump: '/src/assets/sounds/jump.mp3',
    laser: '/src/assets/sounds/laser.mp3'
  };

  // Initialize and preload audio files
  useEffect(() => {
    if (!enabled || isInitialized.current) return;
    
    // Preload all audio files for smooth playback
    Object.entries(SOUND_FILES).forEach(([key, src]) => {
      const audio = new Audio();
      audio.src = src;
      audio.volume = volume;
      audio.preload = 'auto';
      
      // Handle loading errors gracefully
      audio.onerror = () => {
        console.warn(`Failed to load sound: ${key} from ${src}`);
      };
      
      audioRefs.current[key] = audio;
    });
    
    isInitialized.current = true;
  }, [enabled, volume]);

  // Update volume when prop changes
  useEffect(() => {
    Object.values(audioRefs.current).forEach(audio => {
      if (audio) audio.volume = volume;
    });
  }, [volume]);

  /**
   * Play a single sound effect
   * @param {string} soundName - Name of sound to play
   * @param {number} delay - Optional delay in ms before playing
   */
  const playSound = useCallback((soundName, delay = 0) => {
    if (!enabled) return;
    
    const audio = audioRefs.current[soundName];
    if (!audio) {
      console.warn(`Sound not found: ${soundName}`);
      return;
    }

    const play = () => {
      // Reset audio to beginning and play
      audio.currentTime = 0;
      audio.play().catch(error => {
        // Handle autoplay restrictions gracefully
        console.warn(`Audio play failed for ${soundName}:`, error.message);
      });
    };

    if (delay > 0) {
      setTimeout(play, delay);
    } else {
      play();
    }
  }, [enabled]);

  /**
   * Play multiple sounds in sequence or simultaneously
   * @param {Array} soundSequence - Array of {name, delay} objects
   */
  const playSoundSequence = useCallback((soundSequence) => {
    if (!enabled) return;
    
    soundSequence.forEach(({ name, delay = 0 }) => {
      playSound(name, delay);
    });
  }, [enabled, playSound]);

  /**
   * Play predefined sound combinations for common game events
   * @param {string} comboName - Name of sound combination
   */
  const playSoundCombo = useCallback((comboName) => {
    const combinations = {
      // Correct answer: Satisfying strike sound
      correctAnswer: [
        { name: 'katana_cut', delay: 0 }
      ],
      
      // Wrong answer: Smoke puff disappointment
      incorrectAnswer: [
        { name: 'poof_smoke', delay: 0 }
      ],
      
      // Zany answer: Playful deflection
      zanyAnswer: [
        { name: 'sai_deflect', delay: 0 }
      ],
      
      // Perfect streak: Dramatic combo
      perfectStreak: [
        { name: 'fighting_hiya', delay: 0 },
        { name: 'katana_cut', delay: 300 },
        { name: 'explosion', delay: 600 }
      ],
      
      // Game completion: Victory sequence
      gameComplete: [
        { name: 'ninja_teleport', delay: 0 },
        { name: 'explosion', delay: 500 }
      ],
      
      // New high score: Epic celebration
      newHighScore: [
        { name: 'howl', delay: 0 },
        { name: 'fighting_hiya', delay: 800 },
        { name: 'explosion', delay: 1200 }
      ],
      
      // Question transition: Quick teleport
      questionTransition: [
        { name: 'ninja_teleport', delay: 0 }
      ],
      
      // Streak bonus: Building tension
      streakBonus: [
        { name: 'sai_deflect', delay: 0 },
        { name: 'jump', delay: 200 }
      ]
    };

    const combo = combinations[comboName];
    if (combo) {
      playSoundSequence(combo);
    } else {
      console.warn(`Sound combination not found: ${comboName}`);
    }
  }, [playSoundSequence]);

  /**
   * Stop all currently playing sounds
   */
  const stopAllSounds = useCallback(() => {
    Object.values(audioRefs.current).forEach(audio => {
      if (audio && !audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  }, []);

  /**
   * Test if audio is working (useful for debugging)
   */
  const testAudio = useCallback(() => {
    playSound('katana_cut');
  }, [playSound]);

  return {
    playSound,
    playSoundSequence, 
    playSoundCombo,
    stopAllSounds,
    testAudio,
    isAudioEnabled: enabled,
    availableSounds: Object.keys(SOUND_FILES)
  };
};
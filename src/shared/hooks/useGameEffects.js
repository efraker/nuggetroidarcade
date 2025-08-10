import { useState, useCallback } from 'react';
import { useGameSounds } from './useGameSounds';
import { ANIMATIONS } from '../config/animations';

/**
 * Enhanced custom hook for managing visual AND audio effects in arcade games
 * 
 * SEMANTIC CUE: This is the central audio-visual effects management system
 * - Triggers synchronized visual and audio effects
 * - Automatic cleanup for both visual and audio elements
 * - Supports effect combinations with perfect timing sync
 * - Available to all arcade games
 * 
 * Usage:
 * const { effects, triggerEffect, triggerEffectCombo } = useGameEffects();
 * triggerEffect('smoke'); // Single visual effect
 * triggerEffectCombo('correctAnswer'); // Synced visual + audio combo
 */
export const useGameEffects = (soundEnabled = true, soundVolume = 0.7) => {
  // SEMANTIC CUE: Integrate audio system with visual effects
  const { playSoundCombo } = useGameSounds(soundVolume, soundEnabled);
  const [effects, setEffects] = useState({
    smoke: false,
    shuriken: false,
    scoreGlow: false,
    transition: false,
    confetti: false,
    lightning: false,
    sparks: false,
    emojiRain: false // SEMANTIC CUE: Themed emoji celebration effect
  });

  /**
   * Trigger a single effect with automatic cleanup
   * @param {string} effectName - Name of effect to trigger
   * @param {number} duration - How long effect should last (ms)
   */
  const triggerEffect = useCallback((effectName, duration = 1000) => {
    // Validate effect exists
    if (!effects.hasOwnProperty(effectName)) {
      console.warn(`Effect "${effectName}" is not registered`);
      return;
    }

    // Activate effect
    setEffects(prev => ({ ...prev, [effectName]: true }));
    
    // Auto cleanup
    setTimeout(() => {
      setEffects(prev => ({ ...prev, [effectName]: false }));
    }, duration);
  }, [effects]);

  /**
   * Trigger multiple effects with individual timing and delays
   * @param {Array} effectsArray - Array of {name, duration, delay} objects
   */
  const triggerMultipleEffects = useCallback((effectsArray) => {
    effectsArray.forEach(({ name, duration = 1000, delay = 0 }) => {
      setTimeout(() => {
        triggerEffect(name, duration);
      }, delay);
    });
  }, [triggerEffect]);

  /**
   * Trigger a predefined effect combo with synchronized audio-visual effects
   * SEMANTIC CUE: This is the main method for triggering game events
   * @param {string} comboName - Name of the combo (e.g., 'correctAnswer')
   */
  const triggerEffectCombo = useCallback((comboName) => {
    // Trigger visual effects
    const visualCombo = ANIMATIONS.combinations[comboName];
    if (visualCombo) {
      triggerMultipleEffects(visualCombo);
    }
    
    // Trigger synchronized audio effects
    if (soundEnabled) {
      const audioCombo = ANIMATIONS.audio[comboName];
      if (audioCombo) {
        playSoundCombo(audioCombo);
      }
    }
  }, [triggerMultipleEffects, playSoundCombo, soundEnabled]);

  /**
   * Clear all active effects immediately
   */
  const clearAllEffects = useCallback(() => {
    setEffects(prev => Object.fromEntries(
      Object.keys(prev).map(key => [key, false])
    ));
  }, []);

  /**
   * Check if any effects are currently active
   * Useful for preventing overlapping effects or performance optimization
   */
  const hasActiveEffects = useCallback(() => {
    return Object.values(effects).some(isActive => isActive);
  }, [effects]);

  return {
    effects,
    triggerEffect,
    triggerMultipleEffects,
    triggerEffectCombo, // SEMANTIC CUE: Primary method for audio-visual combos
    clearAllEffects,
    hasActiveEffects,
    soundEnabled
  };
};
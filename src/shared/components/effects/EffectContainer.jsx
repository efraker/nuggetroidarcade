import React from 'react';
import { SmokeEffect } from './SmokeEffect';
import { ShurikenEffect } from './ShurikenEffect';
import { ConfettiEffect } from './ConfettiEffect';
import { LightningEffect } from './LightningEffect';
import { EmojiRain, EMOJI_THEMES } from './EmojiRain';

/**
 * Container component that handles rendering of all visual effects
 * 
 * SEMANTIC CUE: This is the main effects renderer
 * - Conditionally renders effects based on state
 * - Maintains proper layering and positioning
 * - Easy to extend with new effect types
 * 
 * Usage:
 * <EffectContainer effects={effects} className="relative">
 *   <YourGameContent />
 * </EffectContainer>
 */
export const EffectContainer = ({ 
  children, 
  effects, 
  className = "",
  style = {},
  emojiTheme = 'american' // SEMANTIC CUE: Theme for emoji rain effects
}) => {
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      {children}
      
      {/* Effect layers - order determines z-index */}
      {effects.smoke && (
        <div className="absolute inset-0 pointer-events-none z-10">
          <SmokeEffect />
        </div>
      )}
      
      {effects.shuriken && (
        <div className="absolute inset-0 pointer-events-none z-20">
          <ShurikenEffect />
        </div>
      )}
      
      {effects.confetti && (
        <div className="absolute inset-0 pointer-events-none z-30">
          <ConfettiEffect />
        </div>
      )}
      
      {effects.lightning && (
        <div className="absolute inset-0 pointer-events-none z-25">
          <LightningEffect />
        </div>
      )}
      
      {/* SEMANTIC CUE: Emoji rain effect with theme support */}
      {effects.emojiRain && (
        <div className="absolute inset-0 pointer-events-none z-35">
          <EmojiRain {...EMOJI_THEMES[emojiTheme] || EMOJI_THEMES.celebration} />
        </div>
      )}
      
      {/* Transition overlay for page transitions */}
      {effects.transition && (
        <div 
          className="absolute inset-0 bg-gray-900 z-50 transition-all duration-300"
          style={{
            clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
            animation: 'ninjaSlash 0.3s ease-out forwards'
          }}
        />
      )}
    </div>
  );
};
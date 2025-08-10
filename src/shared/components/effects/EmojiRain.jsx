import React from 'react';

/**
 * Customizable emoji rain effect for themed celebrations
 * 
 * SEMANTIC CUE: Country/theme-specific celebration effect
 * - Falls from top of screen with physics simulation
 * - Supports custom emoji sets for different countries/themes
 * - Configurable density, speed, and animation patterns
 * 
 * Usage Examples:
 * <EmojiRain emojis={['🦅', '🇺🇸', '🗽']} /> // American theme
 * <EmojiRain emojis={['🏰', '👑', '🇬🇧']} /> // British theme
 * <EmojiRain emojis={['🗾', '🏯', '🎌']} /> // Japanese theme
 */
export const EmojiRain = ({ 
  emojis = ['🦅', '🇺🇸', '🗽'], // Default American theme
  particleCount = 25,
  duration = 4000,
  intensity = 'medium', // 'light', 'medium', 'heavy'
  windEffect = true,
  bounceEffect = false
}) => {
  
  // Adjust particle count based on intensity
  const getParticleCount = () => {
    switch(intensity) {
      case 'light': return Math.floor(particleCount * 0.6);
      case 'heavy': return Math.floor(particleCount * 1.5);
      default: return particleCount;
    }
  };

  // Generate random emoji pieces with physics properties
  const emojiPieces = [...Array(getParticleCount())].map((_, i) => {
    const emoji = emojis[i % emojis.length];
    const size = Math.random() > 0.7 ? 'text-3xl' : 'text-2xl'; // Varied sizes
    const fallDelay = Math.random() * 2000; // Staggered start times
    const horizontalStart = Math.random() * 100; // Random horizontal position
    const fallDuration = duration * (0.7 + Math.random() * 0.6); // Varied fall speeds
    const rotationDirection = Math.random() > 0.5 ? 1 : -1;
    const rotationSpeed = 180 + Math.random() * 360;
    const windIntensity = windEffect ? (Math.random() - 0.5) * 40 : 0;
    
    return {
      id: `emoji-${i}`,
      emoji,
      size,
      fallDelay,
      horizontalStart,
      fallDuration,
      rotationDirection,
      rotationSpeed,
      windIntensity,
      bounceHeight: bounceEffect ? 10 + Math.random() * 20 : 0
    };
  });

  return (
    <>
      {/* CSS Animation Definitions */}
      <style jsx>{`
        @keyframes emojiRainFall {
          0% { 
            transform: translateY(-100vh) translateX(0px) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          10% { 
            opacity: 1;
            transform: translateY(-80vh) translateX(var(--wind-start)) rotate(45deg) scale(1);
          }
          90% { 
            opacity: 0.9;
            transform: translateY(90vh) translateX(var(--wind-end)) rotate(var(--rotation)) scale(0.9);
          }
          100% { 
            transform: translateY(100vh) translateX(var(--wind-end)) rotate(var(--rotation)) scale(0.7);
            opacity: 0;
          }
        }
        
        @keyframes emojiRainBounce {
          0% { 
            transform: translateY(-100vh) translateX(0px) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          10% { 
            opacity: 1;
            transform: translateY(-80vh) translateX(var(--wind-start)) rotate(45deg) scale(1);
          }
          85% { 
            transform: translateY(calc(100vh - var(--bounce-height))) translateX(var(--wind-end)) rotate(var(--rotation)) scale(0.9);
          }
          92% { 
            transform: translateY(calc(100vh - var(--bounce-height) + 10px)) translateX(var(--wind-end)) rotate(var(--rotation)) scale(0.95);
          }
          100% { 
            transform: translateY(100vh) translateX(var(--wind-end)) rotate(var(--rotation)) scale(0.7);
            opacity: 0;
          }
        }
        
        @keyframes emojiSway {
          0%, 100% { 
            transform: translateX(0px);
          }
          25% { 
            transform: translateX(-8px);
          }
          75% { 
            transform: translateX(8px);
          }
        }
        
        .emoji-particle {
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
          user-select: none;
          pointer-events: none;
        }
        
        .emoji-glow {
          filter: drop-shadow(0 0 8px rgba(255,215,0,0.3));
        }
      `}</style>
      
      {/* Emoji Rain Particles */}
      {emojiPieces.map((piece) => (
        <div
          key={piece.id}
          className={`absolute ${piece.size} emoji-particle ${Math.random() > 0.8 ? 'emoji-glow' : ''}`}
          style={{
            left: `${piece.horizontalStart}%`,
            top: '-50px',
            '--wind-start': `${piece.windIntensity * 0.3}px`,
            '--wind-end': `${piece.windIntensity}px`,
            '--rotation': `${piece.rotationSpeed * piece.rotationDirection}deg`,
            '--bounce-height': `${piece.bounceHeight}px`,
            animation: `${bounceEffect ? 'emojiRainBounce' : 'emojiRainFall'} ${piece.fallDuration}ms linear forwards${windEffect ? ', emojiSway 2s ease-in-out infinite' : ''}`,
            animationDelay: `${piece.fallDelay}ms`,
            zIndex: 85 + (piece.size === 'text-3xl' ? 5 : 0) // Larger emojis on top
          }}
        >
          {piece.emoji}
        </div>
      ))}
      
      {/* Background celebration burst */}
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 text-6xl opacity-80"
        style={{
          animation: `emojiRainFall 1s ease-out forwards`,
          filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.4))',
          zIndex: 95
        }}
      >
        {emojis[0]} {/* Primary theme emoji as centerpiece */}
      </div>
      
      {/* Side celebration bursts */}
      <div
        className="absolute top-10 left-1/4 text-4xl opacity-60"
        style={{
          animation: `emojiRainFall 1.5s ease-out forwards`,
          animationDelay: '0.5s',
          zIndex: 90
        }}
      >
        {emojis[1] || emojis[0]}
      </div>
      
      <div
        className="absolute top-10 right-1/4 text-4xl opacity-60"
        style={{
          animation: `emojiRainFall 1.5s ease-out forwards`,
          animationDelay: '0.3s',
          zIndex: 90
        }}
      >
        {emojis[2] || emojis[0]}
      </div>
    </>
  );
};

/**
 * Pre-configured emoji sets for different countries/themes
 * 
 * SEMANTIC CUE: Easy-to-use presets for common themes
 * Usage: <EmojiRain {...EMOJI_THEMES.american} />
 */
export const EMOJI_THEMES = {
  american: {
    emojis: ['🦅', '🇺🇸', '🗽', '🎆', '⭐'],
    particleCount: 30,
    intensity: 'heavy'
  },
  
  british: {
    emojis: ['🇬🇧', '👑', '🏰', '☕', '🌹'],
    particleCount: 25,
    intensity: 'medium'
  },
  
  japanese: {
    emojis: ['🇯🇵', '🏯', '🗾', '🌸', '⛩️'],
    particleCount: 28,
    intensity: 'medium',
    windEffect: true
  },
  
  french: {
    emojis: ['🇫🇷', '🗼', '🥐', '🍷', '💐'],
    particleCount: 24,
    intensity: 'medium'
  },
  
  german: {
    emojis: ['🇩🇪', '🏰', '🍺', '🚗', '🎼'],
    particleCount: 26,
    intensity: 'medium'
  },
  
  chinese: {
    emojis: ['🇨🇳', '🐉', '🏮', '🥟', '🎋'],
    particleCount: 32,
    intensity: 'heavy'
  },
  
  egyptian: {
    emojis: ['🇪🇬', '🐪', '🏺', '⚱️', '🔺'],
    particleCount: 22,
    intensity: 'light'
  },
  
  viking: {
    emojis: ['⚔️', '🛡️', '🚢', '🔥', '❄️'],
    particleCount: 20,
    intensity: 'medium',
    bounceEffect: true
  },
  
  pirate: {
    emojis: ['🏴‍☠️', '⚓', '💰', '🦜', '⚔️'],
    particleCount: 24,
    intensity: 'medium',
    windEffect: true
  },
  
  space: {
    emojis: ['🚀', '🌟', '🌙', '🪐', '👨‍🚀'],
    particleCount: 28,
    intensity: 'medium'
  },
  
  celebration: {
    emojis: ['🎉', '🎊', '🏆', '⭐', '🎆'],
    particleCount: 35,
    intensity: 'heavy'
  },
  
  // SEMANTIC CUE: New themed categories for improved game variety
  'ancient-rome': {
    emojis: ['🏛️', '⚔️', '🛡️', '🦅', '🏺'],
    particleCount: 30,
    intensity: 'medium',
    windEffect: false,
    bounceEffect: true
  },
  
  'space-race': {
    emojis: ['🚀', '🌟', '🛸', '👨‍🚀', '🌙'],
    particleCount: 32,
    intensity: 'heavy',
    windEffect: false
  },
  
  roman: {
    emojis: ['🏛️', '⚔️', '🛡️', '🦅', '🏺'],
    particleCount: 30,
    intensity: 'medium',
    windEffect: false,
    bounceEffect: true
  },
  
  // Achievement-unlocked special themes
  lightning: {
    emojis: ['⚡', '🌩️', '💫', '✨', '⚡'],
    particleCount: 25,
    intensity: 'heavy',
    windEffect: true
  },
  
  legendary: {
    emojis: ['🔥', '💎', '👑', '🌟', '🏆'],
    particleCount: 40,
    intensity: 'heavy',
    windEffect: true
  },
  
  dragon: {
    emojis: ['🐉', '🔥', '⚡', '💎', '🌟'],
    particleCount: 35,
    intensity: 'heavy',
    windEffect: true,
    bounceEffect: true
  },
  
  // SEMANTIC CUE: Word Wizard themed celebrations
  spelling: {
    emojis: ['📝', '✏️', '📚', '🎓', '⭐'],
    particleCount: 25,
    intensity: 'medium',
    windEffect: true
  },
  
  scholar: {
    emojis: ['📚', '🎓', '📜', '🖋️', '🏛️'],
    particleCount: 30,
    intensity: 'medium',
    windEffect: false
  },
  
  wordWizard: {
    emojis: ['🧙‍♂️', '📖', '✨', '🔮', '⭐'],
    particleCount: 28,
    intensity: 'heavy',
    windEffect: true
  }
};
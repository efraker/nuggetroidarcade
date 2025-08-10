# 🎮 Nuggetroid Arcade

**The most spectacular web-based game arcade in human history**

A React-based game arcade featuring fully-fledged games with shared progression systems, synchronized audio-visual effects, and an achievement system that keeps you coming back for more.

![Arcade Banner](https://img.shields.io/badge/Games-2%20Full%20Games-brightgreen) ![Effects](https://img.shields.io/badge/Visual%20Effects-15+%20Themes-blue) ![Sounds](https://img.shields.io/badge/Audio-9%20Ninja%20Sounds-red) ![Streaks](https://img.shields.io/badge/Streak%20System-6%20Milestones-yellow)

## 🎯 Featured Games

### 🥷 **History Ninja**
*Master history while unleashing spectacular ninja effects!*

- **5 Categories**: American History, Ancient Rome, Space Race, Pirates, and more
- **Lightning Streaks**: Get 3+ correct answers for epic lightning effects
- **Country Celebrations**: Roman temples 🏛️, rockets 🚀, pirate ships 🏴‍☠️ rain from the sky
- **Ninja Sounds**: Katana cuts, smoke puffs, and fighting cries perfectly timed with your answers
- **Achievement System**: Unlock special emoji rain themes for accomplishments

### 🧙‍♂️ **Word Wizard** 
*Spell your way to magical mastery with voice-guided challenges!*

- **Advanced Text-to-Speech**: Random voice selection for word pronunciation
- **4 Difficulty Levels**: Easy → Medium → Hard → Expert with progressive complexity
- **Coin Economy**: Earn coins, unlock cosmetic skins (Rainbow, Neon, Gold)
- **Spelling Streaks**: Same lightning system adapted for spelling - 10+ streaks trigger legendary celebrations
- **Visual Feedback**: Shuriken fly across screen for correct spellings, smoke puffs for mistakes

## ⚡ **Shared Progression Systems**

All games feature the same engaging progression mechanics:

### **🔥 Streak System**
- **3+ streak**: Lightning flash ⚡ + bonus scoring + "Hot Streak!" announcement
- **5+ streak**: Lightning + sparks + 2x score multiplier + "On Fire!"
- **7+ streak**: Extended effects + "Unstoppable!" 
- **10+ streak**: Epic lightning + legendary emoji rain + confetti + 3x multiplier + "Legendary!"

### **🏆 Achievement System**
Unlock special celebrations and emoji rain themes:
- **History Scholar**: Master multiple categories → Scholarly emoji rain 📚 🎓 📜
- **Streak Master**: 10+ streaks → Lightning emoji rain ⚡ 🌩️ ⚡
- **Spelling Bee Champion**: 50 words spelled → Academic celebration
- **Expert Level**: Category mastery → Legendary effects 🔥 💎 👑

### **🎊 Visual Spectacle**
- **15+ Emoji Rain Themes**: Country-specific, achievement-unlocked, and special occasion
- **9 Ninja-Themed Sounds**: Katana cuts, smoke puffs, lightning, teleports, explosions
- **Synchronized Effects**: Every action triggers perfectly timed audio-visual feedback
- **60fps Performance**: Optimized for smooth gameplay on all devices

## 🛠️ **Technical Architecture**

### **Modern Tech Stack**
- **React 19+** with hooks and modern patterns
- **Vite 7+** for lightning-fast development and builds  
- **Tailwind CSS 4+** for responsive, beautiful styling
- **React Router DOM** for seamless navigation
- **GitHub Pages** deployment with automated CI/CD

### **Shared Effects System**
Revolutionary modular architecture that makes adding new games effortless:

```javascript
// Any new game instantly gets access to all effects
import { useGameEffects } from '../../shared/hooks/useGameEffects';
import { useStreakSystem } from '../../shared/hooks/useStreakSystem';
import { EffectContainer } from '../../shared/components/effects/EffectContainer';

// Trigger spectacular celebrations
triggerEffectCombo('correctAnswer'); // Shuriken + katana sound
triggerEffectCombo('streak10');      // Lightning + legendary emoji rain
```

### **Auto-Discovery Architecture**
The arcade automatically detects and routes to new games:
- Drop a folder in `src/games/` → Instant menu integration
- Shared visual effects → Consistent experience across all games
- Cross-game achievements → Progress carries between games

## 🚀 **Getting Started**

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production  
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

## 🎮 **Adding New Games**

The arcade is designed for effortless game creation:

1. **Create game folder**: `src/games/your-game-name/`
2. **Add main component**: `your-game-name.jsx` 
3. **Integrate shared systems**: Import effects, streaks, achievements
4. **Automatic discovery**: Game appears in menu instantly!

Example integration:
```javascript
export default function YourGame() {
  const { effects, triggerEffectCombo } = useGameEffects();
  const { currentStreak, handleCorrectAnswer } = useStreakSystem();
  
  return (
    <EffectContainer effects={effects} emojiTheme="celebration">
      {/* Your game content with spectacular effects! */}
    </EffectContainer>
  );
}
```

## 🎨 **Visual Effects Library**

Pre-built effects available to all games:

### **Basic Effects**
- `smoke` - Wrong answer particles
- `shuriken` - Success projectiles  
- `confetti` - Celebration particles
- `lightning` - Achievement flashes
- `sparks` - Bonus effects

### **Emoji Rain Themes**
- **Countries**: American 🦅🇺🇸🗽, Roman 🏛️⚔️🛡️, Pirates 🏴‍☠️⚓💰, Space 🚀🌟🛸
- **Achievements**: Lightning ⚡🌩️💫, Legendary 🔥💎👑, Scholar 📚🎓📜
- **Special**: Dragon 🐉🔥⚡, Wizard 🧙‍♂️📖✨, Celebration 🎉🎊🏆

### **Audio Integration**  
9 ninja-themed sounds synchronized with all effects:
- Katana cuts, ninja teleports, smoke puffs
- Fighting cries, explosions, deflection sounds
- Lightning, jumping, laser effects

## 📱 **Performance & Accessibility**

- **60fps Target**: Optimized animations for smooth gameplay
- **Mobile-First**: Touch-friendly interface, responsive design
- **Audio Options**: Volume control and sound toggle
- **Reduced Motion**: Respects user accessibility preferences
- **Progressive Enhancement**: Works without JavaScript for basic functionality

## 🏆 **Live Experience**

Play now at: **[Your GitHub Pages URL]**

Experience the most engaging web arcade with:
- Instant loading and smooth 60fps gameplay
- Spectacular celebrations for every achievement  
- Cross-game progression that keeps you motivated
- Professional-quality audio-visual feedback
- Mobile-optimized for gaming anywhere

## 🤝 **Contributing**

This arcade is built for extensibility! Contributions welcome:

- **New Games**: Follow the auto-discovery pattern
- **New Effects**: Add to the shared effects library  
- **New Achievements**: Extend the universal achievement system
- **Performance**: Help optimize for more devices
- **Accessibility**: Improve inclusive design

## 📄 **License**

MIT License - Feel free to fork, modify, and create your own spectacular arcade!

---

**Built with ❤️ and lots of ⚡ lightning effects**

*Nuggetroid Arcade - Where every game is an epic adventure!* 🥷✨
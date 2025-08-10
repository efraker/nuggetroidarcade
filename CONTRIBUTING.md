# Contributing to Nuggetroid Arcade

Thank you for your interest in contributing to Nuggetroid Arcade! This guide will help you understand the project architecture and how to add amazing features.

## 🎯 Project Philosophy

**Every game should feel spectacular.** We've built a shared effects system that makes any game feel professional and engaging with minimal effort.

## 🛠️ Development Setup

```bash
# Fork and clone the repository
git clone https://github.com/your-username/nuggetroidarcade
cd nuggetroidarcade

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

## 🎮 Adding New Games

### Quick Start Template

```javascript
// src/games/your-game/your-game.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGameEffects } from '../../shared/hooks/useGameEffects';
import { useStreakSystem } from '../../shared/hooks/useStreakSystem';
import { useAchievementSystem } from '../../shared/hooks/useAchievementSystem';
import { EffectContainer } from '../../shared/components/effects/EffectContainer';
import { AnimatedScore } from '../../shared/components/effects/AnimatedScore';
import { StreakDisplay } from '../../shared/components/ui/StreakDisplay';

export default function YourGame() {
  // Shared systems integration
  const { effects, triggerEffectCombo } = useGameEffects(true, 0.7);
  const { currentStreak, handleCorrectAnswer, handleIncorrectAnswer, getStreakDisplay, resetStreak } = useStreakSystem((streakLevel, milestone) => {
    triggerEffectCombo(`streak${streakLevel}`);
  });
  const { checkMultipleAchievements } = useAchievementSystem((achievement) => {
    triggerEffectCombo('achievementUnlock');
  });

  // Your game state
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('start');

  const handleCorrectAnswer = () => {
    const streakResult = handleCorrectAnswer(100); // Base score
    setScore(score + streakResult.totalScore);
    
    // Check for achievements
    checkMultipleAchievements({ 
      totalCorrect: score + 1,
      maxStreak: streakResult.streak 
    });
    
    // Trigger effects
    if (streakResult.milestone) {
      // Effects already triggered by streak system
    } else {
      triggerEffectCombo('correctAnswer');
    }
  };

  const handleWrongAnswer = () => {
    handleIncorrectAnswer();
    triggerEffectCombo('incorrectAnswer');
  };

  return (
    <div className="max-w-4xl mx-auto p-4" style={{ fontFamily: "'Press Start 2P', cursive" }}>
      <Link to="/" className="text-indigo-400 hover:text-indigo-200 mb-4 inline-block text-sm">
        ← Back to Arcade
      </Link>

      <div className="p-4 rounded-lg bg-gray-900 text-white shadow-2xl border-2 border-indigo-500/50">
        <h1 className="text-3xl font-bold text-indigo-400 mb-4 text-center">Your Game 🎮</h1>
        
        {/* Score and streak display */}
        <div className="flex justify-between items-center mb-4 text-sm">
          <AnimatedScore score={score} isAnimating={effects.scoreGlow} />
          <StreakDisplay streakInfo={getStreakDisplay()} isAnimating={effects.lightning} />
        </div>

        {/* Main game area with effects */}
        <EffectContainer effects={effects} emojiTheme="celebration" className="min-h-[300px]">
          {/* Your game content here */}
          <div className="text-center p-8">
            <h2 className="text-xl text-white mb-4">Your awesome game content!</h2>
            
            <button 
              onClick={handleCorrectAnswer}
              className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-bold mr-4"
            >
              Correct Answer (+ Effects!)
            </button>
            
            <button 
              onClick={handleWrongAnswer}  
              className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-lg font-bold"
            >
              Wrong Answer (+ Effects!)
            </button>
          </div>
        </EffectContainer>
      </div>
    </div>
  );
}
```

### Game Discovery
1. **Create folder**: `src/games/your-game-name/`
2. **Add component**: `your-game-name.jsx` (must match folder name)
3. **Export default**: React component
4. **Game appears**: Automatically in arcade menu!

## ⚡ Using the Effects System

### Basic Effects
```javascript
// Import the hook
const { effects, triggerEffectCombo } = useGameEffects();

// Trigger predefined combinations
triggerEffectCombo('correctAnswer');   // Shuriken + katana sound
triggerEffectCombo('incorrectAnswer'); // Smoke + poof sound
triggerEffectCombo('streak5');         // Lightning + sparks + hiya sound
triggerEffectCombo('achievementUnlock'); // Confetti + score glow
```

### Custom Effect Combinations
```javascript
// Add to src/shared/config/animations.js
combinations: {
  yourCustomEffect: [
    { name: 'lightning', duration: 800, delay: 0 },
    { name: 'emojiRain', duration: 3000, delay: 200, theme: 'celebration' },
    { name: 'confetti', duration: 2000, delay: 400 }
  ]
}
```

### Custom Emoji Themes
```javascript
// Add to src/shared/components/effects/EmojiRain.jsx
EMOJI_THEMES = {
  yourTheme: {
    emojis: ['🎯', '🎪', '🎨', '🎭', '🎪'],
    particleCount: 25,
    intensity: 'medium',
    windEffect: true
  }
}
```

## 🏆 Adding Achievements

```javascript
// Add to src/shared/hooks/useAchievementSystem.js
ACHIEVEMENTS = {
  your_achievement: {
    id: 'your_achievement',
    name: 'Achievement Name',
    description: 'Do something awesome 10 times',
    condition: (stats) => stats.awesomeThings >= 10,
    reward: { type: 'theme', value: 'yourTheme' },
    icon: '🏆',
    rarity: 'rare'
  }
}
```

## 🎵 Adding Custom Sounds

1. **Add sound file** to `src/assets/sounds/`
2. **Register in useGameSounds.js**:
```javascript
SOUND_FILES = {
  yourSound: '/src/assets/sounds/your-sound.mp3'
}
```
3. **Create sound combination**:
```javascript
yourSoundCombo: [
  { name: 'yourSound', delay: 0 }
]
```

## 📱 Performance Guidelines

### Visual Effects
- **Particle limits**: Keep particle counts reasonable (20-40 max)
- **Duration limits**: Effects should complete within 3-4 seconds
- **Mobile testing**: Always test on mobile devices
- **Cleanup**: All effects auto-cleanup via the shared system

### Audio
- **File sizes**: Keep sound files under 500KB each
- **Format**: Use MP3 for broadest compatibility
- **Volume**: Sounds should be normalized and not jarring

## 🧪 Testing Your Game

### Manual Testing Checklist
- [ ] Game loads without errors
- [ ] Visual effects trigger correctly
- [ ] Audio effects play in sync
- [ ] Streak system works (test 3, 5, 10+ streaks)
- [ ] Achievement unlocks function
- [ ] Mobile-friendly interface
- [ ] Back button returns to arcade

### Performance Testing
```bash
# Build and test performance
npm run build
npm run preview

# Check bundle size
npm run build --analyze
```

## 📝 Code Style

### Component Structure
- Use functional components with hooks
- Include semantic cues in comments for AI development
- Follow existing naming conventions
- Keep components focused and reusable

### File Organization
```
src/games/your-game/
├── your-game.jsx          # Main component
├── your-game-AI-notes.md  # AI development notes
├── game-data.js           # Game-specific data (optional)
└── assets/                # Game-specific assets (optional)
```

### AI Development Notes
Always create an AI notes file with semantic cues:
```markdown
# Your Game - AI Development Notes

## SEMANTIC CUE: Brief description of game purpose

### Key Features
- Feature 1: How it works and why
- Feature 2: Integration with shared systems

### Common Requests & Solutions
- "Add X feature" → Implementation approach
```

## 🚀 Submitting Changes

1. **Fork** the repository
2. **Create branch**: `git checkout -b feature/amazing-feature`
3. **Test thoroughly**: All effects, mobile compatibility
4. **Update documentation**: README, AI notes, etc.
5. **Commit**: `git commit -m "Add amazing feature with lightning effects"`
6. **Push**: `git push origin feature/amazing-feature`  
7. **Pull Request**: Describe your changes and test results

### Commit Message Guidelines
- Use descriptive messages
- Mention effects/features added
- Reference any issues fixed

## 🎨 Design Guidelines

### Visual Consistency
- Use the retro gaming font: `'Press Start 2P', cursive`
- Follow the color scheme: Indigo primary, green success, red error
- Maintain the dark theme aesthetic
- Keep UI elements aligned with existing games

### Effect Integration
- Every success should have visual feedback
- Failures should have appropriate (not harsh) feedback
- Streaks should feel increasingly rewarding
- Achievements should be celebratory

## 📚 Resources

- **Shared Effects Documentation**: `src/shared/` components and hooks
- **Example Games**: History Ninja and Word Wizard implementations
- **Animation Config**: `src/shared/config/animations.js` for all effect combinations
- **Emoji Library**: `src/shared/components/effects/EmojiRain.jsx` for themes

## 🤔 Need Help?

- **Issues**: Open a GitHub issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for general questions
- **Examples**: Look at existing games for implementation patterns
- **Documentation**: All shared systems are thoroughly documented

---

**Remember: Every contribution makes the arcade more spectacular!** ⚡🎮✨
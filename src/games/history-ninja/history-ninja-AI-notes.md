# History Ninja - AI Development Notes

## <� SEMANTIC CUES FOR FUTURE AI DEVELOPMENT

### Architecture Overview
- **Pattern**: Quiz game with visual effects system
- **State Management**: React hooks with custom effect hooks
- **Animation System**: Modular, configurable, theme-based
- **Scalability**: Built for easy addition of new visual effects

### Key Components & Their Purposes

#### Main Component (`history-ninja.jsx`)
- **Game Flow**: start � playing � finished states
- **Visual Effects Integration**: Uses `useGameEffects` hook for all animations
- **Scoring System**: 100 points per correct answer, persistent high scores
- **Effect Triggers**: Based on answer correctness (correct/incorrect/zany)

#### Audio-Visual Effects System (SHARED ACROSS ALL GAMES)
- **Location**: `src/shared/hooks/useGameEffects.js` + `src/shared/hooks/useGameSounds.js`
- **Pattern**: Synchronized audio-visual trigger system with automatic cleanup
- **Availability**: Can be imported and used by any game in the arcade
- **Integration**: Automatically synchronizes visual effects with ninja-themed sounds
- **Effect Types**: 
  - `smoke` - Wrong answers (dispersing particles)
  - `shuriken` - Correct answers (spinning projectile)
  - `scoreGlow` - Score increases (pulsing animation)
  - `transition` - Question changes (sliding effects)
  - `confetti` - Game completion (colorful particles)
  - `lightning` - Special achievements (dramatic flashes)  
  - `sparks` - Streak bonuses (electric particles)
  - `emojiRain` - Country-themed celebrations (themed emoji falling from sky)

#### Animation Configuration (SHARED ACROSS ALL GAMES)  
- **Location**: `src/shared/config/animations.js`
- **Purpose**: Centralized timing, combinations, and effect parameters for ALL arcade games
- **Structure**: Individual effects + predefined combinations
- **Extensibility**: Easy to add new effect types and combinations
- **Global Access**: Any game can import and use these animations

### =' DEVELOPMENT PATTERNS

#### Adding New Visual Effects (Available to ALL Games)
1. **Define in src/shared/config/animations.js**: Add timing and parameters
2. **Create component in src/shared/components/effects/**: Reusable effect component  
3. **Register in src/shared/hooks/useGameEffects.js**: Add trigger and cleanup logic
4. **Use in ANY game component**: Import and call `triggerEffect('newEffect')`
5. **Benefits ALL games**: New effects automatically available arcade-wide

#### Effect Combinations
```javascript
// Example: Adding a new "perfect streak" effect combination
ANIMATIONS.combinations.perfectStreak = [
  { name: 'lightning', duration: 1200, delay: 0 },
  { name: 'scoreGlow', duration: 800, delay: 200 },
  { name: 'confetti', duration: 2000, delay: 400 }
];
```

#### Performance Considerations
- **Cleanup**: All effects auto-cleanup via setTimeout
- **GPU Acceleration**: Use `transform` and `opacity` for smooth animations
- **Minimal DOM**: Conditional rendering prevents unnecessary elements

### <� THEMING & CUSTOMIZATION

#### Current Theme: Ninja
- **Colors**: Indigo primary, green success, red error
- **Fonts**: Press Start 2P (retro gaming)
- **Effects**: Smoke, shuriken, slashing transitions
- **Sound Integration**: Ready for ninja-themed audio

#### Adding New Themes
1. Create theme object in `themes/[themeName].js`
2. Define effect mappings and color schemes
3. Update component to accept theme prop
4. Swap effect components based on theme

### =� FUTURE ENHANCEMENT AREAS

#### High Priority
- **Sound Effects**: Audio feedback system for immersion
- **Particle Systems**: More complex visual effects
- **Accessibility**: Screen reader support, reduced motion options

#### Medium Priority
- **Mobile Optimizations**: Touch-friendly effects, performance tuning
- **Advanced Animations**: CSS-in-JS with dynamic styling
- **Effect Library**: Shared effects across multiple games

#### Low Priority
- **3D Effects**: WebGL integration for advanced visuals
- **Physics**: Realistic particle movement with gravity

### >� AI DEVELOPMENT HINTS

#### When Adding Visual Effects
- **Always check**: Does this effect type already exist?
- **Consider performance**: Will this run 60fps on mobile?
- **Think combinations**: How does this combine with other effects?
- **Plan cleanup**: How and when should this effect end?

#### When Refactoring
- **Preserve patterns**: Keep the trigger-based system intact
- **Maintain separation**: Keep game logic separate from visual logic
- **Test thoroughly**: Visual effects can impact game performance

#### Common Requests & Solutions
- **"Add explosion effect"** � Create in components/effects/, register in useGameEffects
- **"Make effects faster/slower"** � Modify ANIMATIONS config
- **"Add sound to effects"** � Extend animation config with audio properties
- **"Disable effects on mobile"** � Add responsive conditions in effect triggers

### =� CODE REVIEW CHECKLIST

Before suggesting changes, verify:
- [ ] Effect cleanup is handled automatically
- [ ] Animation configurations are centralized
- [ ] Game logic remains separate from visual logic
- [ ] Performance impact is considered
- [ ] Mobile/accessibility implications are addressed
- [ ] New effects follow existing naming conventions

### =
 DEBUGGING VISUAL EFFECTS

#### Common Issues
- **Effects not triggering**: Check state updates in useGameEffects
- **Effects not cleaning up**: Verify setTimeout cleanup logic
- **Performance lag**: Check if too many particles/elements rendering
- **Mobile issues**: Test animation performance on slower devices

#### Debug Tools
- Add `console.log` in effect triggers to trace execution
- Use React DevTools to monitor state changes
- Browser DevTools Performance tab for animation profiling

### 🏆 PROGRESSION SYSTEMS

#### Streak System
**Location**: `src/shared/hooks/useStreakSystem.js`
- **Tracks consecutive correct answers** with escalating rewards
- **Milestone celebrations** at 3, 5, 7, 10, 15, 20+ streaks
- **Score multipliers** increase with streak level (1.5x to 5x)
- **Visual effects** trigger automatically at milestones
- **Persistent tracking** of max streak achieved

```javascript
// Usage in any game
const { currentStreak, handleCorrectAnswer, getStreakDisplay } = useStreakSystem((level, milestone) => {
  triggerEffectCombo(`streak${level}`); // Auto-trigger effects
});

// Handle correct answer with streak bonus
const result = handleCorrectAnswer(100); // Base score
// Returns: { streak: 5, bonusScore: 100, totalScore: 200, milestone: {...} }
```

#### Achievement System  
**Location**: `src/shared/hooks/useAchievementSystem.js`
- **Unlockable achievements** with special emoji rain themes
- **Persistent progress** tracked in localStorage
- **Automatic checking** against game statistics
- **Celebration effects** when achievements unlock
- **Themed rewards** for different accomplishments

```javascript
// Pre-defined achievements
ACHIEVEMENTS = {
  streak_master: { condition: (stats) => stats.maxStreak >= 5, reward: 'lightning theme' },
  flawless_american: { condition: (stats) => stats.americanPerfect, reward: 'american_elite theme' },
  history_scholar: { condition: (stats) => stats.categoriesCompleted >= 3, reward: 'scholar theme' }
}
```

#### Combo System (Integrated with Streaks)
- **Escalating visual effects** for consecutive correct answers
- **3+ streak**: Lightning ⚡ + score glow
- **5+ streak**: Lightning + sparks + extended score glow  
- **10+ streak**: Lightning + legendary emoji rain + confetti
- **Combo breaker**: Smoke effects when streak ends

### 🎵 SOUND EFFECTS INTEGRATION

#### Available Ninja Sounds
```javascript
// From src/shared/hooks/useGameSounds.js
SOUND_FILES = {
  katana_cut: 'Satisfying blade strike for correct answers',
  fighting_hiya: 'Dramatic battle cry for celebrations', 
  sai_deflect: 'Playful deflection for zany answers',
  ninja_teleport: 'Quick teleport for transitions',
  poof_smoke: 'Smoke disappointment for wrong answers',
  explosion: 'Epic blast for major achievements',
  howl: 'Victory howl for high scores',
  jump: 'Quick movement sound',
  laser: 'Futuristic effect sound'
}
```

#### Audio-Visual Combinations
```javascript
// Trigger synchronized effects
triggerEffectCombo('correctAnswer');   // Shuriken visual + katana cut sound
triggerEffectCombo('incorrectAnswer'); // Smoke visual + poof sound  
triggerEffectCombo('newHighScore');    // Lightning + howl + hiya + explosion
triggerEffectCombo('gameComplete');    // Emoji rain + teleport + explosion
```

#### Adding New Sound Effects
1. **Add sound file** to `src/assets/sounds/`
2. **Register in SOUND_FILES** in `useGameSounds.js`
3. **Create sound combination** in `useGameSounds.js` combos
4. **Map to visual combo** in `ANIMATIONS.audio` config
5. **Use with triggerEffectCombo()** in any game

### 🎊 EMOJI RAIN SYSTEM

#### Overview
The `EmojiRain` component creates themed falling emoji effects for country-specific celebrations.

#### Pre-built Themes Available
```javascript
// From src/shared/components/effects/EmojiRain.jsx
EMOJI_THEMES = {
  american: ['🦅', '🇺🇸', '🗽', '🎆', '⭐'],
  british: ['🇬🇧', '👑', '🏰', '☕', '🌹'],  
  japanese: ['🇯🇵', '🏯', '🗾', '🌸', '⛩️'],
  'ancient-rome': ['🏛️', '⚔️', '🛡️', '🦅', '🏺'],
  'space-race': ['🚀', '🌟', '🛸', '👨‍🚀', '🌙'], 
  pirates: ['🏴‍☠️', '⚓', '💰', '🦜', '⚔️'],
  lightning: ['⚡', '🌩️', '💫', '✨', '⚡'],
  legendary: ['🔥', '💎', '👑', '🌟', '🏆'],
  dragon: ['🐉', '🔥', '⚡', '💎', '🌟']
}
```

#### Usage Examples
```javascript
// Trigger emoji rain
triggerEffect('emojiRain', 4000);

// In EffectContainer, specify theme:
<EffectContainer effects={effects} emojiTheme="american" />

// Use predefined country completion effects
triggerMultipleEffects(EFFECT_COMBOS.americanComplete);
// Results in: eagles 🦅, US flags 🇺🇸, Statue of Liberty 🗽 raining from sky!

// Custom emoji rain with specific settings
<EmojiRain 
  emojis={['🦅', '🇺🇸', '🗽']} 
  particleCount={30} 
  intensity="heavy"
  windEffect={true} 
/>
```

#### Adding New Country Themes (Benefits ALL Arcade Games)
1. **Add emoji set to EMOJI_THEMES** in `src/shared/components/effects/EmojiRain.jsx`
2. **Add country completion combo** in `src/shared/config/animations.js`:
   ```javascript
   newCountryComplete: [
     { name: 'emojiRain', duration: 4000, delay: 0, theme: 'newCountry' },
     { name: 'confetti', duration: 3000, delay: 500 }
   ]
   ```
3. **Map country to theme** in `COUNTRY_EMOJI_THEMES`
4. **Use in ANY game completion** with `getCountryCompletionEffects(country)`
5. **Automatic availability**: All games can now use the new theme

#### Advanced Features
- **Physics simulation**: Wind effects, bouncing, varied fall speeds
- **Intensity levels**: Light (15 particles), Medium (25), Heavy (40+)
- **Customizable animations**: Rotation, scaling, opacity transitions
- **Performance optimized**: Automatic cleanup, mobile-friendly particle counts

---

**Last Updated**: Added complete progression systems (streaks, achievements, combos) + 3 new categories
**Architecture Version**: 3.0 (Full progression system with audio-visual effects)
**Performance Target**: 60fps on mobile devices with audio  
**Shared Components**: src/shared/{components,config,hooks} - usable by any game
**New Features**: 
- ⚡ Streak system with 6 milestone levels and score multipliers
- 🏆 Achievement system with unlockable emoji rain themes  
- 🏛️ 3 new themed categories: Ancient Rome, Space Race, Pirates
- 🔥 Combo system with escalating visual effects
- 🎵 9 ninja-themed sounds synchronized with all effects
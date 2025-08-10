# Word Wizard - AI Development Notes

## <¯ SEMANTIC CUES FOR FUTURE AI DEVELOPMENT

### Architecture Overview
- **Pattern**: Spelling/vocabulary game with progression systems
- **Text-to-Speech**: Advanced voice selection for word pronunciation
- **Shared Systems**: Full integration with arcade-wide effects, streaks, and achievements
- **Coin Economy**: Persistent currency system with cosmetic rewards

### Key Components & Their Purposes

#### Main Component (`word-wizard.jsx`)
- **Game Flow**: start ’ playing ’ correct/incorrect feedback ’ next word
- **Audio Integration**: Text-to-speech with random voice selection for word pronunciation
- **Progression Systems**: Uses shared streak system, achievement system, and visual effects
- **Persistent Economy**: Coin earning, skin purchasing, and progress saving

#### Shared Systems Integration
- **Location**: All systems imported from `src/shared/hooks/` and `src/shared/components/`
- **Visual Effects**: Shuriken for correct spellings, smoke for incorrect, lightning for streaks
- **Audio Effects**: Ninja-themed sounds synchronized with spelling events
- **Streak System**: Lightning effects at 3, 5, 7, 10+ word streaks with score multipliers
- **Achievement System**: Word-specific achievements like "Spelling Bee Champion", "Expert Speller"

### =% PROGRESSION SYSTEMS

#### Streak System for Spelling
- **3+ word streak**: Lightning flash ¡ + "Hot Streak!" voice + sai deflect sound
- **5+ word streak**: Lightning + sparks + "On Fire!" + fighting hiya sound + 2x multiplier
- **10+ word streak**: Lightning + legendary emoji rain + confetti + epic sound combo + 3x multiplier
- **Streak broken**: Smoke effects + poof sound

#### Word Wizard Achievements
```javascript
spelling_bee: {
  name: 'Spelling Bee Champion',
  description: 'Spell 50 words correctly',
  reward: 'scholar emoji theme' // =Ú <“ =Ü =‹ <Û
},

word_streak_master: {
  name: 'Word Streak Master', 
  description: 'Get a 10-word spelling streak',
  reward: 'lightning emoji theme' // ¡ <) =« (
},

expert_speller: {
  name: 'Expert Speller',
  description: 'Successfully spell 10 expert difficulty words',
  reward: 'legendary emoji theme' // =% =Ž =Q < <Æ
}
```

#### Coin Economy & Cosmetics
- **Earnings**: Base coins = word length × difficulty multiplier + streak bonuses
- **Difficulty Multipliers**: Easy (1x), Medium (2x), Hard (3x), Expert (4x)
- **Streak Bonuses**: Every 5 words in streak = +5 bonus coins
- **Skins Available**: Noob (free), Rainbow (50 coins), Neon (80 coins), Gold (100 coins)
- **Persistence**: All progress saved in localStorage

### <µ AUDIO-VISUAL EXPERIENCE

#### Text-to-Speech Integration
- **Voice Selection**: Automatically picks random US English voices for variety
- **Speaking Patterns**: 
  - "Please spell" + word name at round start
  - Repeat word on button press
  - Achievement and streak announcements
  - Correct spelling confirmation for wrong answers

#### Visual Effect Themes
- **Default Theme**: celebration emojis <‰ <Š P <Æ <†
- **Spelling Theme**: =Ý  =Ú <“ P (for achievement unlocks)
- **Scholar Theme**: =Ú <“ =Ü =‹ <Û (educational focus)
- **Word Wizard Theme**: >ÙB =Ö ( =. P (magical spelling)

#### Sound Effect Integration
- **Correct Spelling**: Shuriken animation + katana cut sound
- **Incorrect Spelling**: Smoke particles + poof sound + TTS correction
- **Streak Milestones**: Lightning effects + ninja celebration sounds
- **Achievement Unlocks**: Confetti + score glow + TTS announcement

### =' DEVELOPMENT PATTERNS

#### Adding New Difficulty Levels
1. **Extend wordLists** in `word-list.js` with new difficulty key
2. **Update difficulty multiplier** in `checkAnswer()` function
3. **Add to UI buttons** in difficulty selection section
4. **Test TTS pronunciation** with new word sets

#### Adding New Skins
1. **Extend availableSkins array** with new skin object
2. **Define visual properties**: color, gradientClass, textShadow
3. **Set cost and unlock conditions**
4. **Test visual appearance** in skin shop preview

#### Adding Word-Specific Effects
1. **Create new emoji themes** in `EmojiRain.jsx` EMOJI_THEMES
2. **Map to achievements** in `useAchievementSystem.js`  
3. **Trigger with triggerEffectCombo()** on specific events
4. **Add audio mappings** in animations config if needed

### >à AI DEVELOPMENT HINTS

#### When Enhancing Spelling Features
- **Always test TTS**: Different browsers have different voice availability
- **Consider accessibility**: Visual effects should have audio counterparts
- **Think progression**: How do new features encourage continued play?
- **Mobile optimization**: Text input and effects must work on mobile

#### When Adding New Achievements
- **Meaningful milestones**: Achievements should feel earned, not given
- **Visual rewards**: Each achievement should unlock something visual
- **Balanced difficulty**: Mix of easy, medium, and challenging goals
- **Cross-game compatibility**: Use shared achievement system benefits

#### Common Spelling Game Requests & Solutions
- **"Add categories/themes"** ’ Extend word-list.js with themed word sets
- **"Make streak effects more dramatic"** ’ Increase particle counts in effect themes
- **"Add multiplayer"** ’ Consider shared leaderboard via achievement system
- **"Voice recognition"** ’ Could replace text input with speech recognition API
- **"Hint system"** ’ Show first letter or length, cost coins

### =Ý CODE REVIEW CHECKLIST

Before suggesting spelling game changes:
- [ ] TTS functionality tested across browsers
- [ ] Visual effects don't interfere with text input focus
- [ ] Streak system properly resets between games
- [ ] Achievement conditions are achievable and balanced
- [ ] Coin economy feels rewarding but not too easy
- [ ] Mobile text input experience is smooth
- [ ] All effects use shared system (no game-specific effects)

### = DEBUGGING SPELLING FEATURES

#### Common Issues
- **TTS not working**: Check browser support, voice availability
- **Effects too intense**: May distract from spelling focus
- **Input lag**: Visual effects might slow down text input
- **Achievement not unlocking**: Check game stats object properties

#### Performance Considerations
- **TTS loading time**: Don't block gameplay waiting for voices
- **Effect frequency**: Limit concurrent effects during rapid spelling
- **Memory usage**: Clear old word history to prevent memory leaks

---

**Last Updated**: Integrated with shared progression systems
**Architecture Version**: 1.0 (Shared effects integration)  
**Performance Target**: 60fps with TTS and visual effects
**Unique Features**: Advanced TTS integration + coin economy + cosmetic progression
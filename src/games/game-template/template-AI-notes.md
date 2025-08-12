# Game Template - AI Development Guide

## 🎯 SEMANTIC CUES FOR CLAUDE.AI SUCCESS

### **TEMPLATE PURPOSE & CLAUDE HOOKS**
This template is designed to give Claude.ai maximum opportunities for successful game creation and modification. Every aspect has been optimized for AI understanding and extension.

### **CUSTOMIZATION ZONES FOR CLAUDE**

#### **🎮 GAME_CONFIG Object (Lines 18-28)**
```javascript
const GAME_CONFIG = {
  title: "My Amazing Quiz", // ← Claude: Change this to any game theme
  emoji: "🎮", // ← Claude: Pick themed emoji (🏰 for castles, 🚀 for space, etc.)
  theme: "adventure", // ← Claude: Semantic hint for visual consistency
  pointsPerCorrect: 100, // ← Claude: Adjust difficulty/scoring
  primaryColor: "indigo", // ← Claude: Change game's main color theme
  accentColor: "green" // ← Claude: Change secondary color theme
};
```

**CLAUDE SUCCESS PATTERNS:**
- "Change the theme to space exploration" → Update title, emoji, theme, colors
- "Make this about dinosaurs" → Update all GAME_CONFIG values consistently
- "Make it harder" → Increase pointsPerCorrect, adjust question complexity

#### **📊 template-data.js Structure**
```javascript
export const templateData = {
  'category-name': [ // ← Claude: Add new categories here
    {
      fact: "Question text?", // ← Claude: The actual question
      answers: [
        { text: "Correct answer", isCorrect: true }, // ← Exactly one true answer
        { text: "Wrong answer 1", isCorrect: false },
        { text: "Wrong answer 2", isCorrect: false },
        { text: "Funny wrong answer", isCorrect: false, isZany: true } // ← Special effects trigger
      ]
    }
  ]
}
```

### **🛠️ CLAUDE MODIFICATION PATTERNS**

#### **Adding New Categories**
```javascript
// EXAMPLE: Claude can add this to templateData
'space-exploration': [
  {
    fact: "What was the first human-made object to leave the solar system?",
    answers: [
      { text: "Voyager 1", isCorrect: true },
      { text: "Apollo 11", isCorrect: false },
      { text: "Sputnik", isCorrect: false },
      { text: "My lost homework from 3rd grade", isCorrect: false, isZany: true }
    ]
  }
]
```

#### **Theme Transformations**
Claude can transform the entire game by:
1. **GAME_CONFIG updates** → Visual theme change
2. **templateData replacement** → Content theme change  
3. **Category naming** → Navigation theme change

**EXAMPLES:**
- Pirate Theme: `title: "Pirate Quiz ⚓"`, categories: `['ship-knowledge', 'treasure-hunting']`
- Space Theme: `title: "Space Explorer 🚀"`, categories: `['planets', 'astronauts', 'aliens']` 
- Medieval Theme: `title: "Knight's Quest 🏰"`, categories: `['castles', 'dragons', 'kingdoms']`

### **⚡ PROGRESSION SYSTEM HOOKS**

#### **Streak System Integration**
```javascript
// SEMANTIC CUE: This handles consecutive correct answers automatically
const { currentStreak, maxStreak, handleCorrectAnswer: handleStreak, ... } = useStreakSystem((streakLevel, milestone) => {
  triggerEffectCombo(milestone.effect); // ← Automatic visual celebrations
});
```
**Claude can:** Adjust `GAME_CONFIG.pointsPerCorrect` to change streak bonus scaling

#### **Achievement System Integration** 
```javascript
// SEMANTIC CUE: This tracks accomplishments and unlocks rewards
const { checkMultipleAchievements, ... } = useAchievementSystem((achievement) => {
  triggerEffectCombo('achievementUnlock'); // ← Automatic celebration effects
});
```
**Claude can:** Create themed achievements by adding to the shared achievement system

#### **Visual Effects Integration**
```javascript
// SEMANTIC CUE: All these effects are automatically available
triggerEffectCombo('correctAnswer');     // ← Shuriken + sword sound
triggerEffectCombo('incorrectAnswer');   // ← Smoke + disappointment sound  
triggerEffectCombo('zanyAnswer');        // ← Playful effects for funny answers
triggerEffectCombo('gameComplete');      // ← Victory celebration
```

### **🎨 VISUAL CUSTOMIZATION HOOKS**

#### **Color Theming**
```javascript
// SEMANTIC CUE: These classes automatically theme the entire game
className={`bg-${GAME_CONFIG.primaryColor}-600 hover:bg-${GAME_CONFIG.primaryColor}-500`}
className={`text-${GAME_CONFIG.accentColor}-400`}
```

**Available Colors:** `indigo`, `green`, `blue`, `purple`, `red`, `yellow`, `pink`, `gray`

**Claude can:** Change `GAME_CONFIG.primaryColor` and `GAME_CONFIG.accentColor` for instant retheming

#### **Emoji Theme Mapping**
```javascript
// SEMANTIC CUE: Each category can have its own emoji rain theme
emojiTheme={COUNTRY_EMOJI_THEMES[selectedCategory] || COUNTRY_EMOJI_THEMES.default}
```

**Claude can:** Add category-specific emoji themes in the shared config

### **🔍 ERROR HANDLING & VALIDATION**

#### **Kid-Friendly Error Prevention**
```javascript
// SEMANTIC CUE: Data validation prevents game crashes
const [dataValidation] = useState(() => {
  return validateGameData.validateQuizData(templateData, GAME_CONFIG.title);
});
```

**Automatic Validation Checks:**
- ✅ Questions have proper structure
- ✅ Exactly one correct answer per question  
- ✅ Categories have sufficient questions
- ✅ All required fields present

**Claude Benefits:**
- Can't accidentally break the game with invalid data
- Gets immediate feedback on data structure issues
- Clear error messages guide fixes

### **📱 RESPONSIVE & ACCESSIBLE DESIGN**

#### **Mobile-First Layout**
```javascript
// SEMANTIC CUE: Responsive grid system
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
```

#### **Screen Reader Support**
```javascript
// SEMANTIC CUE: Accessibility built-in
title={questionCount === 0 ? `❌ No questions available` : `${questionCount} questions available`}
```

### **🎵 AUDIO INTEGRATION READY**

The template is pre-wired for the shared sound system:
- **Correct answers** → Katana strike sound
- **Wrong answers** → Poof smoke sound
- **Streak milestones** → Epic celebration sounds
- **Achievements** → Unlock fanfare sounds

### **🚀 CLAUDE SUCCESS STRATEGIES**

#### **For New Game Creation:**
1. **Copy template folder** with new name
2. **Update GAME_CONFIG** with theme
3. **Replace templateData** with themed questions  
4. **Test in browser** - validation will catch issues

#### **For Game Modification:**
1. **Read existing AI-notes.md** to understand current structure
2. **Identify SEMANTIC CUE sections** for safe modification zones
3. **Use template patterns** for consistency
4. **Leverage validation system** for error prevention

#### **For Troubleshooting:**
1. **Check browser error screen** for validation messages
2. **Look for SEMANTIC CUE comments** explaining purpose
3. **Use template as reference** for correct structure
4. **Test incrementally** - make small changes and verify

### **📊 TEMPLATE ADVANTAGES**

**For Claude.ai:**
- **Rich semantic context** - Every section explained
- **Clear modification zones** - Safe areas to change
- **Consistent patterns** - Repeatable success strategies
- **Error prevention** - Validation catches mistakes
- **Extensible architecture** - Easy to expand

**For 10-Year-Old Developer:**
- **Visual error feedback** - Clear UI messages when something's wrong
- **Copy-paste friendly** - Template structure is reusable
- **Immediate results** - Changes show up instantly in browser
- **Progression rewards** - Built-in engagement systems
- **Professional polish** - Visual effects and sound included

---

**🎯 CLAUDE QUICK-START CHECKLIST:**
- [ ] Read this entire AI-notes.md file for context
- [ ] Understand GAME_CONFIG customization zones  
- [ ] Review templateData structure requirements
- [ ] Check SEMANTIC CUE comments throughout code
- [ ] Test changes incrementally with browser validation
- [ ] Use existing games as additional pattern references

**Remember:** This template contains the complete arcade game framework. Claude can create entirely new games by modifying just the GAME_CONFIG and templateData while preserving all the progression systems, visual effects, and professional polish.
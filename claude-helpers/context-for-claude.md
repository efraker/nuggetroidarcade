# Context for Claude.ai - Arcade Development

## 🎯 **Project Overview for AI Understanding**

This is a React-based game arcade specifically designed for easy game development by a developer working with Claude.ai. The architecture prioritizes:

- **Auto-discovery**: New games appear automatically when added to `/src/games/`
- **Copy-paste workflow**: Copy Claude's code directly into GitHub web UI
- **Error prevention**: Validation systems prevent crashes and show helpful messages
- **Rich effects**: Built-in visual effects, sounds, and progression systems

## 🏗️ **Architecture Context**

### **File Structure Pattern**
```
src/games/[game-name]/
├── [game-name].jsx          # Main React component
├── [game-name]-data.js      # Game content
└── [game-name]-AI-notes.md  # Game-specific context for Claude.ai
```

### **Shared Systems Available**
All games can use these pre-built systems:
- **Visual Effects**: Confetti, lightning, emoji rain, smoke, etc.
- **Sound System**: Sounds synchronized with visuals  
- **Streak System**: Tracks consecutive correct answers with bonus scoring
- **Achievement System**: Unlockable rewards and special celebrations
- **Validation System**: Prevents crashes and shows kid-friendly error messages

## 🎮 **Game Development Patterns**

### **Quiz Game Structure** (History Ninja, Game Template)
```javascript
// Data structure for quiz games
export const gameData = {
  'category-name': [
    {
      fact: "Question text?",
      answers: [
        { text: "Correct answer", isCorrect: true },
        { text: "Wrong answer", isCorrect: false },
        { text: "Funny answer", isCorrect: false, isZany: true } // Triggers special effects
      ]
    }
  ]
};
```

### **Word Game Structure** (Word Wizard)
```javascript
// Data structure for word games  
export const wordLists = {
  easy: ['cat', 'dog', 'sun'],
  medium: ['bicycle', 'journey'], 
  hard: ['encyclopedia'],
  expert: ['conscientious']
};
```

## 🛡️ **Error Prevention System**

### **Validation Helpers**
Located in `/src/shared/helpers/validation.js`:
- `validateQuizData()` - Checks question structure
- `validateWordData()` - Checks word list structure  
- `safeDataAccess` - Provides fallbacks for missing data

### **Kid-Friendly Error Messages**
When data is invalid, games show browser UI with:
- ❌ Specific problem descriptions
- 💡 Clear instructions for fixing
- 🔄 "Try Again" button to reload after fixes

## 🎨 **Visual Theming System**

### **Color Themes Available**
Primary and accent colors: `indigo`, `green`, `blue`, `purple`, `red`, `yellow`, `pink`, `gray`

### **Emoji Themes for Effects**
- `american` - 🦅🇺🇸🗽🎆⭐
- `space-race` - 🚀🌟🛸👨‍🚀🌙  
- `pirates` - 🏴‍☠️⚓💰🦜⚔️
- `lightning` - ⚡🌩️💫✨⚡
- Plus 10+ more themed emoji sets

## 🎵 **Audio System**

### **Available Sounds**
- `katana_cut` - Satisfying blade strike (correct answers)
- `fighting_hiya` - Battle cry (celebrations)
- `poof_smoke` - Disappointment (wrong answers)
- `explosion` - Epic blast (achievements)
- Plus 5+ more sounds

### **Audio-Visual Combos**
```javascript
triggerEffectCombo('correctAnswer');   // Shuriken visual + katana sound
triggerEffectCombo('incorrectAnswer'); // Smoke visual + poof sound
triggerEffectCombo('gameComplete');    // Confetti + victory sounds
```

## 📱 **Technical Requirements**

### **Browser Compatibility**
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Touch-friendly for tablets
- 60fps performance target

### **Dependencies**
- React 19+
- React Router DOM (routing)
- Tailwind CSS 4+ (styling)  
- Vite 7+ (build system)
- No external game libraries needed

## **Young Developer Context**

### **Skill Level Assumptions**
- **Programming**: None required
- **Workflow**: Copy-paste between Claude.ai and GitHub web UI
- **Tools**: GitHub Pages for hosting, browser for testing
- **Goals**: Create and modify games through Claude collaboration

### **Success Patterns**
1. **Small changes first**: Add questions, change colors, modify text
2. **Use templates**: Copy existing patterns rather than creating from scratch
3. **Test frequently**: Make one change, check browser, repeat
4. **Read error messages**: Red error screens provide specific guidance

## 🤖 **Claude.ai Integration Points**

### **Semantic Cues in Code**
Look for `// SEMANTIC CUE:` comments throughout the codebase - these explain:
- Purpose of code sections
- Safe areas to modify  
- Integration points with shared systems
- Expected data structures

### **AI-Notes Files**
Each game has an `*-AI-notes.md` file containing:
- Architecture explanations
- Modification patterns  
- Common requests and solutions
- Debugging guidance
- Code review checklists

### **Template System**
The `/src/games/game-template/` provides:
- Complete working game example
- Rich semantic documentation
- Customization zones clearly marked
- Data structure templates
- Visual theming examples

## 🔧 **Development Workflow**

### **For New Games**
1. Copy `/game-template/` folder with new name
2. Update `GAME_CONFIG` object with theme
3. Replace `templateData` with new content
4. Test in browser - validation catches issues

### **For Modifications**
1. Read existing `*-AI-notes.md` for context
2. Identify `SEMANTIC CUE` sections for safe changes
3. Make incremental changes
4. Use browser error messages for debugging

### **For Troubleshooting**
1. Check browser for red error screen with specific messages
2. Compare with working template structure
3. Use validation helpers to identify data issues
4. Test with minimal changes first

## 🎯 **Success Metrics**

### **For Claude.ai**
- Can create new games without breaking existing systems
- Generates valid data structures on first try
- Provides clear, copy-paste ready code
- Explains changes in terms a 6th grader can understand

### **For Young Developer**  
- Games work immediately after copying Claude's code
- Error messages are helpful and actionable
- Changes are visible and rewarding
- Can create impressive games with simple modifications

---

## 📚 **Key Files to Reference**

When helping with game development, these files provide essential context:

1. **`/src/games/game-template/template-AI-notes.md`** - Complete template documentation
2. **`/src/games/history-ninja/history-ninja-AI-notes.md`** - Complex game example  
3. **`/src/games/word-wizard/word-wizard-AI-notes.md`** - Alternative game pattern
4. **`/src/shared/helpers/validation.js`** - Error prevention system
5. **`/CLAUDE.md`** - Project overview and architecture
6. **`/claude-helpers/example-prompts.md`** - Common request patterns

This context enables Claude.ai to provide accurate, helpful, and immediately usable code for game development.
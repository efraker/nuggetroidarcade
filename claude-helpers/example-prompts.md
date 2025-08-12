# Example Prompts for Claude.ai

## 📋 **Copy-Paste Prompts for Common Tasks**

### **🎮 ADDING QUESTIONS TO EXISTING GAMES**

#### For History Ninja:
```
I want to add 5 new questions about Ancient Egypt to the history-ninja game. Please create a new 'ancient-egypt' category. Make sure each question has 1 right answer, 2 regular wrong answers, and 1 funny "zany" answer that will trigger special effects.

Topics to include:
- Pyramids
- Pharaohs  
- Mummies
- The Nile River
- Hieroglyphs

Please show me the exact code to add to the history-facts.js file.
```

#### For Word Wizard:
```
I want to add 10 new words about animals to the word-wizard game. Please add them to the "medium" difficulty level in word-list.js. 

Animal words to include:
- elephant
- giraffe  
- penguin
- butterfly
- kangaroo
- dolphin
- octopus
- rhinoceros
- chimpanzee
- flamingo

Show me exactly what to add to the word-list.js file.
```

### **🎨 CREATING NEW GAME THEMES**

#### Space Theme:
```
I want to create a new space-themed quiz game using the game template. Please:

1. Set the theme to space exploration with a rocket emoji
2. Use blue and purple colors  
3. Create 3 categories: 'planets', 'astronauts', 'space-missions'
4. Add 4-5 questions per category about space topics
5. Make sure each question has funny "zany" answers related to space

Show me all the code changes needed for both the game-template.jsx file and template-data.js file.
```

#### Dinosaur Theme:
```
I want to transform the game template into a dinosaur quiz game. Please:

1. Change the title to "Dino Explorer" with a dinosaur emoji
2. Use green and brown colors to match the prehistoric theme
3. Create categories: 'meat-eaters', 'plant-eaters', 'flying-dinosaurs'  
4. Add 5 questions per category about different dinosaurs
5. Include zany answers that are funny and dinosaur-related

Please show me exactly what to change in the GAME_CONFIG and templateData sections.
```

### **🔧 FIXING GAME PROBLEMS**

#### Data Validation Errors:
```
My game is showing error messages when I try to play it. The error screen says there are problems with my questions. Can you help me fix the data structure in my [GAME-NAME] game? 

Here are the error messages I'm seeing:
[Copy the error messages from the red error screen here]

Please show me the corrected version of my data file.
```

#### Missing Categories:
```
My game shows "No questions available" for some categories. Can you check my data file and add questions to the categories that are empty? I want at least 5 questions per category.

The categories that need questions are:
- [category-name-1]
- [category-name-2] 

Please create questions appropriate for kids and include zany answers.
```

### **🎭 CUSTOMIZING EXISTING GAMES**

#### Change History Ninja Theme:
```
I want to change History Ninja to be about mythology instead of history. Please:

1. Change the title to "Mythology Master" 
2. Keep the ninja theme and colors
3. Replace all the historical questions with mythology questions
4. Create categories like: 'greek-gods', 'norse-myths', 'legendary-creatures'
5. Keep the same game mechanics but change all the content

Show me what to replace in the history-facts.js file.
```

#### Make Word Wizard About Science:
```
I want to modify Word Wizard to focus on science vocabulary. Please:

1. Replace the word lists with science terms
2. Keep the same difficulty levels (easy, medium, hard, expert)
3. Easy: basic science words (atom, cell, etc.)
4. Medium: biology terms
5. Hard: chemistry terms  
6. Expert: advanced scientific concepts

Show me the new word-list.js content.
```

### **🆕 CREATING COMPLETELY NEW GAMES**

#### Animal Quiz Game:
```
I want to create a brand new game about animals using the game template. Please:

1. Copy the template and rename it to "animal-explorer"
2. Set theme to animals with appropriate emoji and colors
3. Create categories: 'mammals', 'birds', 'reptiles', 'ocean-animals'
4. Add 6 questions per category about different animals
5. Include fun facts that kids would find interesting
6. Make sure all zany answers are animal-related and funny

Show me all the files I need to create and their complete contents.
```

#### Math Challenge Game:
```
I want to make a math quiz game for kids using the template. Please:

1. Theme: "Math Wizard" with numbers and math emojis
2. Colors: purple and gold for a magical feel
3. Categories: 'addition', 'subtraction', 'multiplication', 'fun-math-facts'
4. Questions should be appropriate for elementary school kids
5. Include word problems and fun math trivia
6. Zany answers should be silly math-related jokes

Please create the complete game files for me.
```

### **🎨 VISUAL CUSTOMIZATION**

#### Change Colors:
```
I want to change the colors of my [GAME-NAME] game. Please:

1. Change the primary color to [COLOR]  
2. Change the accent color to [COLOR]
3. Show me exactly what to change in the GAME_CONFIG section

Available colors: indigo, green, blue, purple, red, yellow, pink, gray
```

#### Update Game Title and Emoji:
```
I want to change my game's title from "[OLD-TITLE]" to "[NEW-TITLE]" and update the emoji to [EMOJI]. 

Please show me exactly what to change in the GAME_CONFIG section.
```

### **📊 ADVANCED MODIFICATIONS**

#### Adjust Difficulty:
```
I want to make my game [easier/harder]. Please:

1. [For easier]: Lower the points per question and add more hints
2. [For harder]: Increase points and make questions more challenging  
3. Show me what to change in the GAME_CONFIG section
4. Suggest how to modify the questions to match the new difficulty
```

#### Add New Category:
```
I want to add a new category called "[CATEGORY-NAME]" to my [GAME-NAME] game. Please:

1. Add the category to the data structure
2. Create 5 questions about [TOPIC]
3. Make sure the questions follow the same format as existing ones
4. Include zany answers that fit the theme

Show me exactly what to add to the data file.
```

---

## 🎯 **Tips for Using These Prompts:**

1. **Replace bracketed text** like [GAME-NAME] with your actual game name
2. **Copy error messages exactly** from the browser error screen
3. **Be specific about topics** - the more details you give, the better the results
4. **Test changes incrementally** - make one change at a time and check it works
5. **Always include the request for "exact code"** so you know exactly what to copy-paste

## 📁 **Files to Drag into Claude:**

When using these prompts, drag these files into Claude for context:
- The game folder you're modifying (e.g., `/history-ninja/`)  
- `CLAUDE.md` (project overview)
- `/shared/helpers/validation.js` (for error understanding)
- This `example-prompts.md` file (for reference)

## 🚨 **Troubleshooting Prompts:**

If something goes wrong:
```
My game isn't working after I made changes. I'm seeing [ERROR MESSAGE] in the browser. Can you help me fix this? 

Here's what I changed:
[Paste the code you modified]

Please show me the corrected version.
```
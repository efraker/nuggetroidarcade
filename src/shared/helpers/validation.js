// Kid-friendly validation helpers for game development
// These functions check if game data is set up correctly and show helpful error messages

export const validateGameData = {
  
  // Check if quiz questions are properly formatted
  validateQuizData(data, gameName) {
    const errors = [];
    
    if (!data || typeof data !== 'object') {
      errors.push(`❌ Oops! No data found for ${gameName}. Make sure you have a data file with questions!`);
      return { isValid: false, errors };
    }

    // Check each category
    Object.keys(data).forEach(category => {
      const questions = data[category];
      
      if (!Array.isArray(questions)) {
        errors.push(`❌ Category "${category}" should be a list of questions. Make sure it looks like: [question1, question2, ...]`);
        return;
      }
      
      if (questions.length === 0) {
        errors.push(`❌ Category "${category}" is empty! Add some questions to make your game work.`);
        return;
      }

      // Check each question
      questions.forEach((question, index) => {
        if (!question.fact || typeof question.fact !== 'string') {
          errors.push(`❌ Question ${index + 1} in "${category}" is missing the question text. Add a "fact" property!`);
        }
        
        if (!question.answers || !Array.isArray(question.answers)) {
          errors.push(`❌ Question ${index + 1} in "${category}" needs an "answers" list with multiple choice options.`);
        } else {
          if (question.answers.length < 2) {
            errors.push(`❌ Question ${index + 1} in "${category}" needs at least 2 answer choices.`);
          }
          
          const correctAnswers = question.answers.filter(answer => answer.isCorrect);
          if (correctAnswers.length === 0) {
            errors.push(`❌ Question ${index + 1} in "${category}" needs at least one correct answer! Mark one with "isCorrect: true"`);
          }
          if (correctAnswers.length > 1) {
            errors.push(`❌ Question ${index + 1} in "${category}" has multiple correct answers. Only one should be "isCorrect: true"`);
          }
        }
      });
    });

    return {
      isValid: errors.length === 0,
      errors,
      message: errors.length === 0 
        ? `✅ Great! ${gameName} data looks perfect!` 
        : `Found ${errors.length} issues that need fixing:`
    };
  },

  // Check if word lists are properly formatted
  validateWordData(wordLists, gameName) {
    const errors = [];
    
    if (!wordLists || typeof wordLists !== 'object') {
      errors.push(`❌ Oops! No word lists found for ${gameName}. Make sure you have a word-list.js file!`);
      return { isValid: false, errors };
    }

    const requiredLevels = ['easy', 'medium', 'hard', 'expert'];
    
    requiredLevels.forEach(level => {
      if (!wordLists[level]) {
        errors.push(`❌ Missing "${level}" word list! Add a list of ${level} words to your data.`);
      } else if (!Array.isArray(wordLists[level])) {
        errors.push(`❌ The "${level}" word list should be an array like: ['word1', 'word2', 'word3']`);
      } else if (wordLists[level].length === 0) {
        errors.push(`❌ The "${level}" word list is empty! Add some words to make the game work.`);
      } else if (wordLists[level].length < 5) {
        errors.push(`❌ The "${level}" word list only has ${wordLists[level].length} words. Add at least 5 words for a good game!`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
      message: errors.length === 0 
        ? `✅ Great! ${gameName} word lists look perfect!` 
        : `Found ${errors.length} issues that need fixing:`
    };
  },

  // Show validation results in a kid-friendly way
  showValidationResults(validation, gameName) {
    if (validation.isValid) {
      console.log(`🎮 ${gameName}: ${validation.message}`);
      return true;
    } else {
      console.group(`🚨 ${gameName} Setup Problems`);
      console.log(validation.message);
      validation.errors.forEach(error => console.log(error));
      console.log(`\n💡 Tip: Fix these issues and refresh the page to try again!`);
      console.groupEnd();
      return false;
    }
  }
};

// Helper to safely get data with fallbacks
export const safeDataAccess = {
  
  // Get quiz questions with validation and fallback
  getQuizQuestions(data, category, gameName) {
    try {
      if (!data || !data[category]) {
        console.warn(`❌ Category "${category}" not found in ${gameName}. Available categories:`, Object.keys(data || {}));
        return [];
      }
      
      const questions = data[category];
      if (!Array.isArray(questions) || questions.length === 0) {
        console.warn(`❌ No questions found for category "${category}" in ${gameName}.`);
        return [];
      }
      
      return questions;
    } catch (error) {
      console.error(`❌ Error loading questions for ${gameName}:`, error.message);
      return [];
    }
  },

  // Get word list with validation and fallback
  getWordList(wordLists, difficulty, gameName) {
    try {
      if (!wordLists || !wordLists[difficulty]) {
        console.warn(`❌ Difficulty "${difficulty}" not found in ${gameName}. Available difficulties:`, Object.keys(wordLists || {}));
        return ['cat', 'dog', 'sun']; // Emergency fallback
      }
      
      const words = wordLists[difficulty];
      if (!Array.isArray(words) || words.length === 0) {
        console.warn(`❌ No words found for difficulty "${difficulty}" in ${gameName}.`);
        return ['cat', 'dog', 'sun']; // Emergency fallback
      }
      
      return words;
    } catch (error) {
      console.error(`❌ Error loading words for ${gameName}:`, error.message);
      return ['cat', 'dog', 'sun']; // Emergency fallback
    }
  }
};
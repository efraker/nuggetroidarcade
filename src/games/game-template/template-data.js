// SEMANTIC CUE: Template game data structure for Claude.ai to understand and expand
// This file demonstrates the exact structure needed for quiz games in the Nuggetroid Arcade

export const templateData = {
  // SEMANTIC CUE: Each key represents a category - Claude can easily add new categories here
  // Categories should use kebab-case naming (lowercase with hyphens) for URL compatibility
  
  'general-knowledge': [
    // SEMANTIC CUE: Each question follows this exact structure
    {
      fact: "What is the largest planet in our solar system?", // The question text
      answers: [
        { text: "Jupiter", isCorrect: true }, // Mark exactly one answer as correct
        { text: "Saturn", isCorrect: false },
        { text: "Earth", isCorrect: false },
        { text: "A really big space marble", isCorrect: false, isZany: true } // Zany answers are fun and trigger special effects
      ]
    },
    {
      fact: "Which animal is known as the 'King of the Jungle'?",
      answers: [
        { text: "Lion", isCorrect: true },
        { text: "Tiger", isCorrect: false },
        { text: "Elephant", isCorrect: false },
        { text: "My cat when he steals my spot on the couch", isCorrect: false, isZany: true }
      ]
    },
    {
      fact: "What do you call a group of stars that form a pattern?",
      answers: [
        { text: "Constellation", isCorrect: true },
        { text: "Galaxy", isCorrect: false },
        { text: "Solar system", isCorrect: false },
        { text: "Space connect-the-dots game", isCorrect: false, isZany: true }
      ]
    },
    {
      fact: "Which is the fastest land animal?",
      answers: [
        { text: "Cheetah", isCorrect: true },
        { text: "Lion", isCorrect: false },
        { text: "Horse", isCorrect: false },
        { text: "Me when the ice cream truck comes around", isCorrect: false, isZany: true }
      ]
    },
    {
      fact: "What is the smallest unit of matter?",
      answers: [
        { text: "Atom", isCorrect: true },
        { text: "Molecule", isCorrect: false },
        { text: "Cell", isCorrect: false },
        { text: "The amount of patience I have on Monday mornings", isCorrect: false, isZany: true }
      ]
    }
  ],

  'science-fun': [
    {
      fact: "What gas do plants breathe in to make oxygen?",
      answers: [
        { text: "Carbon dioxide", isCorrect: true },
        { text: "Nitrogen", isCorrect: false },
        { text: "Helium", isCorrect: false },
        { text: "The same air I breathe when I'm nervous", isCorrect: false, isZany: true }
      ]
    },
    {
      fact: "How many bones are in the adult human body?",
      answers: [
        { text: "206", isCorrect: true },
        { text: "195", isCorrect: false },
        { text: "220", isCorrect: false },
        { text: "Too many to count without getting distracted", isCorrect: false, isZany: true }
      ]
    },
    {
      fact: "What is the chemical symbol for gold?",
      answers: [
        { text: "Au", isCorrect: true },
        { text: "Go", isCorrect: false },
        { text: "Gd", isCorrect: false },
        { text: "💰", isCorrect: false, isZany: true }
      ]
    },
    {
      fact: "Which planet is closest to the Sun?",
      answers: [
        { text: "Mercury", isCorrect: true },
        { text: "Venus", isCorrect: false },
        { text: "Earth", isCorrect: false },
        { text: "Whichever one is having the worst day", isCorrect: false, isZany: true }
      ]
    }
  ],

  'fun-facts': [
    {
      fact: "What is the only mammal capable of true flight?",
      answers: [
        { text: "Bat", isCorrect: true },
        { text: "Flying squirrel", isCorrect: false },
        { text: "Sugar glider", isCorrect: false },
        { text: "Me in my dreams", isCorrect: false, isZany: true }
      ]
    },
    {
      fact: "Which country invented pizza?",
      answers: [
        { text: "Italy", isCorrect: true },
        { text: "Greece", isCorrect: false },
        { text: "France", isCorrect: false },
        { text: "Heaven", isCorrect: false, isZany: true }
      ]
    },
    {
      fact: "What is a baby kangaroo called?",
      answers: [
        { text: "Joey", isCorrect: true },
        { text: "Cub", isCorrect: false },
        { text: "Pup", isCorrect: false },
        { text: "Pocket rocket", isCorrect: false, isZany: true }
      ]
    }
  ]
};

// SEMANTIC CUE: Data validation helper for Claude to understand structure requirements
// Claude can reference this to ensure new data follows the correct format
export const TEMPLATE_DATA_REQUIREMENTS = {
  structure: "Each category should be an object key with an array of question objects",
  questionFormat: {
    fact: "string - The question text",
    answers: "array of 2-4 answer objects"
  },
  answerFormat: {
    text: "string - The answer text", 
    isCorrect: "boolean - exactly one answer should be true",
    isZany: "boolean (optional) - marks fun/silly answers for special effects"
  },
  categoryNaming: "Use kebab-case (lowercase-with-hyphens) for category names",
  minimumQuestions: "At least 3 questions per category for a good game experience",
  bestPractices: [
    "Include 1 zany answer per question for humor and engagement",
    "Make sure questions are appropriate for all ages", 
    "Vary difficulty levels within categories",
    "Keep questions concise and clear"
  ]
};
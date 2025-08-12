// SEMANTIC CUE: Animal Explorer game data - demonstrates template customization
// This shows how Claude can transform the template for any topic

export const animalData = {
  'mammals': [
    {
      fact: "What is the largest land animal?",
      answers: [
        { text: "African Elephant", isCorrect: true },
        { text: "Blue Whale", isCorrect: false },
        { text: "Giraffe", isCorrect: false },
        { text: "My neighbor's really fluffy cat", isCorrect: false, isZany: true }
      ]
    },
    {
      fact: "Which mammal can fly?",
      answers: [
        { text: "Bat", isCorrect: true },
        { text: "Flying squirrel", isCorrect: false },
        { text: "Sugar glider", isCorrect: false },
        { text: "Me when I jump on trampolines", isCorrect: false, isZany: true }
      ]
    },
    {
      fact: "What do you call a baby kangaroo?",
      answers: [
        { text: "Joey", isCorrect: true },
        { text: "Pup", isCorrect: false },
        { text: "Calf", isCorrect: false },
        { text: "Pocket rocket", isCorrect: false, isZany: true }
      ]
    },
    {
      fact: "Which mammal has no teeth?",
      answers: [
        { text: "Anteater", isCorrect: true },
        { text: "Beaver", isCorrect: false },
        { text: "Elephant", isCorrect: false },
        { text: "My grandpa when he forgets his dentures", isCorrect: false, isZany: true }
      ]
    }
  ],

  'ocean-animals': [
    {
      fact: "What is the largest animal on Earth?",
      answers: [
        { text: "Blue Whale", isCorrect: true },
        { text: "Great White Shark", isCorrect: false },
        { text: "Giant Squid", isCorrect: false },
        { text: "The monster under my bed", isCorrect: false, isZany: true }
      ]
    },
    {
      fact: "How many hearts does an octopus have?",
      answers: [
        { text: "3", isCorrect: true },
        { text: "1", isCorrect: false },
        { text: "2", isCorrect: false },
        { text: "More than I have after watching sad movies", isCorrect: false, isZany: true }
      ]
    },
    {
      fact: "What do dolphins use to navigate?",
      answers: [
        { text: "Echolocation", isCorrect: true },
        { text: "Their eyes", isCorrect: false },
        { text: "Magnetic fields", isCorrect: false },
        { text: "GPS like my dad in the car", isCorrect: false, isZany: true }
      ]
    },
    {
      fact: "Which sea creature can change colors?",
      answers: [
        { text: "Octopus", isCorrect: true },
        { text: "Jellyfish", isCorrect: false },
        { text: "Seahorse", isCorrect: false },
        { text: "My mood ring fish", isCorrect: false, isZany: true }
      ]
    }
  ],

  'birds': [
    {
      fact: "Which bird cannot fly?",
      answers: [
        { text: "Penguin", isCorrect: true },
        { text: "Eagle", isCorrect: false },
        { text: "Sparrow", isCorrect: false },
        { text: "Angry Birds (they just get launched)", isCorrect: false, isZany: true }
      ]
    },
    {
      fact: "What is the fastest bird?",
      answers: [
        { text: "Peregrine Falcon", isCorrect: true },
        { text: "Eagle", isCorrect: false },
        { text: "Hummingbird", isCorrect: false },
        { text: "Road Runner (beep beep!)", isCorrect: false, isZany: true }
      ]
    },
    {
      fact: "Which bird is known for its colorful tail?",
      answers: [
        { text: "Peacock", isCorrect: true },
        { text: "Robin", isCorrect: false },
        { text: "Crow", isCorrect: false },
        { text: "My pet parrot when he sits in paint", isCorrect: false, isZany: true }
      ]
    },
    {
      fact: "What do you call a group of owls?",
      answers: [
        { text: "Parliament", isCorrect: true },
        { text: "Flock", isCorrect: false },
        { text: "Herd", isCorrect: false },
        { text: "A very serious meeting", isCorrect: false, isZany: true }
      ]
    }
  ]
};
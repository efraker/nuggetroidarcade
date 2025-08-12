import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { animalData } from './animal-data';
// SEMANTIC CUE: Using shared systems available to all games - this is the foundation for all arcade games
import { useGameEffects } from '../../shared/hooks/useGameEffects';
import { useStreakSystem } from '../../shared/hooks/useStreakSystem';
import { useAchievementSystem } from '../../shared/hooks/useAchievementSystem';
import { EffectContainer } from '../../shared/components/effects/EffectContainer';
import { AnimatedScore } from '../../shared/components/effects/AnimatedScore';
import { StreakDisplay } from '../../shared/components/ui/StreakDisplay';
import { ANIMATIONS, EFFECT_COMBOS, getCountryCompletionEffects, COUNTRY_EMOJI_THEMES } from '../../shared/config/animations';
// Kid-friendly validation helpers
import { validateGameData, safeDataAccess } from '../../shared/helpers/validation';

// SEMANTIC CUE: Helper function to shuffle arrays - used for randomizing questions and answers
const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

// TEMPLATE CUSTOMIZATION ZONE START
// =================================
// SEMANTIC CUE: This section contains all the customizable elements for your game
const GAME_CONFIG = {
  // Change these to customize your game's appearance and behavior
  title: "Animal Explorer", // TODO: Replace with your game's title
  emoji: "🦁", // TODO: Choose an emoji for your game
  theme: "animals", // TODO: Choose theme: adventure, space, ancient, pirate, etc.
  
  // Scoring settings - adjust these to make your game easier or harder
  pointsPerCorrect: 100,
  
  // Visual settings
  primaryColor: "green", // Options: indigo, green, blue, purple, red, yellow
  accentColor: "yellow"
};

// SEMANTIC CUE: These are the available categories in your game data
// Claude can easily add new categories by expanding animalData
const AVAILABLE_CATEGORIES = Object.keys(animalData || {});
// TEMPLATE CUSTOMIZATION ZONE END
// =================================

export default function AnimalExplorer() {
  // SEMANTIC CUE: Data validation - ensures the game won't break with invalid data
  const [dataValidation] = useState(() => {
    return validateGameData.validateQuizData(animalData, GAME_CONFIG.title);
  });
  const [hasDataError, setHasDataError] = useState(false);
  
  // SEMANTIC CUE: Core game state - these track the current state of the game
  const [selectedCategory, setSelectedCategory] = useState(AVAILABLE_CATEGORIES[0] || 'general');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'finished'
  
  // SEMANTIC CUE: Integrated progression systems - these provide the visual effects and engagement
  const { effects, triggerEffect, triggerEffectCombo } = useGameEffects(true, 0.6);
  
  // SEMANTIC CUE: Streak system tracks consecutive correct answers and provides bonus scoring
  const { currentStreak, maxStreak, handleCorrectAnswer: handleStreak, handleIncorrectAnswer: breakStreak, getStreakDisplay, resetStreak } = useStreakSystem((streakLevel, milestone) => {
    // Trigger special effects for streak milestones - milestone.effect contains the correct animation combo name
    triggerEffectCombo(milestone.effect);
  });
  
  // SEMANTIC CUE: Achievement system for unlocking special celebrations and themes
  const { checkMultipleAchievements, getUnlockedThemes } = useAchievementSystem((achievement) => {
    // Trigger celebration when achievement is unlocked
    triggerEffectCombo('achievementUnlock');
    console.log(`Achievement unlocked: ${achievement.name} ${achievement.icon}`);
  });
  
  // SEMANTIC CUE: Persistent high score storage - saves player progress locally
  const [highScore, setHighScore] = useState(() => {
    const savedHighScore = localStorage.getItem(`${GAME_CONFIG.title.replace(/\s+/g, '')}_highScore_${selectedCategory}`);
    return savedHighScore ? parseInt(savedHighScore, 10) : 0;
  });

  // SEMANTIC CUE: Update high score when category changes
  useEffect(() => {
    const savedHighScore = localStorage.getItem(`${GAME_CONFIG.title.replace(/\s+/g, '')}_highScore_${selectedCategory}`);
    setHighScore(savedHighScore ? parseInt(savedHighScore, 10) : 0);
  }, [selectedCategory]);

  // SEMANTIC CUE: Show validation results when component loads
  useEffect(() => {
    if (!validateGameData.showValidationResults(dataValidation, GAME_CONFIG.title)) {
      setHasDataError(true);
    }
  }, [dataValidation]);

  // SEMANTIC CUE: Game initialization function - sets up a new game session
  const startGame = () => {
    // Safety check: make sure we have questions for this category
    const categoryQuestions = safeDataAccess.getQuizQuestions(animalData, selectedCategory, GAME_CONFIG.title);
    
    if (categoryQuestions.length === 0) {
      alert(`❌ Sorry! No questions found for "${selectedCategory}". Please check your data file!`);
      return;
    }
    
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    // SEMANTIC CUE: Reset streak when starting new game
    resetStreak();
    
    const gameQuestions = shuffleArray(categoryQuestions);
    setQuestions(gameQuestions);
    setGameState('playing');
  };

  // SEMANTIC CUE: Shuffle answers when question changes to prevent pattern memorization
  useEffect(() => {
    if (gameState === 'playing' && questions.length > 0) {
      const currentQ = questions[currentQuestionIndex];
      if (currentQ && currentQ.answers && Array.isArray(currentQ.answers)) {
        setShuffledAnswers(shuffleArray(currentQ.answers));
      } else {
        console.error(`❌ Question ${currentQuestionIndex + 1} has invalid answers!`);
        setShuffledAnswers([]);
      }
    }
  }, [currentQuestionIndex, questions, gameState]);

  // SEMANTIC CUE: Answer selection handler - processes player's answer choice
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    
    // SEMANTIC CUE: Integrated answer handling with streaks, combos, and achievements
    if (answer.isCorrect) {
      // Handle streak and scoring
      const streakResult = handleStreak(GAME_CONFIG.pointsPerCorrect);
      setScore(score + streakResult.totalScore);
      
      // Trigger appropriate effects based on streak level
      if (streakResult.milestone) {
        // Streak milestone reached - effects already triggered by useStreakSystem callback
        console.log(`🔥 ${streakResult.milestone.name}! ${streakResult.streak}x streak!`);
      } else {
        // Regular correct answer
        triggerEffectCombo('correctAnswer');
      }
      
      // Check for achievements
      const gameStats = {
        totalCorrect: Math.floor(score / GAME_CONFIG.pointsPerCorrect) + 1,
        maxStreak,
        currentStreak: streakResult.streak,
        categoriesCompleted: 1,
        gameTitle: GAME_CONFIG.title
      };
      checkMultipleAchievements(gameStats);
      
    } else {
      // Break streak on wrong answer
      breakStreak();
      
      if (answer.isZany) {
        triggerEffectCombo('zanyAnswer');
      } else {
        triggerEffectCombo('incorrectAnswer');
      }
    }
  };

  // SEMANTIC CUE: Question progression handler - moves to next question or ends game
  const nextQuestion = () => {
    // SEMANTIC CUE: Trigger transition effect
    triggerEffect('transition', ANIMATIONS.effects.transition.duration);
    
    setTimeout(() => {
      setSelectedAnswer(null);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Game finished, check for new high score
        const isNewHighScore = score > highScore;
        if (isNewHighScore) {
          setHighScore(score);
          localStorage.setItem(`${GAME_CONFIG.title.replace(/\s+/g, '')}_highScore_${selectedCategory}`, score);
          // SEMANTIC CUE: Epic celebration for new high score
          triggerEffectCombo('newHighScore'); // Howl + hiya + explosion!
        } else {
          // SEMANTIC CUE: Category-specific completion with emoji rain and victory sounds
          const categoryComboName = `${selectedCategory}Complete`;
          if (EFFECT_COMBOS[categoryComboName]) {
            triggerEffectCombo(categoryComboName); // Category emoji rain + completion sounds!
          } else {
            triggerEffectCombo('gameComplete'); // Default completion celebration!
          }
        }
        setGameState('finished');
      }
    }, ANIMATIONS.effects.transition.duration);
  };

  // SEMANTIC CUE: Button styling helper - provides visual feedback based on answer correctness
  const getButtonClass = (answer) => {
    const baseColors = {
      indigo: 'bg-indigo-600 hover:bg-indigo-500',
      green: 'bg-green-600 hover:bg-green-500',
      blue: 'bg-blue-600 hover:bg-blue-500',
      purple: 'bg-purple-600 hover:bg-purple-500',
      red: 'bg-red-600 hover:bg-red-500',
      yellow: 'bg-yellow-600 hover:bg-yellow-500'
    };
    
    if (!selectedAnswer) return `${baseColors[GAME_CONFIG.primaryColor]} text-white`;
    if (answer.isCorrect) return 'bg-green-500 text-white';
    if (selectedAnswer === answer && !answer.isCorrect) return 'bg-red-500 text-white';
    return 'bg-gray-600 opacity-50 text-white';
  };

  const currentQuestion = questions[currentQuestionIndex];
  
  // SEMANTIC CUE: Error screen for invalid data - shows when game data has problems
  if (hasDataError) {
    return (
      <div className="max-w-4xl mx-auto p-4" style={{ fontFamily: "'Press Start 2P', cursive" }}>
        <Link to="/" className="text-indigo-400 hover:text-indigo-200 mb-4 inline-block text-sm">
          &larr; Back to Arcade
        </Link>
        <div className="p-8 rounded-lg bg-red-900/20 border-2 border-red-500 text-white text-center">
          <h1 className="text-2xl mb-4">🚨 Game Setup Error</h1>
          <div className="text-left bg-gray-900 p-4 rounded mb-4">
            <p className="mb-2">{dataValidation.message}</p>
            {dataValidation.errors.map((error, index) => (
              <p key={index} className="text-sm text-red-300 mb-1">{error}</p>
            ))}
          </div>
          <p className="text-sm text-gray-300 mb-4">
            💡 Fix the issues above in your animal-data.js file and refresh the page!
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-sm"
          >
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  // SEMANTIC CUE: Main game UI - this is the primary interface players interact with
  return (
    <div className="max-w-4xl mx-auto p-4" style={{ fontFamily: "'Press Start 2P', cursive" }}>
      <Link to="/" className="text-indigo-400 hover:text-indigo-200 mb-4 inline-block text-sm">
        &larr; Back to Arcade
      </Link>

      <div className={`p-4 rounded-lg bg-gray-900 text-white shadow-2xl border-2 border-${GAME_CONFIG.primaryColor}-500/50`}>
        <div className="mb-4 text-center">
          <h1 className={`text-3xl font-bold text-${GAME_CONFIG.primaryColor}-400 mb-2`}>
            {GAME_CONFIG.title} {GAME_CONFIG.emoji}
          </h1>
        </div>

        {/* SEMANTIC CUE: Game start screen - category selection and game initialization */}
        {gameState === 'start' && (
          <div className="text-center">
            <h2 className="text-xl text-white mb-4">Choose Your Category:</h2>
            <div className="flex justify-center gap-4 mb-6 flex-wrap">
              {AVAILABLE_CATEGORIES.map(category => {
                const questionCount = animalData[category]?.length || 0;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    disabled={questionCount === 0}
                    className={`px-4 py-2 text-sm rounded-lg font-bold transition capitalize ${
                      selectedCategory === category ? `bg-${GAME_CONFIG.primaryColor}-500 text-white` : 
                      questionCount === 0 ? 'bg-gray-800 text-gray-500 cursor-not-allowed' :
                      'bg-gray-700 hover:bg-gray-600 text-white'
                    }`}
                    title={questionCount === 0 ? `❌ No questions available` : `${questionCount} questions available`}
                  >
                    {category.replace('-', ' ')}
                    {questionCount === 0 && ' ⚠️'}
                  </button>
                );
              })}
            </div>
            <p className="text-gray-400 mb-4 text-sm">High Score: {highScore}</p>
            <button onClick={startGame} className={`bg-${GAME_CONFIG.accentColor}-600 hover:bg-${GAME_CONFIG.accentColor}-500 text-white px-8 py-3 rounded-lg font-bold text-lg transition`}>
              Start Game
            </button>
          </div>
        )}

        {/* SEMANTIC CUE: Active gameplay screen - question display and answer selection */}
        {gameState === 'playing' && currentQuestion && (
          <div>
            <div className={`flex justify-between items-center text-${GAME_CONFIG.primaryColor}-400 mb-4 text-sm`}>
              {/* SEMANTIC CUE: Score and streak display */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <AnimatedScore 
                    score={score} 
                    isAnimating={effects.scoreGlow}
                    animationType="glow"
                  />
                </div>
                <StreakDisplay 
                  streakInfo={getStreakDisplay()} 
                  isAnimating={effects.lightning || effects.sparks}
                />
              </div>
              <span>Question: {currentQuestionIndex + 1} / {questions.length}</span>
            </div>
            
            {/* SEMANTIC CUE: Question container with visual effects support */}
            <EffectContainer 
              effects={effects} 
              emojiTheme={COUNTRY_EMOJI_THEMES[selectedCategory] || COUNTRY_EMOJI_THEMES.default}
              className="bg-gray-800 p-6 rounded-lg shadow-inner mb-6 text-center min-h-[100px]"
            >
              <p className="text-lg text-white">{currentQuestion.fact}</p>
            </EffectContainer>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {shuffledAnswers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(answer)}
                  disabled={!!selectedAnswer}
                  className={`p-4 rounded-lg font-bold text-sm text-left transition-transform transform hover:scale-105 ${getButtonClass(answer)}`}
                >
                  {answer.text}
                </button>
              ))}
            </div>
            
            {selectedAnswer && (
              <div className="mt-6 text-center">
                <div className={`font-bold text-lg ${selectedAnswer.isCorrect ? `text-${GAME_CONFIG.accentColor}-400` : 'text-red-400'}`}>
                  {selectedAnswer.isCorrect && "Correct! Great job!"}
                  {!selectedAnswer.isCorrect && selectedAnswer.isZany && "Zany answer! That's creative thinking..."}
                  {!selectedAnswer.isCorrect && !selectedAnswer.isZany && "Not quite right. Keep trying!"}
                </div>
                <button onClick={nextQuestion} className={`bg-${GAME_CONFIG.primaryColor}-600 hover:bg-${GAME_CONFIG.primaryColor}-500 text-white px-8 py-2 mt-4 rounded-lg font-bold text-lg transition`}>
                  Next
                </button>
              </div>
            )}
          </div>
        )}

        {/* SEMANTIC CUE: Game completion screen - final score and play again option */}
        {gameState === 'finished' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Game Complete!</h2>
            <p className={`text-xl text-${GAME_CONFIG.primaryColor}-400 mb-2`}>Final Score: {score}</p>
            <p className="text-gray-400 mb-6 text-sm">High Score for this category: {highScore}</p>
            <button onClick={() => setGameState('start')} className={`bg-${GAME_CONFIG.accentColor}-600 hover:bg-${GAME_CONFIG.accentColor}-500 text-white px-8 py-3 rounded-lg font-bold text-lg transition`}>
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
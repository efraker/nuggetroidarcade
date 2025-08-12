// Simple wrapper that hides complex progression systems for basic games
// Kids can use this for simple games without worrying about streaks, achievements, etc.

import React from 'react';
import { useGameEffects } from '../hooks/useGameEffects';
import { EffectContainer } from './effects/EffectContainer';

export function SimpleGameWrapper({ 
  children, 
  emojiTheme = 'american',
  showEffects = true 
}) {
  const { effects, triggerEffect } = useGameEffects(true, 0.6);

  // Simple effects that kids can easily use
  const gameEffects = {
    celebrate() {
      triggerEffect('confetti', 2000);
      triggerEffect('emojiRain', 3000);
    },
    
    correctAnswer() {
      triggerEffect('shuriken', 1000);
      triggerEffect('scoreGlow', 800);
    },
    
    wrongAnswer() {
      triggerEffect('smoke', 1500);
    },
    
    gameComplete() {
      triggerEffect('confetti', 3000);
      triggerEffect('emojiRain', 4000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {showEffects ? (
        <EffectContainer effects={effects} emojiTheme={emojiTheme}>
          {/* Pass the simple effects to children */}
          {typeof children === 'function' ? children(gameEffects) : children}
        </EffectContainer>
      ) : (
        <div>
          {typeof children === 'function' ? children(gameEffects) : children}
        </div>
      )}
    </div>
  );
}

// Simple quiz game structure that kids can copy
export function SimpleQuiz({ 
  title,
  data,
  categories = [],
  emojiTheme = 'american' 
}) {
  const [selectedCategory, setSelectedCategory] = React.useState(categories[0] || '');
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [gameState, setGameState] = React.useState('start'); // 'start', 'playing', 'finished'
  
  const questions = data[selectedCategory] || [];

  return (
    <SimpleGameWrapper emojiTheme={emojiTheme}>
      {(effects) => (
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="text-xl">Score: {score}</p>
          </div>

          {gameState === 'start' && (
            <div className="text-center">
              <h2 className="text-2xl mb-4">Choose a Category:</h2>
              <div className="space-y-4">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setGameState('playing');
                      setCurrentQuestion(0);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-xl capitalize"
                  >
                    {category.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
          )}

          {gameState === 'playing' && questions[currentQuestion] && (
            <div className="text-center">
              <h2 className="text-2xl mb-8">{questions[currentQuestion].fact}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions[currentQuestion].answers.map((answer, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (answer.isCorrect) {
                        setScore(prev => prev + 100);
                        effects.correctAnswer();
                      } else {
                        effects.wrongAnswer();
                      }
                      
                      setTimeout(() => {
                        if (currentQuestion + 1 < questions.length) {
                          setCurrentQuestion(prev => prev + 1);
                        } else {
                          setGameState('finished');
                          effects.gameComplete();
                        }
                      }, 1500);
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 p-4 rounded-lg text-lg"
                  >
                    {answer.text}
                  </button>
                ))}
              </div>
              
              <p className="mt-4 text-gray-400">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
          )}

          {gameState === 'finished' && (
            <div className="text-center">
              <h2 className="text-4xl mb-4">🎉 Game Complete!</h2>
              <p className="text-2xl mb-8">Final Score: {score}</p>
              <button
                onClick={() => {
                  setGameState('start');
                  setScore(0);
                  setCurrentQuestion(0);
                }}
                className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg text-xl"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      )}
    </SimpleGameWrapper>
  );
}
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { historyFacts } from './history-facts'; // Import the facts

// Helper function to shuffle an array
const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

export default function HistoryNinja() {
  const [selectedCountry, setSelectedCountry] = useState('american');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'finished'
  
  // Load and save high score from localStorage
  const [highScore, setHighScore] = useState(() => {
    const savedHighScore = localStorage.getItem(`historyNinjaHighScore_${selectedCountry}`);
    return savedHighScore ? parseInt(savedHighScore, 10) : 0;
  });

  useEffect(() => {
    const savedHighScore = localStorage.getItem(`historyNinjaHighScore_${selectedCountry}`);
    setHighScore(savedHighScore ? parseInt(savedHighScore, 10) : 0);
  }, [selectedCountry]);

  const startGame = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    const gameQuestions = shuffleArray(historyFacts[selectedCountry]);
    setQuestions(gameQuestions);
    setGameState('playing');
  };

  useEffect(() => {
    if (gameState === 'playing' && questions.length > 0) {
      setShuffledAnswers(shuffleArray(questions[currentQuestionIndex].answers));
    }
  }, [currentQuestionIndex, questions, gameState]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    if (answer.isCorrect) {
      setScore(score + 100);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Game finished, check for new high score
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem(`historyNinjaHighScore_${selectedCountry}`, score);
      }
      setGameState('finished');
    }
  };

  const getButtonClass = (answer) => {
    if (!selectedAnswer) return 'bg-gray-600 hover:bg-indigo-500';
    if (answer.isCorrect) return 'bg-green-500';
    if (selectedAnswer === answer && !answer.isCorrect) return 'bg-red-500';
    return 'bg-gray-600 opacity-50';
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-4xl mx-auto p-4" style={{ fontFamily: "'Press Start 2P', cursive" }}>
      <Link to="/" className="text-indigo-400 hover:text-indigo-200 mb-4 inline-block text-sm">
        &larr; Back to Arcade
      </Link>

      <div className="p-4 rounded-lg bg-gray-900 text-white shadow-2xl border-2 border-indigo-500/50">
        <div className="mb-4 text-center">
          <h1 className="text-3xl font-bold text-indigo-400 mb-2">History Ninja 🥷</h1>
        </div>

        {gameState === 'start' && (
          <div className="text-center">
            <h2 className="text-xl text-white mb-4">Select Your Path:</h2>
            <div className="flex justify-center gap-4 mb-6">
              {Object.keys(historyFacts).map(country => (
                <button
                  key={country}
                  onClick={() => setSelectedCountry(country)}
                  className={`px-4 py-2 text-sm rounded-lg font-bold transition capitalize ${
                    selectedCountry === country ? 'bg-indigo-500 text-white' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  {country}
                </button>
              ))}
            </div>
            <p className="text-gray-400 mb-4 text-sm">High Score: {highScore}</p>
            <button onClick={startGame} className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-lg font-bold text-lg transition">
              Begin Mission
            </button>
          </div>
        )}

        {gameState === 'playing' && currentQuestion && (
          <div>
            <div className="flex justify-between text-indigo-400 mb-4 text-sm">
              <span>Score: {score}</span>
              <span>Question: {currentQuestionIndex + 1} / {questions.length}</span>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-inner mb-6 text-center min-h-[100px]">
              <p className="text-lg text-white">{currentQuestion.fact}</p>
            </div>
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
                <div className={`font-bold text-lg ${selectedAnswer.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                  {selectedAnswer.isCorrect && "Correct! The ninja strikes true."}
                  {!selectedAnswer.isCorrect && selectedAnswer.isZany && "Zany! Your path is mysterious..."}
                  {!selectedAnswer.isCorrect && !selectedAnswer.isZany && "Incorrect. A ninja must train harder."}
                </div>
                <button onClick={nextQuestion} className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-2 mt-4 rounded-lg font-bold text-lg transition">
                  Next
                </button>
              </div>
            )}
          </div>
        )}

        {gameState === 'finished' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Mission Complete!</h2>
            <p className="text-xl text-indigo-400 mb-2">Final Score: {score}</p>
            <p className="text-gray-400 mb-6 text-sm">High Score for this path: {highScore}</p>
            <button onClick={() => setGameState('start')} className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-lg font-bold text-lg transition">
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
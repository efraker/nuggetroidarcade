import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { wordLists } from './word-list';
// SEMANTIC CUE: Integrating shared progression and effects systems
import { useGameEffects } from '../../shared/hooks/useGameEffects';
import { useStreakSystem } from '../../shared/hooks/useStreakSystem';
import { useAchievementSystem } from '../../shared/hooks/useAchievementSystem';
import { EffectContainer } from '../../shared/components/effects/EffectContainer';
import { AnimatedScore } from '../../shared/components/effects/AnimatedScore';
import { StreakDisplay } from '../../shared/components/ui/StreakDisplay';
import { EFFECT_COMBOS } from '../../shared/config/animations';

// --- Text-to-Speech Function ---
// A helper function to make the speech synthesis more reusable and reliable.
const speak = (text, rate = 0.8, pitch = 1.1) => {
  if (!window.speechSynthesis) return; // Guard against unsupported browsers
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;
  utterance.pitch = pitch;
  utterance.volume = 1.0;

  // Try to find a high-quality voice
  // 1. Get all available voices from the browser.
  const allVoices = window.speechSynthesis.getVoices();
  
  // 2. Filter the list to include only US English voices.
  const usEnglishVoices = allVoices.filter(voice => voice.lang === 'en-US');

  // 3. If any US English voices were found...
  if (usEnglishVoices.length > 0) {
    // ...pick one from the filtered list at random!
    const randomVoice = usEnglishVoices[Math.floor(Math.random() * usEnglishVoices.length)];
    utterance.voice = randomVoice;
  }
  // If no 'en-US' voices are found, the browser will use its default voice automatically.

  window.speechSynthesis.speak(utterance);
};


export default function WordWizard() {
  // --- Shared Systems Integration ---
  // SEMANTIC CUE: Audio-visual effects with spelling-themed sounds
  const { effects, triggerEffectCombo } = useGameEffects(true, 0.7);
  
  // SEMANTIC CUE: Streak system with lightning effects for spelling streaks
  const { currentStreak, maxStreak, handleCorrectAnswer: handleStreak, handleIncorrectAnswer: breakStreak, getStreakDisplay, resetStreak } = useStreakSystem((streakLevel, milestone) => {
    // Trigger lightning effects for spelling streaks - milestone.effect contains the correct combo name
    triggerEffectCombo(milestone.effect);
    speak(`${milestone.name}! ${streakLevel} word streak!`, 1.0, 1.2);
  });
  
  // SEMANTIC CUE: Achievement system for spelling accomplishments
  const { checkMultipleAchievements } = useAchievementSystem((achievement) => {
    triggerEffectCombo('achievementUnlock');
    speak(`Achievement unlocked: ${achievement.name}!`, 1.0, 1.3);
  });

  // --- State Management ---
  const [gameState, setGameState] = useState('start');
  const [currentWord, setCurrentWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');
  const [feedback, setFeedback] = useState('');
  const inputRef = useRef(null);

  // --- Persistent State using localStorage ---
  const [coins, setCoins] = useState(() => {
    const savedCoins = localStorage.getItem('wordWizardCoins');
    return savedCoins ? parseInt(savedCoins, 10) : 0;
  });

  const [ownedSkins, setOwnedSkins] = useState(() => {
    const savedSkins = localStorage.getItem('wordWizardSkins');
    return savedSkins ? JSON.parse(savedSkins) : ['noob'];
  });
  
  const [activeSkin, setActiveSkin] = useState(() => {
    const savedActiveSkin = localStorage.getItem('wordWizardActiveSkin');
    return savedActiveSkin || 'noob';
  });

  // --- useEffect hooks to save progress ---
  useEffect(() => {
    localStorage.setItem('wordWizardCoins', coins);
  }, [coins]);

  useEffect(() => {
    localStorage.setItem('wordWizardSkins', JSON.stringify(ownedSkins));
  }, [ownedSkins]);
  
  useEffect(() => {
    localStorage.setItem('wordWizardActiveSkin', activeSkin);
  }, [activeSkin]);

  // Available skins (could also be moved to a separate file)
  const availableSkins = [
    { id: 'noob', name: 'Noob', cost: 0, color: 'text-gray-800' },
    { id: 'rainbow', name: 'Rainbow', cost: 50, gradientClass: 'text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500' },
    { id: 'neon', name: 'Neon', cost: 80, color: 'text-green-500', textShadow: '0 0 5px #00ff00, 0 0 10px #00ff00' },
    { id: 'gold', name: 'Gold', cost: 100, color: 'text-yellow-500', textShadow: '0 0 3px #ffd700' },
  ];

  // --- Game Logic ---
  const startNewRound = () => {
    const words = wordLists[difficulty];
    const newWord = words[Math.floor(Math.random() * words.length)];
    
    setCurrentWord(newWord);
    setUserInput('');
    setGameState('playing');
    setFeedback('');
    
    // SEMANTIC CUE: Question transition effect
    if (gameState !== 'start') {
      triggerEffectCombo('questionTransition');
    }
    
    // Automatically speak the word when the round starts
    setTimeout(() => {
      speak("Please spell");
      setTimeout(() => speak(newWord, 0.7), 700); // Speak the word a bit slower
    }, 200);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // SEMANTIC CUE: Reset streaks when starting new game
  const startGame = () => {
    resetStreak();
    startNewRound();
  };

  const handleWordSound = () => {
    speak(currentWord, 0.7);
  }

  const checkAnswer = () => {
    if (userInput.toLowerCase() === currentWord.toLowerCase()) {
      // SEMANTIC CUE: Integrated scoring with streak system and achievements
      const difficultyMultiplier = { easy: 1, medium: 2, hard: 3, expert: 4 }[difficulty];
      const baseCoins = Math.ceil(currentWord.length * difficultyMultiplier);
      
      // Handle streak and get bonus scoring
      const streakResult = handleStreak(baseCoins);
      const totalCoins = streakResult.totalScore;
      
      setCoins(coins + totalCoins);
      setScore(score + 1);
      setGameState('correct');
      
      // Check for achievements
      const gameStats = {
        totalCorrect: score + 1,
        maxStreak: Math.max(maxStreak, streakResult.streak),
        currentStreak: streakResult.streak,
        wordsSpelled: score + 1,
        difficulty: difficulty
      };
      checkMultipleAchievements(gameStats);
      
      // Trigger appropriate effects
      if (streakResult.milestone) {
        // Streak milestone effects already triggered by useStreakSystem callback
        setFeedback(`${streakResult.milestone.name}! +${totalCoins} coins (${streakResult.streak}x streak!)`);
      } else {
        // Regular correct answer
        triggerEffectCombo('correctAnswer');
        setFeedback(`+${totalCoins} coins${streakResult.bonusScore > 0 ? ` (streak bonus!)` : '!'}`);
      }
      
    } else {
      // SEMANTIC CUE: Break streak and show incorrect effects
      breakStreak();
      setGameState('incorrect');
      setFeedback(`The correct spelling is: "${currentWord}"`);
      speak(`The correct spelling is ${currentWord}`, 0.9);
      triggerEffectCombo('incorrectAnswer');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && gameState === 'playing' && userInput.trim() !== '') {
      checkAnswer();
    }
  };

  // --- Skin Shop Logic ---
  const purchaseSkin = (skin) => {
    if (coins >= skin.cost && !ownedSkins.includes(skin.id)) {
      setCoins(coins - skin.cost);
      setOwnedSkins([...ownedSkins, skin.id]);
    }
  };

  // --- UI Rendering ---
  const getSkinStyle = (skinId) => {
    const skin = availableSkins.find(s => s.id === skinId);
    if (!skin) return {};
    const style = {};
    if (skin.gradientClass) style.className = skin.gradientClass;
    if (skin.color) style.className = skin.color;
    if (skin.textShadow) style.style = { textShadow: skin.textShadow };
    return style;
  };
  
  return (
    <div className="max-w-4xl mx-auto p-4 font-sans" style={{fontFamily: "'Press Start 2P', cursive"}}>
        {/* Back to Arcade Link */}
        <Link to="/" className="text-indigo-400 hover:text-indigo-200 mb-4 inline-block">
            &larr; Back to Arcade
        </Link>

        <div className="p-4 rounded-lg bg-gradient-to-b from-gray-700 to-gray-900 text-white shadow-2xl shadow-indigo-500/30">
        
            {/* Header */}
            <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-yellow-400 mb-2">Word Wizard</h1>
                <p className="text-gray-300">Spell words, earn coins, unlock skins!</p>
            </div>
            
            {/* Game stats with enhanced visual effects */}
            <div className="flex justify-around mb-6 text-center items-center">
                <div><span className="text-xl">💰</span> {coins} Coins</div>
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
            
            {/* Difficulty selection */}
            <div className="mb-6">
                <div className="text-center mb-2 font-bold text-yellow-400">Difficulty:</div>
                <div className="flex justify-center gap-2">
                    {Object.keys(wordLists).map(level => (
                        <button key={level} onClick={() => setDifficulty(level)}
                            className={`px-3 py-1 text-sm rounded-lg font-bold transition ${
                                difficulty === level ? 'bg-yellow-500 text-gray-900' : 'bg-gray-600 text-white hover:bg-gray-500'
                            }`}
                        >
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
            
            {/* Main Game Area with Visual Effects */}
            <EffectContainer 
                effects={effects} 
                emojiTheme="celebration" 
                className="bg-gray-800 p-6 rounded-lg shadow-inner mb-6 flex flex-col items-center justify-center text-center min-h-[250px]"
            >
                {gameState === 'start' && (
                    <>
                        <h2 className="text-2xl font-bold text-white mb-4">Ready to be a Word Wizard?</h2>
                        <button onClick={startGame}
                            className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-bold text-lg hover:bg-yellow-400 transition"
                        >Start Game</button>
                    </>
                )}

                {gameState === 'playing' && (
                    <>
                        <button onClick={handleWordSound} className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-3 rounded-lg transition mb-4">
                            <span className="text-2xl mr-2">🔊</span>
                            <span>Listen Again</span>
                        </button>
                        <div className="text-gray-400 text-sm mb-4">Type the {currentWord.length}-letter word.</div>
                        <input ref={inputRef} type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} onKeyDown={handleKeyDown}
                            className="w-full max-w-sm px-4 py-3 rounded-lg border-2 bg-gray-900 border-indigo-500 focus:border-yellow-400 focus:outline-none text-center text-white text-2xl tracking-widest"
                            autoComplete="off"
                        />
                    </>
                )}

                {(gameState === 'correct' || gameState === 'incorrect') && (
                    <div className={`p-4 rounded-lg w-full text-center ${gameState === 'correct' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                        <div className="text-xl font-bold mb-2">{gameState === 'correct' ? '🎯 Correct!' : '💫 Try Again!'}</div>
                        <div>{feedback}</div>
                        <button onClick={startNewRound} className={`mt-4 px-4 py-2 rounded-lg font-bold text-white transition ${gameState === 'correct' ? 'bg-green-600 hover:bg-green-500' : 'bg-red-600 hover:bg-red-500'}`}>
                            Next Word
                        </button>
                    </div>
                )}
            </EffectContainer>

            {/* Skin Shop */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-inner">
                <h2 className="text-xl font-bold text-yellow-400 mb-4 text-center">Skin Shop</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {availableSkins.map(skin => {
                        const isOwned = ownedSkins.includes(skin.id);
                        const isActive = activeSkin === skin.id;
                        const skinStyle = getSkinStyle(skin.id);
                        return (
                            <div key={skin.id} className={`border rounded-lg p-3 text-center relative transition ${isActive ? 'border-2 border-yellow-400' : 'border-gray-600'}`}>
                                <div className="text-xl mb-2 h-8 flex items-center justify-center">
                                    <span className={skinStyle.className || 'text-white'} style={skinStyle.style}>PREVIEW</span>
                                </div>
                                <div className="font-bold mb-1 text-sm">{skin.name}</div>
                                {!isOwned ? (
                                    <button onClick={() => purchaseSkin(skin)} disabled={coins < skin.cost}
                                        className={`w-full mt-2 px-2 py-1 text-xs rounded font-bold ${coins < skin.cost ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-yellow-500 text-gray-900 hover:bg-yellow-400'}`}>
                                        Buy: {skin.cost} 💰
                                    </button>
                                ) : (
                                    <button onClick={() => setActiveSkin(skin.id)} disabled={isActive}
                                        className={`w-full mt-2 px-2 py-1 text-xs rounded font-bold ${isActive ? 'bg-gray-600 text-gray-400' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}>
                                        {isActive ? 'Selected' : 'Select'}
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    </div>
  );
};
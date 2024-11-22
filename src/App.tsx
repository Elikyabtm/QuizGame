import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Welcome from './components/Welcome';
import CategorySelection from './components/CategorySelection';
import Settings from './components/Settings';
import Quiz from './components/Quiz';
import Results from './components/Results';
import { GameState, Question } from './types';
import { questions } from './utils/questions';
import { shuffleQuestions, triggerConfetti } from './utils/helpers';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentScreen: 'welcome',
    player: { name: '', score: 0 },
    selectedCategory: '',
    questionCount: 10,
    gameQuestions: [],
    currentQuestionIndex: 0,
    timeLeft: 10,
    isAnswered: false,
  });

  useEffect(() => {
    let timer: number;
    if (gameState.currentScreen === 'quiz' && gameState.timeLeft > 0 && !gameState.isAnswered) {
      timer = setTimeout(() => setGameState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 })), 1000);
    } else if (gameState.timeLeft === 0 && !gameState.isAnswered) {
      handleAnswer('');
    }
    return () => clearTimeout(timer);
  }, [gameState.currentScreen, gameState.timeLeft, gameState.isAnswered]);

  const startGame = () => {
    const filteredQuestions = questions.filter(q => q.category === gameState.selectedCategory);
    const shuffledQuestions = shuffleQuestions(filteredQuestions);
    setGameState(prev => ({
      ...prev,
      currentScreen: 'quiz',
      gameQuestions: shuffledQuestions.slice(0, Math.min(prev.questionCount, shuffledQuestions.length)),
      currentQuestionIndex: 0,
      timeLeft: 10,
      isAnswered: false,
      player: { ...prev.player, score: 0 },
    }));
  };

  const handleAnswer = (selectedAnswer: string) => {
    setGameState(prev => ({ ...prev, isAnswered: true }));
    if (selectedAnswer === gameState.gameQuestions[gameState.currentQuestionIndex].answer) {
      setGameState(prev => ({ ...prev, player: { ...prev.player, score: prev.player.score + 1 } }));
      triggerConfetti();
    }
    setTimeout(() => {
      if (gameState.currentQuestionIndex < gameState.gameQuestions.length - 1) {
        setGameState(prev => ({
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
          timeLeft: 10,
          isAnswered: false,
        }));
      } else {
        setGameState(prev => ({ ...prev, currentScreen: 'results' }));
      }
    }, 2000);
  };

  const resetGame = () => {
    setGameState({
      currentScreen: 'welcome',
      player: { name: '', score: 0 },
      selectedCategory: '',
      questionCount: 10,
      gameQuestions: [],
      currentQuestionIndex: 0,
      timeLeft: 10,
      isAnswered: false,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-container"
      >
        <AnimatePresence mode="wait">
          {gameState.currentScreen === 'welcome' && (
            <Welcome
              key="welcome"
              player={gameState.player}
              setPlayer={(player) => setGameState(prev => ({ ...prev, player }))}
              setCurrentScreen={(screen) => setGameState(prev => ({ ...prev, currentScreen: screen }))}
            />
          )}
          {gameState.currentScreen === 'category' && (
            <CategorySelection
              key="category"
              setSelectedCategory={(category) => setGameState(prev => ({ ...prev, selectedCategory: category }))}
              setCurrentScreen={(screen) => setGameState(prev => ({ ...prev, currentScreen: screen }))}
            />
          )}
          {gameState.currentScreen === 'settings' && (
            <Settings
              key="settings"
              questionCount={gameState.questionCount}
              setQuestionCount={(count) => setGameState(prev => ({ ...prev, questionCount: count }))}
              startGame={startGame}
            />
          )}
          {gameState.currentScreen === 'quiz' && (
            <Quiz
              key="quiz"
              currentQuestionIndex={gameState.currentQuestionIndex}
              gameQuestions={gameState.gameQuestions}
              isAnswered={gameState.isAnswered}
              timeLeft={gameState.timeLeft}
              handleAnswer={handleAnswer}
            />
          )}
          {gameState.currentScreen === 'results' && (
            <Results
              key="results"
              player={gameState.player}
              totalQuestions={gameState.gameQuestions.length}
              resetGame={resetGame}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default App;
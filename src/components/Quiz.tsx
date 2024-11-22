import React from 'react';
import { motion } from 'framer-motion';
import { Timer, Check, X } from 'lucide-react';
import { Question } from '../types';

type QuizProps = {
  currentQuestionIndex: number;
  gameQuestions: Question[];
  isAnswered: boolean;
  timeLeft: number;
  handleAnswer: (selectedAnswer: string) => void;
};

const Quiz: React.FC<QuizProps> = ({ currentQuestionIndex, gameQuestions, isAnswered, timeLeft, handleAnswer }) => {
  const currentQuestion = gameQuestions[currentQuestionIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="text-center space-y-6"
    >
      <h2 className="text-3xl font-bold mb-6">Question {currentQuestionIndex + 1}</h2>
      <div className="bg-white bg-opacity-20 p-6 rounded-lg mb-6">
        <p className="text-xl">{currentQuestion.question}</p>
      </div>
      <ul className="space-y-4">
        {currentQuestion.choices.map((choice, index) => (
          <motion.li
            key={index}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`bg-white bg-opacity-20 p-4 rounded-lg cursor-pointer transition duration-300 ease-in-out transform ${
              isAnswered
                ? choice === currentQuestion.answer
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
                : 'hover:bg-white hover:text-purple-700'
            }`}
            onClick={() => !isAnswered && handleAnswer(choice)}
          >
            {choice}
            {isAnswered && (
              choice === currentQuestion.answer ? (
                <Check className="inline-block ml-2 text-white" />
              ) : (
                <X className="inline-block ml-2 text-white" />
              )
            )}
          </motion.li>
        ))}
      </ul>
      <motion.div
        className="text-3xl font-bold flex items-center justify-center"
        animate={{ scale: timeLeft <= 3 ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 0.5, repeat: timeLeft <= 3 ? Infinity : 0 }}
      >
        <Timer className="mr-2" />
        {timeLeft}
      </motion.div>
    </motion.div>
  );
};

export default Quiz;
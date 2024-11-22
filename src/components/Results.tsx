import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ChevronRight } from 'lucide-react';
import { Player } from '../types';

type ResultsProps = {
  player: Player;
  totalQuestions: number;
  resetGame: () => void;
};

const Results: React.FC<ResultsProps> = ({ player, totalQuestions, resetGame }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="text-center space-y-6"
    >
      <h2 className="text-4xl font-bold mb-8">Résultats</h2>
      <div className="bg-white bg-opacity-20 p-6 rounded-lg mb-6">
        <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
        <p className="text-2xl font-bold">{player.name}</p>
        <p className="text-xl">Score: {player.score} / {totalQuestions}</p>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="button"
        onClick={resetGame}
      >
        Rejouer
        <ChevronRight className="inline-block ml-2" />
      </motion.button>
    </motion.div>
  );
};

export default Results;
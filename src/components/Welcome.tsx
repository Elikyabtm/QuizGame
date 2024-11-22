import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Player } from '../types';

type WelcomeProps = {
  player: Player;
  setPlayer: (player: Player) => void;
  setCurrentScreen: (screen: 'category') => void;
};

const Welcome: React.FC<WelcomeProps> = ({ player, setPlayer, setCurrentScreen }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="text-center space-y-6"
    >
      <h1 className="text-5xl font-bold text-white mb-8 animate-pulse">QuizGame</h1>
      <input
        type="text"
        placeholder="Entrez votre pseudo"
        className="input"
        value={player.name}
        onChange={(e) => setPlayer({ ...player, name: e.target.value })}
        aria-label="Entrez votre pseudo"
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="button"
        onClick={() => setCurrentScreen('category')}
        disabled={!player.name}
      >
        Rejoindre la partie
        <ChevronRight className="inline-block ml-2" />
      </motion.button>
    </motion.div>
  );
};

export default Welcome;
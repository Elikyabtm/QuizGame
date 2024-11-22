import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

type SettingsProps = {
  questionCount: number;
  setQuestionCount: (count: number) => void;
  startGame: () => void;
};

const Settings: React.FC<SettingsProps> = ({ questionCount, setQuestionCount, startGame }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="text-center space-y-6"
    >
      <h2 className="text-4xl font-bold mb-8">Paramètres de la partie</h2>
      <div className="flex items-center justify-between bg-white bg-opacity-20 p-4 rounded-lg">
        <label htmlFor="question-count" className="text-lg">Nombre de questions :</label>
        <select
          id="question-count"
          className="bg-white bg-opacity-20 text-black p-2 rounded-lg"
          value={questionCount}
          onChange={(e) => setQuestionCount(Number(e.target.value))}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="button"
        onClick={startGame}
      >
        Démarrer la partie
        <ChevronRight className="inline-block ml-2" />
      </motion.button>
    </motion.div>
  );
};

export default Settings;
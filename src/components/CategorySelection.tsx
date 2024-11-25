import React from 'react';
import { motion } from 'framer-motion';

type CategorySelectionProps = {
  setSelectedCategory: (category: string) => void;
  setCurrentScreen: (screen: 'settings') => void;
};

const CategorySelection: React.FC<CategorySelectionProps> = ({ setSelectedCategory, setCurrentScreen }) => {
  const categories = ['Séries', 'Films', 'Jeux Vidéo', 'Dessins Animés', 'TikTok'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="text-center space-y-6"
    >
      <h2 className="text-4xl font-bold mb-8">Choisissez une catégorie</h2>
      {categories.map((category) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-white bg-opacity-20 text-white py-4 rounded-lg font-bold text-lg hover:bg-opacity-30 transition duration-300 ease-in-out transform"
          onClick={() => {
            setSelectedCategory(category);
            setCurrentScreen('settings');
          }}
        >
          {category}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default CategorySelection;

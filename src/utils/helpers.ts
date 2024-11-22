import { Question } from '../types';
import confetti from 'canvas-confetti';

export const shuffleQuestions = (questions: Question[]): Question[] => {
  return [...questions].sort(() => Math.random() - 0.5);
};

export const triggerConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
};
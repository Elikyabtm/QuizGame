export type Player = {
    name: string;
    score: number;
  };
  
  export type Question = {
    question: string;
    choices: string[];
    answer: string;
    category: string;
  };
  
  export type GameState = {
    currentScreen: 'welcome' | 'category' | 'settings' | 'quiz' | 'results';
    player: Player;
    selectedCategory: string;
    questionCount: number;
    gameQuestions: Question[];
    currentQuestionIndex: number;
    timeLeft: number;
    isAnswered: boolean;
  };
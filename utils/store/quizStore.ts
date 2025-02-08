import { create } from 'zustand';
import { QuizStore } from '../types';

export const useQuizStore = create<QuizStore>((set, get) => ({
  quizzes: {},

  setQuiz: (id, title, numQuestions, questions) =>
    set((state) => ({
      quizzes: {
        ...state.quizzes,
        [id]: { id, title, numQuestions, questions },
      },
    })),

  getQuizById: (id) => get().quizzes[id],
}));

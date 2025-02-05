import { create } from 'zustand';

interface Quiz {
  id: string;
  title: string;
  numQuestions: number;
  questions: {
    question: string;
    options: string[];
    answer: string;
  }[];
}

interface QuizStore {
  quizzes: Record<string, Quiz>;
  setQuiz: (
    id: string,
    title: string,
    numQuestions: number,
    questions: Quiz['questions']
  ) => void;
  getQuizById: (id: string) => Quiz | undefined;
}

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

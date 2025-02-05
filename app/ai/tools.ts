import { tool as createTool } from 'ai';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { useQuizStore } from '@/utils/store/quizStore';
import { setServerQuiz } from '@/utils/quiz-server-store';

export const quizTool = createTool({
  description:
    'Generate a quiz with a title, number of questions, and a dynamic short link.',
  parameters: z.object({
    title: z.string().describe('The title of the quiz'),
    numQuestions: z
      .number()
      .min(1)
      .describe('The number of questions in the quiz'),
  }),
  execute: async function ({ title, numQuestions }) {
    const questions = Array.from({ length: numQuestions }, (_, i) => ({
      question: `Question ${i + 1}`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      answer: 'Option A',
    }));

    const quizId = nanoid(6);
    const quizData = { id: quizId, title, numQuestions, questions };

    // need to store this to the Db
    useQuizStore.getState().setQuiz(quizId, title, numQuestions, questions);
    setServerQuiz(quizId, quizData);

    const quizLink = `/quiz?token=${quizId}`;
    return { title, numQuestions, link: quizLink };
  },
});

export const tools = {
  generateQuiz: quizTool,
};

import { tool as createTool } from 'ai';
import { z } from 'zod';

export const quizTool = createTool({
  description:
    'Generate a quiz with a title, number of questions, the quiz questions, options, and answers in JSON, along with a dynamic link.',
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

    const quizData = { title, numQuestions, questions };
    const quizContent = encodeURIComponent(JSON.stringify(quizData));
    const quizLink = `/quiz?data=${quizContent}`;

    return { title, numQuestions, questions, link: quizLink };
  },
});

export const tools = {
  generateQuiz: quizTool,
};

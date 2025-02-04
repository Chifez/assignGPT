import { tool as createTool } from 'ai';
import { z } from 'zod';
import { nanoid } from 'nanoid';

// Temporary in-memory store (Replace with DB if needed)
const quizStore = new Map<string, any>();

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

    const quizData = { title, numQuestions, questions };
    const quizId = nanoid(6); // Generate a short ID

    // Store quiz in memory (Replace with DB if needed)
    // localStorage.setItem(quizId, JSON.stringify(quizData));

    const quizLink = `/quiz?token=${quizId}`;

    return { title, numQuestions, link: quizLink };
  },
});

export const tools = {
  generateQuiz: quizTool,
};

// Helper function to get quiz by ID (For retrieval on Quiz page)
export function getQuizById(id: string) {
  return quizStore.get(id) || null;
}

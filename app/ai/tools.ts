import { tool as createTool } from 'ai';
import { z } from 'zod';
import { createClient } from '@/utils/supabase/server';

interface Question {
  question: string;
  type: string;
  options: string[];
  answer: string;
}

export const quizTool = createTool({
  description:
    'Generate a quiz with a title, number of questions, and a dynamic short link. Return questions in JSON format with question, type of question (must only be returned as multiple or paragraph or single, no other word should be used), options array, and answer.',
  parameters: z.object({
    title: z.string().describe('The title of the quiz'),
    numQuestions: z
      .number()
      .min(1)
      .describe('The number of questions in the quiz'),
    questions: z
      .array(
        z.object({
          question: z.string(),
          type: z.string(),
          options: z.array(z.string()),
          answer: z.string(),
        })
      )
      .describe('Array of questions with their options and answers'),
  }),
  execute: async function ({ title, numQuestions, questions }) {
    try {
      const supabase = await createClient();

      // Get the current user's ID
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        console.error('Auth error:', authError);
        throw new Error('Authentication error');
      }

      if (!user) {
        console.error('No user found');
        throw new Error('User not authenticated');
      }

      console.log('Creating quiz for user:', user.id);

      const { data, error } = await supabase
        .from('quizzes')
        .insert([
          {
            title,
            num_questions: numQuestions,
            questions: questions,
            user_id: user.id,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Database error:', error);
        throw new Error(`Failed to save quiz: ${error.message}`);
      }

      if (!data) {
        console.error('No data returned from insert');
        throw new Error('Failed to create quiz');
      }

      console.log('Quiz created successfully:', data.id);

      const quizId = data.id;
      const quizLink = `/quiz?token=${quizId}`;
      return { title, numQuestions, link: quizLink };
    } catch (error) {
      console.error('Quiz generation error:', error);
      throw error;
    }
  },
});

export const tools = {
  generateQuiz: quizTool,
};

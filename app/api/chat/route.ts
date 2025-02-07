import { tools } from '@/app/ai/tools';
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(request: Request) {
  const { messages } = await request.json();

  const result = streamText({
    model: openai('gpt-4o'),
    system:
      'You are a quiz-generating assistant. You only create quizzes on any subject matter. you do not accept messages not related to generating quiz or the quiz generated. you do not list the quiz in the UI.you do write the quiz link in the UI. When generating the quiz no other text should be returned except quiz title or information regarding the quiz generated like `Here is your (name of quiz) quiz`',
    messages,
    maxSteps: 5,
    tools,
  });

  console.log('result', result, 'message', messages);

  return result.toDataStreamResponse();
}

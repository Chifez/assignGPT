import { tools } from '@/app/ai/tools';
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(request: Request) {
  const { messages } = await request.json();

  // Check if the user message is related to quiz creation
  const latestMessage = messages[messages.length - 1]?.content.toLowerCase();
  if (!latestMessage.includes('quiz')) {
    return new Response(
      JSON.stringify({ error: "That's beyond the scope of this model." }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const result = await streamText({
    model: openai('gpt-4o'),
    system:
      'You are a quiz-generating assistant. You only create quizzes on any subject matter.',
    messages,
    maxSteps: 5,
    tools,
  });

  return result.toDataStreamResponse();
}

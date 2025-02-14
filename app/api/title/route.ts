import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { messages } = await request.json();

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content:
          'You are an assistant. Create a descriptive title of not more than 100 words based on the conversation. Return only the title string without the quotes.',
      },
      ...messages,
    ],
    max_tokens: 50,
  });

  let title = completion.choices[0].message.content || '';
  title = title.replace(/['"]+/g, '').trim();

  return new Response(JSON.stringify({ title }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

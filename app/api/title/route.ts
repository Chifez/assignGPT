// import { streamText } from 'ai';
// import { openai } from '@ai-sdk/openai';

// export async function POST(request: Request) {
//   const { messages } = await request.json();

//   const result = await streamText({
//     model: openai('gpt-4o'),
//     system:
//       'You are an assistant.using the array of messages, you only create and return a descriptive title of not more than 100 words. Only a title string should be returned',
//     messages,
//     maxSteps: 5,
//   });

//   console.log('result title', result, 'message title', messages);

//     return new Response(result, {
//       headers: {
//         'Content-Type': 'text/plain', // Change this from application/json
//       },
//     });

// //   return result.toDataStreamResponse();
// }

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

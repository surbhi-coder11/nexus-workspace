import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

// We create a custom OpenAI client that points to Groq's servers
const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages, context } = await req.json();

    const result = await streamText({
      model: groq('llama-3.3-70b-versatile'), // This is one of the best free models
      system: `You are the Nexus AI assistant.
               The user is currently working on a document.
               DOCUMENT CONTENT: ${context}

               Be concise, helpful, and professional.
               If asked to summarize, provide 3 bullet points.
               If asked to expand, provide a detailed paragraph.`,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("AI_CHAT_ERROR:", error);
    return new Response(JSON.stringify({ error: "AI Error" }), { status: 500 });
  }
}

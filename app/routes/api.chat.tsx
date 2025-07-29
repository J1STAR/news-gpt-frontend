import { ActionFunctionArgs, json } from '@remix-run/node';
import { getChatResponse } from '~/services/chat.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method !== 'POST') {
    return json({ message: 'Method not allowed' }, 405);
  }

  try {
    const { question } = await request.json();

    if (!question || typeof question !== 'string') {
      return json({ error: 'Question is required and must be a string.' }, { status: 400 });
    }

    const chatResponse = await getChatResponse(question);
    return json(chatResponse);

  } catch (error) {
    console.error('Chat API route error:', error);
    return json({ error: 'Failed to get chat response.' }, { status: 500 });
  }
}; 
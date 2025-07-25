import { ActionFunctionArgs, json } from '@remix-run/node';

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const industry = formData.get('industry');
  const keyword = formData.get('keyword');

  if (!industry || !keyword) {
    return json({ error: 'Industry and keyword are required' }, { status: 400 });
  }

  try {
    const response = await fetch(`${API_BASE_URL}/industry-analysis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ industry_perspective: industry, target_keyword: keyword })
    });

    if (!response.ok) {
        throw new Error('Failed to fetch industry analysis');
    }

    const data = await response.json();
    return json(data);

  } catch (error) {
    console.error(error);
    return json({ error: 'Failed to get analysis' }, { status: 500 });
  }
}; 
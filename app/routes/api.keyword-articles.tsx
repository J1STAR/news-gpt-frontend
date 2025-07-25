import { json, LoaderFunctionArgs } from '@remix-run/node';
import type { Article } from '~/services/news.server';

const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const keyword = url.searchParams.get('keyword');
  const startDate = url.searchParams.get('start_date');
  const endDate = url.searchParams.get('end_date');
  const region = url.searchParams.get('region') || 'domestic';

  if (!keyword) {
    return json({ articles: [] });
  }

  let apiUrl;
  if (region === "global") {
    apiUrl = `${API_BASE_URL}/global-keyword-articles/${encodeURIComponent(
      keyword,
    )}?start_date=${startDate}&end_date=${endDate}`;
  } else {
    apiUrl = `${API_BASE_URL}/keyword-articles?keyword=${encodeURIComponent(
      keyword,
    )}&start_date=${startDate}&end_date=${endDate}`;
  }

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`API Error for ${keyword}: ${response.statusText}`);
    }
    const data: { articles: Article[] } = await response.json();
    return json({ articles: data.articles || [] });
  } catch (error) {
    console.error(`Failed to fetch keyword articles for ${keyword}:`, error);
    return json({ articles: [] }, { status: 500 });
  }
}; 
const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

export type TrendingKeyword = {
  country: string;
  keyword: string;
  shared: boolean;
};

export type NewsArticle = {
  title: string;
  link: string;
  published: string;
};

export type GptCommentary = {
  comment: string;
};

const COUNTRIES = ['KR', 'US', 'MX', 'GB', 'IN', 'ZA', 'AU'];

export async function getTrendingKeywords(): Promise<TrendingKeyword[]> {
  try {
    const queryParams = COUNTRIES.map(c => `country_codes=${c}`).join("&");
    const res = await fetch(`${API_BASE_URL}/trending?${queryParams}`);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch trending keywords: ${res.statusText}`);
    }
    
    const json = await res.json();
    
    if (json.status !== 'success' || !json.data) {
      throw new Error('Invalid response format for trending keywords');
    }
    
    return json.data;
  } catch (error) {
    console.error("Error fetching trending keywords:", error);
    return [];
  }
}

export async function getNewsForKeyword(country: string, keyword: string): Promise<NewsArticle[]> {
    try {
        const res = await fetch(`${API_BASE_URL}/news?country=${country}&keyword=${encodeURIComponent(keyword)}`);
        if (!res.ok) {
            throw new Error(`News API error: ${res.status}`);
        }
        const json = await res.json();
        return json.news || [];
    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
}

export async function getGptCommentary(country: string, keyword: string, headlines: string[]): Promise<GptCommentary> {
    try {
        const res = await fetch(`${API_BASE_URL}/gpt-commentary`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ country, keyword, headlines })
        });
        if (!res.ok) {
            throw new Error(`GPT API error: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error("Error fetching GPT commentary:", error);
        return { comment: "해설을 가져오는 데 실패했습니다." };
    }
} 
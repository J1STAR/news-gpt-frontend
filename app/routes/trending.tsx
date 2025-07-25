import { json, LoaderFunction, ActionFunction } from '@remix-run/node';
import { useLoaderData, useFetcher } from '@remix-run/react';
import { useState, useEffect, useCallback } from 'react';
import { getTrendingKeywords, TrendingKeyword, getNewsForKeyword, NewsArticle, getGptCommentary, GptCommentary } from '~/services/trending.server';

const COUNTRY_NAMES: { [key: string]: string } = {
  'KR': '한국', 'US': '미국', 'MX': '멕시코', 'GB': '영국', 'IN': '인도', 'ZA': '남아공', 'AU': '호주'
};

type LoaderData = {
  keywords: TrendingKeyword[];
  collectionTime: string;
};

export const loader: LoaderFunction = async () => {
  const keywords = await getTrendingKeywords();
  const collectionTime = new Date().toLocaleString('ko-KR', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  });
  return json({ keywords, collectionTime });
};

export default function Trending() {
  const { keywords: initialKeywords, collectionTime } = useLoaderData<LoaderData>();
  const fetcher = useFetcher<{ news: NewsArticle[], commentary: GptCommentary }>();
  
  const [selectedCountry, setSelectedCountry] = useState('KR');
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [groupedKeywords, setGroupedKeywords] = useState<{ [key: string]: TrendingKeyword[] }>({});

  const handleKeywordClick = useCallback((country: string, keyword: string) => {
    setSelectedKeyword(keyword);
    const formData = new FormData();
    formData.append("country", country);
    formData.append("keyword", keyword);
    fetcher.submit(formData, { method: 'post' });
  }, [fetcher]);

  useEffect(() => {
    const groups: { [key: string]: TrendingKeyword[] } = {};
    initialKeywords.forEach(item => {
      if (!groups[item.country]) {
        groups[item.country] = [];
      }
      groups[item.country].push(item);
    });
    setGroupedKeywords(groups);
  }, [initialKeywords]);
  
  const currentKeywords = groupedKeywords[selectedCountry] || [];

  return (
    <main className="container mx-auto max-w-7xl flex-1 px-6 py-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 text-[var(--accent-color)]">지금 세계는 이걸 검색 중!</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">우리 뉴스에는 없던 이야기, 다른 나라 사람들은 이미 보고 있었어요.</p>
        <p className="text-sm text-gray-500 mt-2">📅 키워드 수집 시간: {collectionTime}</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Keywords */}
        <div className="w-full lg:w-1/3">
          <div className="rounded-lg bg-[var(--card-light)] p-6 shadow-md dark:bg-[var(--card-dark)] mb-6">
            <label htmlFor="country-select" className="font-medium mb-2 block">국가 선택:</label>
            <select
              id="country-select"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full rounded-lg border-2 border-gray-300 bg-white p-3 text-base text-gray-900 focus:border-[var(--accent-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]/50 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              {Object.keys(COUNTRY_NAMES).map(code => (
                <option key={code} value={code}>{COUNTRY_NAMES[code]}</option>
              ))}
            </select>
          </div>

          <div className="rounded-lg bg-[var(--card-light)] p-6 shadow-md dark:bg-[var(--card-dark)] mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span><strong>공통 키워드:</strong> 여러 나라에서 동시 등장</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span><strong>고유 키워드:</strong> 해당 국가에서만 등장</span>
            </div>
          </div>

          <div className="rounded-lg bg-[var(--card-light)] p-6 shadow-md dark:bg-[var(--card-dark)]">
            <h2 className="text-lg font-bold mb-4">🔍 TOP 10 키워드</h2>
            <div className="flex flex-wrap gap-2">
              {currentKeywords.map(({ keyword, shared }) => (
                <button
                  key={keyword}
                  className={`py-2 px-4 border-none rounded-full text-white cursor-pointer font-medium transition-all duration-300 text-sm shadow-md hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 ${
                    keyword === selectedKeyword ? 'ring-2 ring-offset-2 ring-[var(--accent-color)]' : ''
                  } ${
                    shared ? 'bg-gradient-to-r from-blue-500 to-blue-700' : 'bg-gradient-to-r from-red-500 to-red-600'
                  }`}
                  onClick={() => handleKeywordClick(selectedCountry, keyword)}
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Analysis */}
        <div className="w-full lg:w-2/3">
          <div className="rounded-lg bg-[var(--card-light)] p-6 shadow-md dark:bg-[var(--card-dark)] min-h-[500px]">
            {fetcher.state === 'loading' && (
              <div className="flex items-center justify-center h-full">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <div className="w-5 h-5 border-2 border-gray-200 border-t-[var(--accent-color)] rounded-full animate-spin"></div>
                  뉴스 및 GPT 해설 로딩 중...
                </div>
              </div>
            )}
            {fetcher.data && (
              <>
                <h2 className="text-2xl font-bold mb-4">🧠 사람들은 왜 이것을 검색했을까?</h2>
                <div className="mb-6 p-4 bg-gray-100 rounded-lg border-l-4 border-[var(--accent-color)] dark:bg-gray-800">
                  <p className="font-bold text-lg mb-2">{fetcher.data.commentary.comment.split('\n\n')[0]}</p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {fetcher.data.commentary.comment.split('\n\n').slice(1).join('\n\n')}
                  </p>
                </div>
                <p className="text-xs text-gray-500 italic mb-8 text-right">※ 이 해설은 GPT-4o를 통해 자동 생성되었습니다.</p>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">📰 관련 뉴스 (최신 {fetcher.data.news.length}개)</h3>
                  <div className="space-y-4">
                    {fetcher.data.news.map((article) => (
                      <a key={article.link} href={article.link} target="_blank" rel="noopener noreferrer" className="block p-4 bg-white rounded-lg shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:bg-gray-800 dark:hover:bg-gray-700">
                        <p className="font-medium text-gray-800 dark:text-white hover:text-[var(--accent-color)]">{article.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{article.published}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </>
            )}
            {!fetcher.data && fetcher.state !== 'loading' && (
                <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">키워드를 선택하여 분석 결과를 확인하세요.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const country = formData.get("country") as string;
    const keyword = formData.get("keyword") as string;

    const news = await getNewsForKeyword(country, keyword);
    const headlines = news.map(n => n.title);
    const commentary = await getGptCommentary(country, keyword, headlines);

    return json({ news, commentary });
} 
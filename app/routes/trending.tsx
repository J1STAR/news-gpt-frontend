import { json, LoaderFunction, ActionFunction } from '@remix-run/node';
import { useLoaderData, useFetcher } from '@remix-run/react';
import { useState, useEffect } from 'react';
import Header from '~/components/Header';
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
  const [groupedKeywords, setGroupedKeywords] = useState<{ [key: string]: TrendingKeyword[] }>({});

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

  const handleKeywordClick = (country: string, keyword: string) => {
    const formData = new FormData();
    formData.append("country", country);
    formData.append("keyword", keyword);
    fetcher.submit(formData, { method: 'post' });
  };

  const currentKeywords = groupedKeywords[selectedCountry] || [];

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-5xl flex-1 px-6 py-10">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
          지금 세계는 <span className="text-[var(--accent-color)]">이걸 검색 중!</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg">
          우리 뉴스에는 없던 이야기, 다른 나라 사람들은 이미 보고 있었어요.
        </p>
        <div className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
          📅 키워드 수집 시간: {collectionTime}
        </div>

        <div className="bg-[var(--card-light)] dark:bg-[var(--card-dark)] rounded-lg p-6 shadow-md mb-8">
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <label htmlFor="country-select" className="font-medium">국가 선택:</label>
            <select
              id="country-select"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="p-3 text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 outline-none focus:border-[var(--accent-color)] focus:ring-2 focus:ring-blue-200 transition-all"
            >
              {Object.keys(COUNTRY_NAMES).map(code => (
                <option key={code} value={code}>{COUNTRY_NAMES[code]}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-8 mb-6 flex-wrap text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span><strong>공통 키워드</strong> - 여러 나라에서 동시에 등장</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span><strong>고유 키워드</strong> - 해당 국가에서만 등장</span>
            </div>
          </div>

          <div className="text-lg font-bold mb-4 flex items-center gap-2">🔍 TOP 10 키워드</div>
          <div className="flex flex-wrap gap-2">
            {currentKeywords.map(({ keyword, shared }) => (
              <button
                key={keyword}
                className={`py-2 px-4 border-none rounded-full text-white cursor-pointer font-medium transition-all duration-300 text-sm shadow-md hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 ${shared ? 'bg-gradient-to-r from-blue-500 to-blue-700' : 'bg-gradient-to-r from-red-500 to-red-600'
                  }`}
                onClick={() => handleKeywordClick(selectedCountry, keyword)}
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[var(--card-light)] dark:bg-[var(--card-dark)] rounded-lg p-6 shadow-md">
          {fetcher.state === 'loading' && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 italic">
              <div className="w-5 h-5 border-2 border-gray-200 border-t-[var(--accent-color)] rounded-full animate-spin"></div>
              뉴스 및 GPT 해설 로딩 중...
            </div>
          )}
          {fetcher.data && (
            <>
              <div className="text-2xl font-bold mb-4 flex items-center gap-2">🧠 사람들은 왜 이것을 검색했을까?</div>
              <div className="font-bold text-lg mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-[var(--accent-color)]">
                {fetcher.data.commentary.comment.split('\n\n')[0]}
              </div>
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 whitespace-pre-line">
                {fetcher.data.commentary.comment.split('\n\n').slice(1).join('\n\n')}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 italic mb-6 text-right">
                ※ 이 해설은 GPT-4o를 통해 자동 생성되었습니다.
              </div>

              <div className="mt-8">
                <div className="text-xl font-bold mb-4 flex items-center gap-2">📰 관련 뉴스 (최신 {fetcher.data.news.length}개)</div>
                <div className="space-y-4">
                  {fetcher.data.news.map((article) => (
                    <div key={article.link} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg transition-all hover:shadow-md">
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium block mb-2 hover:text-[var(--accent-color)] transition-colors"
                      >
                        {article.title}
                      </a>
                      <div className="text-gray-500 dark:text-gray-400 text-sm">{article.published}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </>
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
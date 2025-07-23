import { json, LoaderFunction, ActionFunction } from '@remix-run/node';
import { useLoaderData, useFetcher } from '@remix-run/react';
import { useState, useEffect } from 'react';
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
    <div className="w-full min-h-[calc(100vh-146px)] p-8 bg-gray-200 bg-opacity-60 backdrop-blur-md">
      <h1 className="text-4xl mb-4 text-center bg-gradient-to-r from-purple-500 to-indigo-600 text-transparent bg-clip-text">
        지금 세계는 <b>이걸 검색 중!</b>
      </h1>
      <p className="text-center text-gray-600 mb-4 text-lg">우리 뉴스에는 없던 이야기, 다른 나라 사람들은 이미 보고 있었어요.</p>
      <div className="text-center text-gray-500 mb-8 text-sm" id="collection-time">
        📅 키워드 수집 시간: {collectionTime}
      </div>

      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <label htmlFor="country-select" className="font-medium">국가 선택: </label>
        <select
          id="country-select"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="p-3 text-base border-2 border-gray-300 rounded-lg bg-white outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
        >
          {Object.keys(COUNTRY_NAMES).map(code => (
            <option key={code} value={code}>{COUNTRY_NAMES[code]}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-8 mb-6 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span><strong>공통 키워드</strong> - 여러 나라에서 동시에 등장</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span><strong>고유 키워드</strong> - 해당 국가에서만 등장</span>
        </div>
      </div>
      
      <div className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">🔍 TOP 10 키워드</div>
      <div id="keyword-buttons">
        {currentKeywords.map(({ keyword, shared }) => (
          <button
            key={keyword}
            className={`m-1.5 py-3 px-4 border-none rounded-full text-white cursor-pointer font-medium transition-all duration-300 text-sm shadow-md hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 ${
              shared ? 'bg-gradient-to-r from-blue-500 to-blue-700' : 'bg-gradient-to-r from-red-500 to-red-600'
            }`}
            onClick={() => handleKeywordClick(selectedCountry, keyword)}
          >
            {keyword}
          </button>
        ))}
      </div>
      
      <div id="output" className="mt-8 p-6 bg-white bg-opacity-80 rounded-xl border border-gray-200">
        {fetcher.state === 'loading' && (
          <div className="flex items-center gap-2 text-gray-600 italic">
            <div className="w-5 h-5 border-2 border-gray-200 border-t-purple-500 rounded-full animate-spin"></div>
            뉴스 및 GPT 해설 로딩 중...
          </div>
        )}
        {fetcher.data && (
          <>
            <div className="text-2xl text-gray-800 mb-4 flex items-center gap-2">🧠 사람들은 왜 이것을 검색했을까?</div>
            <div className="font-bold text-lg text-gray-800 mb-4 p-4 bg-purple-100 bg-opacity-50 rounded-lg border-l-4 border-purple-500">
              {fetcher.data.commentary.comment.split('\n\n')[0]}
            </div>
            <div className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
              {fetcher.data.commentary.comment.split('\n\n').slice(1).join('\n\n')}
            </div>
            <div className="text-xs text-gray-500 italic mb-6 text-right">※ 이 해설은 GPT-4o를 통해 자동 생성되었습니다.</div>
            
            <div className="mt-8">
              <div className="text-xl text-gray-800 mb-4 flex items-center gap-2">📰 관련 뉴스 (최신 {fetcher.data.news.length}개)</div>
              <div id="news-container">
                {fetcher.data.news.map((article) => (
                  <div key={article.link} className="my-4 p-4 bg-white rounded-lg shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                    <a href={article.link} target="_blank" rel="noopener noreferrer" className="no-underline text-gray-800 font-medium block mb-2 hover:text-purple-600">
                      {article.title}
                    </a>
                    <div className="text-gray-500 text-sm">{article.published}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
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
import { json, LinksFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData, useFetcher } from '@remix-run/react';
import { useState, useEffect } from 'react';
import { getTrendingKeywords, TrendingKeyword, getNewsForKeyword, NewsArticle, getGptCommentary, GptCommentary } from '~/services/trending.server';
import trendingStyles from '~/styles/trending.css?url';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: trendingStyles },
];

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
    <div className="trending-container">
      <h1>지금 세계는 <b>이걸 검색 중!</b></h1>
      <p className="subtitle">우리 뉴스에는 없던 이야기, 다른 나라 사람들은 이미 보고 있었어요.</p>
      <div className="collection-time" id="collection-time">📅 키워드 수집 시간: {collectionTime}</div>

      <div className="controls">
        <label htmlFor="country-select">국가 선택: </label>
        <select id="country-select" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
          {Object.keys(COUNTRY_NAMES).map(code => (
            <option key={code} value={code}>{COUNTRY_NAMES[code]}</option>
          ))}
        </select>
      </div>

      <div className="legend">
        <div className="legend-item"><div className="legend-dot shared-dot"></div><span><strong>공통 키워드</strong> - 여러 나라에서 동시에 등장</span></div>
        <div className="legend-item"><div className="legend-dot unique-dot"></div><span><strong>고유 키워드</strong> - 해당 국가에서만 등장</span></div>
      </div>
      
      <div className="keywords-title">🔍 TOP 10 키워드</div>
      <div id="keyword-buttons">
        {currentKeywords.map(({ keyword, shared }) => (
          <button key={keyword} className={shared ? 'shared' : 'unique'} onClick={() => handleKeywordClick(selectedCountry, keyword)}>
            {keyword}
          </button>
        ))}
      </div>
      
      <div id="output">
        {fetcher.state === 'loading' && (
          <div className="loading"><div className="spinner"></div>뉴스 및 GPT 해설 로딩 중...</div>
        )}
        {fetcher.data && (
          <>
            <div className="result-title">🧠 사람들은 왜 이것을 검색했을까?</div>
            <div className="summary">{fetcher.data.commentary.comment.split('\n\n')[0]}</div>
            <div className="detail">{fetcher.data.commentary.comment.split('\n\n').slice(1).join('\n\n')}</div>
            <div className="gpt-note">※ 이 해설은 GPT-4o를 통해 자동 생성되었습니다.</div>
            <div className="news-section">
              <div className="news-title">📰 관련 뉴스 (최신 {fetcher.data.news.length}개)</div>
              <div id="news-container">
                {fetcher.data.news.map((article) => (
                  <div key={article.link} className="headline">
                    <a href={article.link} target="_blank" rel="noopener noreferrer">{article.title}</a>
                    <div className="published">{article.published}</div>
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

export async function action({ request }: { request: Request }) {
    const formData = await request.formData();
    const country = formData.get("country") as string;
    const keyword = formData.get("keyword") as string;

    const news = await getNewsForKeyword(country, keyword);
    const headlines = news.map(n => n.title);
    const commentary = await getGptCommentary(country, keyword, headlines);

    return json({ news, commentary });
} 
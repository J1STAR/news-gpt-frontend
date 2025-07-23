import { useState } from 'react';
import { json } from '@remix-run/node';
import type { LinksFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import WeeklySummary from '~/components/WeeklySummary';
import IndustryAnalysis from '~/components/IndustryAnalysis';
import Chatbot from '~/components/Chatbot';
import ArticleModal from '~/components/ArticleModal';
import SubscribeModal from '~/components/SubscribeModal';
import { getWeeklyKeywords, WeeklyKeywordData } from '~/services/analysis.server';
import analysisStyles from '~/styles/analysis.css?url';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: analysisStyles },
];

export const loader = async () => {
  const weeklyKeywords = await getWeeklyKeywords();
  return json({ weeklyKeywords });
};

export default function Analysis() {
  const { weeklyKeywords } = useLoaderData<{ weeklyKeywords: WeeklyKeywordData[] }>();
  const [isArticleModalOpen, setArticleModalOpen] = useState(false);
  const [isSubscribeModalOpen, setSubscribeModalOpen] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);

  // This would be fetched based on the selected keyword
  const sampleArticles = [
      { title: 'Article 1', summary: 'Summary 1', url: '#', date: '2025-07-22' }
  ];

  return (
    <>
      <div className="header">
        <Link to="/" className="back-btn">
          ← 뉴스 홈
        </Link>
        <div className="header-content">
          <h1>🔍 AI 뉴스 키워드 분석</h1>
          <p className="subtitle">주간 트렌드와 산업별 분석을 한눈에</p>
        </div>
        <button className="subscribe-btn" onClick={() => setSubscribeModalOpen(true)}>
          📧 주간 인사이트 구독하기
        </button>
      </div>

      <div className="main-container">
        <WeeklySummary weeklyKeywords={weeklyKeywords} onKeywordClick={(keyword) => {
            setSelectedKeyword(keyword);
            setArticleModalOpen(true);
        }}/>
        <IndustryAnalysis selectedKeyword={selectedKeyword} />
        <Chatbot />
      </div>

      <ArticleModal 
        isOpen={isArticleModalOpen}
        onClose={() => setArticleModalOpen(false)}
        keyword={selectedKeyword}
        articles={sampleArticles}
      />
      <SubscribeModal 
        isOpen={isSubscribeModalOpen}
        onClose={() => setSubscribeModalOpen(false)}
      />
    </>
  );
} 
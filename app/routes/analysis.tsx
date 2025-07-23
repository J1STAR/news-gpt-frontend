import { useState, useEffect } from 'react';
import { json } from '@remix-run/node';
import type { LinksFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import WeeklySummary from '~/components/WeeklySummary';
import IndustryAnalysis from '~/components/IndustryAnalysis';
import Chatbot from '~/components/Chatbot';
import ArticleModal from '~/components/ArticleModal';
import SubscribeModal from '~/components/SubscribeModal';
import { getWeeklyKeywords, WeeklyKeywordData } from '~/services/analysis.server';
import type { Article } from '~/services/news.server';
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
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState<{ startDate: string, endDate: string} | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<'domestic' | 'global' | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  useEffect(() => {
    if (selectedKeyword && selectedDateRange && selectedRegion) {
      const fetchArticles = async () => {
        setIsLoadingArticles(true);
        setArticles([]);
        try {
          const { startDate, endDate } = selectedDateRange;
          const response = await fetch(`/api/keyword-articles?keyword=${selectedKeyword}&start_date=${startDate}&end_date=${endDate}&region=${selectedRegion}`);
          const data = await response.json();
          setArticles(data.articles || []);
        } catch (error) {
          console.error("Error fetching articles:", error);
          setArticles([]);
        } finally {
          setIsLoadingArticles(false);
        }
      };

      fetchArticles();
    }
  }, [selectedKeyword, selectedDateRange, selectedRegion]);


  return (
    <div className="analysis-page-container">
      <div className="main-container">
        <div className="weekly-summary-container">
          <WeeklySummary weeklyKeywords={weeklyKeywords} onKeywordClick={(keyword, startDate, endDate, region) => {
              setSelectedKeyword(keyword);
              setSelectedDateRange({ startDate, endDate });
              setSelectedRegion(region);
              setArticleModalOpen(true);
          }}/>
          <IndustryAnalysis selectedKeyword={selectedKeyword} onIndustryClick={(industry) => {
              setSelectedIndustry(industry);
          }}/>
        </div>
        <div className="chatbot-container">
          <Chatbot />
        </div>
      </div>

      <ArticleModal 
        isOpen={isArticleModalOpen}
        onClose={() => setArticleModalOpen(false)}
        keyword={selectedKeyword}
        articles={articles}
        isLoading={isLoadingArticles}
      />
      <SubscribeModal 
        isOpen={isSubscribeModalOpen}
        onClose={() => setSubscribeModalOpen(false)}
      />
    </div>
  );
} 
import { useState, useEffect } from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import WeeklySummary from '~/components/WeeklySummary';
import IndustryAnalysisResults from '~/components/IndustryAnalysisResults';
import Chatbot from '~/components/Chatbot';
import ArticleModal from '~/components/ArticleModal';
import SubscribeModal from '~/components/SubscribeModal';
import { getWeeklyKeywords, WeeklyKeywordData } from '~/services/industry-analysis.server';
import type { Article } from '~/services/news.server';

export const loader = async () => {
  const weeklyKeywords = await getWeeklyKeywords();
  return json({ weeklyKeywords });
};

export default function IndustryAnalysis() {
  const { weeklyKeywords } = useLoaderData<{ weeklyKeywords: WeeklyKeywordData[] }>();
  const [isArticleModalOpen, setArticleModalOpen] = useState(false);
  const [isSubscribeModalOpen, setSubscribeModalOpen] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState<{ startDate: string, endDate: string} | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<'domestic' | 'global' | null>(null);

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
    <div className="bg-gray-900 font-sans text-white min-h-screen">
      <div className="mx-auto flex max-w-screen-2xl flex-row gap-10 p-5">
        <div className="flex-[6_1_0]">
          <WeeklySummary
            weeklyKeywords={weeklyKeywords}
            onKeywordClick={(keyword, startDate, endDate, region) => {
              setSelectedKeyword(keyword);
              setSelectedDateRange({ startDate, endDate });
              setSelectedRegion(region);
              setArticleModalOpen(true);
            }}
            activeKeyword={selectedKeyword}
          />
          <IndustryAnalysisResults
            selectedKeyword={selectedKeyword}
            onIndustryClick={(industry) => {
              // 나중에 산업별 분석 기능 구현 시 사용
              console.log('Selected Industry:', industry);
          }}/>
        </div>
        <div className="flex-[4_1_0]">
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
import { useState, useEffect } from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import WeeklySummary from '~/components/WeeklySummary';
import IndustryAnalysisResults from '~/components/IndustryAnalysisResults';
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
    <main className="container mx-auto max-w-7xl flex-1 px-6 py-10">
      <div className="">
        <h1 className="text-4xl font-bold mb-2 text-[var(--accent-color)]">키워드 심층 분석</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">지난 주의 뉴스 키워드를 <br/>내 <strong>&rsquo;산업&rsquo;</strong> 관점에서 어떻게 해석해야 할까요? </p>
      </div>

      <div className="flex gap-10">
        <div className="w-[40%]">
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
        </div>
        <div className="w-[60%]">
          <IndustryAnalysisResults
            selectedKeyword={selectedKeyword}
            onIndustryClick={(industry) => {
              // 나중에 산업별 분석 기능 구현 시 사용
              console.log('Selected Industry:', industry);
          }}/>
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
    </main>
  );
} 
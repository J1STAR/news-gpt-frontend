import { useFetcher } from '@remix-run/react';
import { useState, useEffect } from 'react';
import { marked } from 'marked';

type IndustryAnalysisData = {
  analysis: string;
  counter_analysis: string;
};

type IndustryAnalysisProps = {
  selectedKeyword: string | null;
  onIndustryClick: (industry: string) => void;
};

export default function IndustryAnalysisResults({ selectedKeyword, onIndustryClick }: IndustryAnalysisProps) {
  const fetcher = useFetcher<IndustryAnalysisData>();
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);
  
  const industries = ['제조업', '정보통신업', '건설업', '교육 서비스업', '금융 및 보험업', '소비자 서비스업', '무역업', '운송업'];

  useEffect(() => {
    if (!selectedKeyword || !activeIndustry) {
      return;
    }

    const formData = new FormData();
    formData.append('industry', activeIndustry);
    formData.append('keyword', selectedKeyword);
    fetcher.submit(formData, { method: 'post', action: '/api/industry-analysis' });
  }, [selectedKeyword, activeIndustry]);

  return (
    <div className="my-8 rounded-lg bg-[var(--card-light)] p-6 shadow-md dark:bg-[var(--card-dark)]">
      <h2 className="mb-5 inline-block border-b-4 border-[var(--accent-color)] pb-2 text-2xl font-bold">이런 시각은 어때요?</h2>
      <div className="mb-6 flex flex-wrap gap-3">
        {industries.map(industry => {
          const isActive = activeIndustry === industry;
          return (
            <button
              key={industry}
              className={`cursor-pointer rounded-lg px-5 py-3.5 font-semibold shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-px ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
              onClick={() => {
                setActiveIndustry(industry);
                onIndustryClick(industry);
              }}
            >
              {industry}
            </button>
          );
        })}
      </div>
      <div className="min-h-[200px] rounded-lg bg-gray-100 p-6 leading-relaxed text-gray-800 shadow-inner dark:bg-gray-800 dark:text-gray-300">
        {(fetcher.state === 'loading' || fetcher.state === 'submitting') ? (
          <div className="flex h-full min-h-[200px] items-center justify-center">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-200 border-t-[var(--accent-color)]"></div>
              <span>🤔 다양한 관점에서 분석 중...</span>
            </div>
          </div>
        ) : fetcher.data ? (
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="rounded-lg border-l-4 border-blue-500 bg-white p-5 shadow-md dark:bg-gray-700">
              <div className="mb-4 flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-300">
                  <span>👍</span>
                  긍정적/일반 분석
              </div>
              <div className="prose max-w-none prose-p:my-2 prose-ul:my-2 prose-ol:my-2 dark:prose-invert" dangerouslySetInnerHTML={{ __html: marked.parse(fetcher.data.analysis || '긍정적 분석을 생성할 수 없습니다.') }} />
            </div>
            <div className="rounded-lg border-l-4 border-red-500 bg-white p-5 shadow-md dark:bg-gray-700">
                <div className="mb-4 flex items-center gap-2 font-semibold text-red-600 dark:text-red-400">
                    <span>🤔</span>
                    비판적/회의적 분석
                </div>
                <div className="prose max-w-none prose-p:my-2 prose-ul:my-2 prose-ol:my-2 dark:prose-invert" dangerouslySetInnerHTML={{ __html: marked.parse(fetcher.data.counter_analysis || '비판적 분석을 생성할 수 없습니다.') }} />
            </div>
          </div>
        ) : (
          <div className="flex h-full min-h-[200px] items-center justify-center">
            <div className="text-center text-gray-500 dark:text-gray-400">분석할 키워드를 선택해주세요</div>
          </div>
        )}
      </div>
    </div>
  );
} 
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
  
  const industries = ['사회', '경제', 'IT/과학', '생활/문화', '세계'];

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
    <div className="my-8 min-h-[600px] rounded-2xl border border-gray-700 bg-gray-800/50 p-10 shadow-2xl">
      <h2 className="mb-5 inline-block border-b-4 border-teal-400 pb-2 text-2xl font-bold text-white">이런 시각은 어때요?</h2>
      <div className="mb-6 flex flex-wrap gap-3">
        {industries.map(industry => {
          const isActive = activeIndustry === industry;
          return (
            <button
              key={industry}
              className={`cursor-pointer rounded-lg border-2 px-5 py-3.5 font-semibold shadow-md transition-all duration-300 ease-in-out hover:-translate-y-px ${
                isActive
                  ? 'border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500 hover:bg-gray-600'
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
      <div className="min-h-[200px] rounded-xl bg-gray-800 p-6 leading-relaxed text-gray-300 shadow-inner">
        {fetcher.state === 'loading' ? (
          <div className="text-center text-gray-400">🤔 다양한 관점에서 분석 중...</div>
        ) : fetcher.data ? (
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="rounded-lg border-l-4 border-blue-500 bg-gray-800 p-5 shadow-md">
              <div className="mb-4 flex items-center gap-2 font-semibold text-blue-300">
                  <span>👍</span>
                  긍정적/일반 분석
              </div>
              <div className="prose prose-invert max-w-none prose-p:my-2 prose-ul:my-2 prose-ol:my-2" dangerouslySetInnerHTML={{ __html: marked.parse(fetcher.data.analysis || '긍정적 분석을 생성할 수 없습니다.') }} />
            </div>
            <div className="rounded-lg border-l-4 border-red-500 bg-gray-800 p-5 shadow-md">
                <div className="mb-4 flex items-center gap-2 font-semibold text-red-400">
                    <span>🤔</span>
                    비판적/회의적 분석
                </div>
                <div className="prose prose-invert max-w-none prose-p:my-2 prose-ul:my-2 prose-ol:my-2" dangerouslySetInnerHTML={{ __html: marked.parse(fetcher.data.counter_analysis || '비판적 분석을 생성할 수 없습니다.') }} />
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400">분석할 키워드를 선택해주세요</div>
        )}
      </div>
    </div>
  );
} 
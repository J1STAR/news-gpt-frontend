import { json, LoaderFunction } from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { useEffect, useMemo, useState } from 'react';
import { getWeeklyKeywords, WeeklyKeywordData, Keyword } from '~/services/industry-analysis.server';
import { marked } from 'marked';

export const loader: LoaderFunction = async () => {
  const weeklyKeywords = await getWeeklyKeywords();
  return json({ weeklyKeywords });
};

type JobAnalysisData = {
  query: string;
  summary: string;
  insight_analysis: string;
  counter_insight_analysis: string;
  status: string;
};

export default function JobAnalysis() {
  const { weeklyKeywords } = useLoaderData<{ weeklyKeywords: WeeklyKeywordData[] }>();
  const fetcher = useFetcher<JobAnalysisData>();

  const [jobTitle, setJobTitle] = useState('');
  const [submittedJobTitle, setSubmittedJobTitle] = useState('');
  const [selectedKeyword, setSelectedKeyword] = useState<Keyword | null>(null);
  const [showKeywords, setShowKeywords] = useState(false);

  const keywords = useMemo(() => {
    if (!weeklyKeywords) return [];
    const allKeywords = weeklyKeywords.flatMap((week: WeeklyKeywordData) => [
      ...week.domestic,
      ...week.global,
    ]);

    const uniqueKeywords = allKeywords.filter((keyword, index, self) =>
      index === self.findIndex((t) => t.keyword === keyword.keyword)
    );
    return uniqueKeywords.sort(() => Math.random() - 0.5); // 섞기
  }, [weeklyKeywords]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (jobTitle.trim()) {
        setSubmittedJobTitle(jobTitle.trim());
        setShowKeywords(true);
      } else {
        setShowKeywords(false);
        setSubmittedJobTitle('');
        setSelectedKeyword(null);
      }
    }, 500); // 500ms 뒤에 실행

    return () => clearTimeout(handler);
  }, [jobTitle]);

  useEffect(() => {
    if (submittedJobTitle && selectedKeyword?.keyword && selectedKeyword?.reason) {
      const formData = new FormData();
      formData.append('query', submittedJobTitle);
      formData.append('keyword', selectedKeyword?.keyword);
      formData.append('reason', selectedKeyword?.reason);
      fetcher.submit(formData, { method: 'post', action: '/api/job-analysis' });
    }
  }, [submittedJobTitle, selectedKeyword]);


  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="mx-auto max-w-4xl text-white">
        {/* 1. 직무 입력 */}
        <div className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">직무 입력</h2>
          <input
            type="text"
            value={jobTitle}
            onChange={e => setJobTitle(e.target.value)}
            placeholder="예: 프론트엔드 개발자"
            className="w-full rounded-lg border-2 border-gray-600 bg-gray-800 p-4 text-lg text-white focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50"
          />
        </div>

        {/* 2. 주간 키워드 목록 */}
        <div
          className={`transition-all duration-700 ease-in-out ${
            showKeywords ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {submittedJobTitle && (
            <div className="mb-12">
              <h2 className="mb-4 text-3xl font-bold">주간 키워드</h2>
              <div className="flex flex-wrap gap-3">
                {keywords.map(keyword => (
                  <button
                    key={keyword.keyword}
                    title={keyword.reason}
                    onClick={() => setSelectedKeyword(keyword)}
                    className={`rounded-full px-5 py-2.5 font-semibold transition-all duration-200 ${
                      selectedKeyword?.keyword === keyword.keyword
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {keyword.keyword}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 4. 직무 분석 결과 */}
        {submittedJobTitle && selectedKeyword && (
          <div>
            <h2 className="mb-4 text-3xl font-bold">
              <span className="text-teal-400">{submittedJobTitle}</span> X <span className="text-blue-400">{selectedKeyword.keyword}</span> 분석
            </h2>

            <div className="space-y-8">
              {/* 직무 요약 */}
              <div className="rounded-lg bg-gray-800 p-6">
                <h3 className="mb-3 text-2xl font-semibold text-teal-400">직무 요약: {submittedJobTitle}</h3>
                {fetcher.state === 'loading' || fetcher.state === 'submitting' ? (
                  <div className="flex min-h-[100px] items-center justify-center rounded-lg bg-gray-800/50">
                    <p className="animate-pulse text-lg text-gray-400">🤔 AI가 직무의 핵심을 파악하고 있어요...</p>
                  </div>
                ) : (
                  fetcher.data?.summary && (
                    <div
                      className="prose prose-invert max-w-none prose-p:my-2"
                      dangerouslySetInnerHTML={{ __html: marked.parse(fetcher.data.summary) }}
                    />
                  )
                )}
              </div>

              {/* 긍정적/비판적 분석 */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="rounded-lg border-l-4 border-blue-500 bg-gray-800 p-5 shadow-md">
                  <h4 className="mb-4 flex items-center gap-2 font-semibold text-blue-300">👍 긍정적/기회 분석</h4>
                  {fetcher.state === 'loading' || fetcher.state === 'submitting' ? (
                    <div className="flex min-h-[150px] items-center justify-center rounded-lg bg-gray-800/50">
                      <p className="animate-pulse text-lg text-gray-400">✨ 새로운 관점을 발견하고 있어요...</p>
                    </div>
                  ) : (
                    fetcher.data?.insight_analysis && (
                      <div
                        className="prose prose-invert max-w-none prose-p:my-2"
                        dangerouslySetInnerHTML={{
                          __html: marked.parse(fetcher.data.insight_analysis),
                        }}
                      />
                    )
                  )}
                </div>
                <div className="rounded-lg border-l-4 border-red-500 bg-gray-800 p-5 shadow-md">
                  <h4 className="mb-4 flex items-center gap-2 font-semibold text-red-400">🤔 비판적/위협 분석</h4>
                  {fetcher.state === 'loading' || fetcher.state === 'submitting' ? (
                    <div className="flex min-h-[150px] items-center justify-center rounded-lg bg-gray-800/50">
                      <p className="animate-pulse text-lg text-gray-400">✨ 새로운 관점을 발견하고 있어요...</p>
                    </div>
                  ) : (
                    fetcher.data?.counter_insight_analysis && (
                      <div
                        className="prose prose-invert max-w-none prose-p:my-2"
                        dangerouslySetInnerHTML={{
                          __html: marked.parse(fetcher.data.counter_insight_analysis),
                        }}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
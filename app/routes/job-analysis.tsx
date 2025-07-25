import { json, LoaderFunction } from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { useEffect, useMemo, useState, useRef } from 'react';
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

const jobTitlesList = [
  '프론트엔드 개발자',
  '백엔드 개발자',
  '풀스택 개발자',
  'DevOps 엔지니어',
  '데이터 사이언티스트',
  '데이터 분석가',
  '프로덕트 매니저(PM)',
  '프로덕트 오너(PO)',
  'UI/UX 디자이너',
  'QA 엔지니어',
  '안드로이드 개발자',
  'iOS 개발자',
];

export default function JobAnalysis() {
  const { weeklyKeywords } = useLoaderData<{ weeklyKeywords: WeeklyKeywordData[] }>();
  const fetcher = useFetcher<JobAnalysisData>();

  const [jobTitle, setJobTitle] = useState('');
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeDescendant, setActiveDescendant] = useState<string | undefined>(undefined);
  const [selectedKeyword, setSelectedKeyword] = useState<Keyword | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredJobs = useMemo(() => {
    if (!jobTitle) return [];
    if (jobTitlesList.includes(jobTitle)) return [];

    return jobTitlesList.filter(job => job.toLowerCase().includes(jobTitle.toLowerCase()));
  }, [jobTitle]);

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
      const isValidJob = jobTitlesList.includes(jobTitle.trim());
      if (isValidJob) {
        setSelectedJob(jobTitle.trim());
        setIsDropdownOpen(false);
      } else {
        if (selectedJob) {
          setSelectedJob(null);
        }
      }
    }, 100);

    return () => clearTimeout(handler);
  }, [jobTitle, selectedJob]);

  useEffect(() => {
    if (selectedJob && selectedKeyword?.keyword && selectedKeyword?.reason) {
      const formData = new FormData();
      formData.append('query', selectedJob);
      formData.append('keyword', selectedKeyword.keyword);
      formData.append('reason', selectedKeyword.reason);
      fetcher.submit(formData, { method: 'post', action: '/api/job-analysis' });
    }
  }, [selectedJob, selectedKeyword, fetcher]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const handleJobTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setJobTitle(value);
    setSelectedKeyword(null);
    if (value) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
    setActiveDescendant(undefined);
  };

  const handleJobSelect = (job: string) => {
    setJobTitle(job);
    setIsDropdownOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isDropdownOpen || filteredJobs.length === 0) return;

    let currentIndex = -1;
    if (activeDescendant) {
      currentIndex = filteredJobs.findIndex(job => `job-option-${job}` === activeDescendant);
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % filteredJobs.length;
      setActiveDescendant(`job-option-${filteredJobs[nextIndex]}`);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const nextIndex = (currentIndex - 1 + filteredJobs.length) % filteredJobs.length;
      setActiveDescendant(`job-option-${filteredJobs[nextIndex]}`);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeDescendant) {
        const selected = filteredJobs.find(job => `job-option-${job}` === activeDescendant);
        if (selected) {
          handleJobSelect(selected);
        }
      }
    } else if (e.key === 'Escape') {
      setIsDropdownOpen(false);
    }
  };

  return (
    <main className="container mx-auto max-w-4xl flex-1 px-6 py-10">
      {/* 1. 직무 입력 */}
      <div className="mb-12 rounded-lg bg-[var(--card-light)] p-6 shadow-md dark:bg-[var(--card-dark)]">
        <h2 className="mb-4 text-3xl font-bold">직무 입력</h2>
        <div className="relative" ref={dropdownRef}>
          <input
            ref={inputRef}
            type="text"
            value={jobTitle}
            onChange={handleJobTitleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (jobTitle) {
                setIsDropdownOpen(true);
              }
            }}
            placeholder="예: '프론트엔드 개발자'를 입력 후 선택하시면 키워드를 선택하실 수 있어요!"
            className="w-full rounded-lg border-2 border-gray-300 bg-white p-4 text-lg text-gray-900 focus:border-[var(--accent-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]/50 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            role="combobox"
            aria-expanded={isDropdownOpen ? 'true' : 'false'}
            aria-controls="job-listbox"
            aria-activedescendant={activeDescendant}
          />
          {isDropdownOpen && (
            <ul
              id="job-listbox"
              className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800"
              role="listbox"
            >
              {filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <li
                    key={job}
                    id={`job-option-${job}`}
                    onClick={() => handleJobSelect(job)}
                    onMouseEnter={() => setActiveDescendant(`job-option-${job}`)}
                    role="option"
                    aria-selected={job === jobTitle ? 'true' : 'false'}
                    className={`cursor-pointer px-4 py-2 text-gray-900 dark:text-white ${
                      activeDescendant === `job-option-${job}` ? 'bg-gray-100 dark:bg-gray-700' : ''
                    }`}
                  >
                    {job}
                  </li>
                ))
              ) : jobTitle ? (
                <li className="px-4 py-2 text-gray-500">일치하는 직무가 없습니다</li>
              ) : null}
            </ul>
          )}
        </div>
      </div>

      {/* 2. 주간 키워드 목록 */}
      <div
        className={`transition-all duration-700 ease-in-out ${
          selectedJob ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {selectedJob && (
          <div className="mb-12 rounded-lg bg-[var(--card-light)] p-6 shadow-md dark:bg-[var(--card-dark)]">
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
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
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
      {selectedJob && selectedKeyword && (
        <div className="rounded-lg bg-[var(--card-light)] p-6 shadow-md dark:bg-[var(--card-dark)]">
          <h2 className="mb-4 text-3xl font-bold">
            <span className="text-[var(--accent-color)]">{selectedJob}</span> X <span className="text-blue-400">{selectedKeyword.keyword}</span> 분석
          </h2>

          <div className="space-y-8">
            {/* 직무 요약 */}
            <div className="rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
              <h3 className="mb-3 text-2xl font-semibold text-[var(--accent-color)]">직무 요약: {submittedJobTitle}</h3>
              {fetcher.state === 'loading' || fetcher.state === 'submitting' ? (
                <div className="flex min-h-[100px] items-center justify-center rounded-lg bg-gray-200/50 dark:bg-gray-800/50">
                  <p className="animate-pulse text-lg text-gray-500 dark:text-gray-400">🤔 AI가 직무의 핵심을 파악하고 있어요...</p>
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
              <div className="rounded-lg border-l-4 border-blue-500 bg-gray-100 p-5 shadow-md dark:bg-gray-800">
                <h4 className="mb-4 flex items-center gap-2 font-semibold text-blue-500 dark:text-blue-300">👍 긍정적/기회 분석</h4>
                {fetcher.state === 'loading' || fetcher.state === 'submitting' ? (
                  <div className="flex min-h-[150px] items-center justify-center rounded-lg bg-gray-200/50 dark:bg-gray-800/50">
                    <p className="animate-pulse text-lg text-gray-500 dark:text-gray-400">✨ 새로운 관점을 발견하고 있어요...</p>
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
              <div className="rounded-lg border-l-4 border-red-500 bg-gray-100 p-5 shadow-md dark:bg-gray-800">
                <h4 className="mb-4 flex items-center gap-2 font-semibold text-red-500 dark:text-red-400">🤔 비판적/위협 분석</h4>
                {fetcher.state === 'loading' || fetcher.state === 'submitting' ? (
                  <div className="flex min-h-[150px] items-center justify-center rounded-lg bg-gray-200/50 dark:bg-gray-800/50">
                    <p className="animate-pulse text-lg text-gray-500 dark:text-gray-400">✨ 새로운 관점을 발견하고 있어요...</p>
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
    </main>
  );
} 
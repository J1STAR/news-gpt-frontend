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
  // IT/개발
  '프론트엔드 개발자',
  '백엔드 개발자',
  '풀스택 개발자',
  'DevOps 엔지니어',
  '클라우드 엔지니어',
  '안드로이드 개발자',
  'iOS 개발자',
  '임베디드 개발자',
  '게임 개발자',
  'QA 엔지니어',
  '보안 엔지니어',
  '블록체인 개발자',
  '네트워크 엔지니어',
  '시스템 관리자',

  // 데이터
  '데이터 사이언티스트',
  '데이터 분석가',
  '데이터 엔지니어',
  '머신러닝 엔지니어',
  'AI 연구원',
  '비즈니스 인텔리전스 개발자(BI)',
  '데이터베이스 관리자(DBA)',

  // 기획/디자인
  '프로덕트 매니저(PM)',
  '프로덕트 오너(PO)',
  '서비스 기획자',
  '프로젝트 매니저',
  'UI/UX 디자이너',
  'UX 리서처',
  '그래픽 디자이너',
  '프로덕트 디자이너',
  '모션 디자이너',
  '기술 작가',

  // 마케팅/세일즈
  '디지털 마케터',
  '콘텐츠 마케터',
  '퍼포먼스 마케터',
  'CRM 마케터',
  '그로스 해커',
  'SEO 전문가',
  '브랜드 매니저',
  '영업 관리자',
  '비즈니스 개발 매니저(BDM)',
  '고객 성공 매니저(CSM)',

  // 경영/인사/재무
  '인사 담당자 (HR)',
  '채용 담당자 (Recruiter)',
  '경영 컨설턴트',
  '전략 기획자',
  '재무 분석가',
  '회계사',
  'M&A 전문가',

  // 미디어/콘텐츠
  '영상 PD',
  '기자',
  '에디터',
  '유튜버/크리에이터',
  '사운드 디자이너',

  // 기타 전문직
  '의사',
  '변호사',
  '교사',
  '작가',
  '건축가',
  '약사',
  '수의사',
  '연구원',
  '통역가/번역가',
  '요리사',
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

  // 📍 새로운 상태 변수 추가: 직무 요약 토글 상태
  const [isJobSummaryOpen, setIsJobSummaryOpen] = useState(false);

  // 📍 토글 핸들러 함수
  const toggleJobSummary = () => {
    setIsJobSummaryOpen(prev => !prev);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      const isValidJob = jobTitlesList.includes(jobTitle.trim());
      if (isValidJob) {
        setSelectedJob(jobTitle.trim());
        setIsDropdownOpen(false);
      } else {
        // 이전에 선택된 직무가 있을 경우에만 null로 설정하여 불필요한 상태 업데이트 방지
        setSelectedJob(prev => (prev ? null : prev));
      }
    }, 100);

    return () => clearTimeout(handler);
  }, [jobTitle]);

  useEffect(() => {
    // fetcher가 'idle' 상태일 때만 요청을 보내 중복/다중 요청을 방지합니다.
    if (fetcher.state !== 'idle') return;

    if (selectedJob && selectedKeyword?.keyword && selectedKeyword?.reason) {
      const formData = new FormData();
      formData.append('query', selectedJob);
      formData.append('keyword', selectedKeyword.keyword);
      formData.append('reason', selectedKeyword.reason);
      fetcher.submit(formData, { method: 'post', action: '/api/job-analysis' });
    }
  }, [selectedJob, selectedKeyword]);

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
            placeholder="'프론트엔드 개발자'를 입력 후 선택하시면 키워드를 선택하실 수 있어요!"
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

          <div className="mb-4 space-y-8">

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

          {/* 직무 요약 - 이 부분을 수정합니다! */}
            <div className="rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
              <h3
                className="mb-3 text-2xl font-semibold text-[var(--accent-color)] cursor-pointer" // cursor-pointer 추가
                onClick={toggleJobSummary} // 클릭 이벤트 추가
              >
                직무 요약: {selectedJob} {isJobSummaryOpen ? '▲' : '▼'} {/* 아이콘 추가 */}
              </h3>
              {isJobSummaryOpen && ( // isJobSummaryOpen이 true일 때만 내용 표시
                fetcher.state === 'loading' || fetcher.state === 'submitting' ? (
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
              )
              )}
            </div>
        </div>
      )}
    </main>
  );
}
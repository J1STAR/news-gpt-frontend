import type { WeeklyKeywordData, Keyword } from '~/services/industry-analysis.server';

type KeywordButtonsProps = {
  keywords: Keyword[];
  onKeywordClick: (keyword: string) => void;
  activeKeyword: string | null;
};

function KeywordButtons({ keywords, onKeywordClick, activeKeyword }: KeywordButtonsProps) {
  return (
    <div className="flex flex-wrap content-start justify-start gap-2">
      {keywords.map(kw => {
        const isActive = activeKeyword === kw.keyword;
        return (
          <button
            key={kw.keyword}
            title={kw.reason}
            className={`max-w-[140px]flex-shrink-0 cursor-pointer rounded-full px-3.5 py-2 text-sm font-medium shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-0.5 break-words ${
              isActive
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
            onClick={() => onKeywordClick(kw.keyword)}
          >
            {kw.keyword}
          </button>
        );
      })}
    </div>
  );
}

type WeeklySummaryProps = {
  weeklyKeywords: WeeklyKeywordData[];
  onKeywordClick: (keyword: string, startDate: string, endDate: string, region: 'domestic' | 'global') => void;
  activeKeyword: string | null;
};

export default function WeeklySummary({ weeklyKeywords, onKeywordClick, activeKeyword }: WeeklySummaryProps) {
  return (
    <div className="my-8 rounded-lg bg-[var(--card-light)] p-6 shadow-md dark:bg-[var(--card-dark)]">
      <h2 className="mb-3 border-gray-200 text-2xl font-bold text-[var(--accent-color)] dark:border-gray-700">주간 키워드 Top5</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
        <h2 className="mb-6 border-b-2 border-gray-200 pb-4 text-2xl font-bold text-[var(--accent-color)] dark:border-gray-700">🇰🇷 국내</h2>
        <h2 className="mb-6 border-b-2 border-gray-200 pb-4 text-2xl font-bold text-[var(--accent-color)] dark:border-gray-700">🌍 해외</h2>
      </div>

      <div className="space-y-6">
        {weeklyKeywords.map((week) => (
          <div key={week.weekLabel}>
            <h3 className="text-center font-semibold text-lg mb-4">{week.dateRangeLabel}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="rounded-lg p-4 border border-gray-200 dark:border-gray-700 h-full">
                <KeywordButtons
                  keywords={week.domestic}
                  onKeywordClick={(keyword) => onKeywordClick(keyword, week.startDate, week.endDate, 'domestic')}
                  activeKeyword={activeKeyword}
                />
              </div>
              <div className="rounded-lg p-4 border border-gray-200 dark:border-gray-700 h-full">
                <KeywordButtons
                  keywords={week.global}
                  onKeywordClick={(keyword) => onKeywordClick(keyword, week.startDate, week.endDate, 'global')}
                  activeKeyword={activeKeyword}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
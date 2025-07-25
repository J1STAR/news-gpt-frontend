import type { WeeklyKeywordData, Keyword } from '~/services/industry-analysis.server';

type WeekSectionProps = {
  dateRangeLabel: string;
  startDate: string;
  endDate: string;
  keywords: Keyword[];
  region: 'domestic' | 'global';
  onKeywordClick: (keyword: string, startDate: string, endDate: string, region: 'domestic' | 'global') => void;
  activeKeyword: string | null;
};

function WeekSection({ dateRangeLabel, startDate, endDate, keywords, region, onKeywordClick, activeKeyword }: WeekSectionProps) {
  return (
    <div className="mb-6 rounded-lg bg-[var(--card-light)] p-6 shadow-md dark:bg-[var(--card-dark)]">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold">{dateRangeLabel}</h3>
      </div>
      <div className="flex flex-wrap content-start justify-start gap-2">
        {keywords.map(kw => {
          const isActive = activeKeyword === kw.keyword;
          return (
            <button
              key={kw.keyword}
              title={kw.reason}
              className={`flex-shrink-0 cursor-pointer rounded-full px-3.5 py-2 text-sm font-medium shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-0.5 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
              data-region={region}
              onClick={() => {
                onKeywordClick(kw.keyword, startDate, endDate, region);
              }}
            >
              {kw.keyword}
            </button>
          );
        })}
      </div>
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
      <div className="flex flex-col gap-10 md:flex-row md:gap-10">
        <div className="flex-1">
          <h2 className="mb-6 border-b-2 border-gray-200 pb-4 text-2xl font-bold text-[var(--accent-color)] dark:border-gray-700">🇰🇷 국내 주간 키워드 Top5</h2>
          {weeklyKeywords.map(week => (
            <WeekSection
              key={`domestic-${week.weekLabel}`}
              {...week}
              keywords={week.domestic}
              region="domestic"
              onKeywordClick={onKeywordClick}
              activeKeyword={activeKeyword}
            />
          ))}
        </div>
        <div className="flex-1">
          <h2 className="mb-6 border-b-2 border-gray-200 pb-4 text-2xl font-bold text-[var(--accent-color)] dark:border-gray-700">🌍 해외 주간 키워드 Top5</h2>
          {weeklyKeywords.map(week => (
            <WeekSection
              key={`global-${week.weekLabel}`}
              {...week}
              keywords={week.global}
              region="global"
              onKeywordClick={onKeywordClick}
              activeKeyword={activeKeyword}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 
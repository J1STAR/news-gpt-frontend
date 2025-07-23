import type { WeeklyKeywordData, Keyword } from '~/services/analysis.server';

type WeekSectionProps = {
  weekLabel: string;
  dateRangeLabel: string;
  startDate: string;
  endDate: string;
  keywords: Keyword[];
  region: 'domestic' | 'global';
  onKeywordClick: (keyword: string, startDate: string, endDate: string, region: 'domestic' | 'global') => void;
};

function WeekSection({ dateRangeLabel, startDate, endDate, keywords, region, onKeywordClick }: WeekSectionProps) {
  return (
    <div className="mb-10 rounded-xl border border-gray-700 bg-gray-800 p-5 last:mb-0">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">{dateRangeLabel}</h3>
      </div>
      <div className="flex flex-wrap content-start justify-start gap-2">
        {keywords.map(kw => (
          <button
            key={kw.keyword}
            className="flex-shrink-0 cursor-pointer rounded-full border border-gray-600 bg-gray-700 px-3.5 py-2 text-sm font-medium text-gray-300 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-blue-600 hover:text-white hover:shadow-blue-500/50 focus:bg-blue-600 focus:text-white"
            data-region={region} onClick={() => {
            onKeywordClick(kw.keyword, startDate, endDate, region);
          }}>
            {kw.keyword}
          </button>
        ))}
      </div>
    </div>
  );
}

type WeeklySummaryProps = {
    weeklyKeywords: WeeklyKeywordData[];
    onKeywordClick: (keyword: string, startDate: string, endDate: string, region: 'domestic' | 'global') => void;
};

export default function WeeklySummary({ weeklyKeywords, onKeywordClick }: WeeklySummaryProps) {
  return (
    <div className="my-8 rounded-2xl border border-gray-700 bg-gray-800/50 p-10 shadow-2xl">
      <div className="flex flex-col gap-10 md:flex-row md:gap-10">
        <div className="flex-1">
          <h2 className="mb-6 border-b-2 border-gray-700 pb-4 text-2xl font-bold text-blue-400">🇰🇷 국내 주간 키워드 Top5</h2>
          {weeklyKeywords.map(week => (
            <WeekSection 
                key={`domestic-${week.weekLabel}`} 
                {...week} 
                keywords={week.domestic} 
                region="domestic" 
                onKeywordClick={onKeywordClick}
            />
          ))}
        </div>
        <div className="flex-1">
          <h2 className="mb-6 border-b-2 border-gray-700 pb-4 text-2xl font-bold text-red-400">🌍 해외 주간 키워드 Top5</h2>
          {weeklyKeywords.map(week => (
            <WeekSection 
                key={`global-${week.weekLabel}`} 
                {...week} 
                keywords={week.global} 
                region="global" 
                onKeywordClick={onKeywordClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 
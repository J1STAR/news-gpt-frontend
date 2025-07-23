import { useState } from 'react';
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
    <div className="week-section">
      <div className="week-header">
        <h3 className="week-title">{dateRangeLabel}</h3>
      </div>
      <div className="keywords-container">
        {keywords.map(kw => (
          <button key={kw.keyword} className={`keyword-tag`} data-region={region} onClick={() => {
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
    <div className="weekly-summary">
      <div className="summary-container">
        <div className="summary-half">
          <h2 className="summary-title domestic">🇰🇷 국내 주간 키워드 Top5</h2>
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
        <div className="summary-half">
          <h2 className="summary-title global">🌍 해외 주간 키워드 Top5</h2>
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
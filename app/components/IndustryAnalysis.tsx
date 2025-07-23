import { useFetcher } from '@remix-run/react';
import { useState, useEffect } from 'react';
import { marked } from 'marked';

type AnalysisData = {
  analysis: string;
  counter_analysis: string;
};

type IndustryAnalysisProps = {
  selectedKeyword: string | null;
  onIndustryClick: (industry: string) => void;
};

export default function IndustryAnalysis({ selectedKeyword, onIndustryClick }: IndustryAnalysisProps) {
  const fetcher = useFetcher<AnalysisData>();
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
  }, [fetcher, selectedKeyword, activeIndustry]);

  return (
    <div className="industry-analysis">
      <h2 className="section-title">이런 시각은 어때요?</h2>
      <div className="industry-tabs">
        {industries.map(industry => (
          <button 
            key={industry} 
            className={`industry-tab ${activeIndustry === industry ? 'active' : ''}`} 
            onClick={() => {
              setActiveIndustry(industry);
              onIndustryClick(industry);
            }}
          >
            {industry}
          </button>
        ))}
      </div>
      <div className="analysis-content">
        {fetcher.state === 'loading' ? (
          <div className="loading">🤔 다양한 관점에서 분석 중...</div>
        ) : fetcher.data ? (
          <div className="analysis-grid">
            <div className="analysis-section">
              <div className="analysis-title">
                  <span style={{ color: '#667eea' }}>👍</span>
                  긍정적/일반 분석
              </div>
              <div style={{ lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: marked.parse(fetcher.data.analysis || '긍정적 분석을 생성할 수 없습니다.') }} />
            </div>
            <div className="counter-analysis-section">
                <div className="counter-title">
                    <span style={{ color: '#e74c3c' }}>🤔</span>
                    비판적/회의적 분석
                </div>
                <div style={{ lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: marked.parse(fetcher.data.counter_analysis || '비판적 분석을 생성할 수 없습니다.') }} />
            </div>
          </div>
        ) : (
          <div className="loading">분석할 키워드를 선택해주세요</div>
        )}
      </div>
    </div>
  );
} 
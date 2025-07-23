import { Link } from "@remix-run/react";

type DetailSidebarProps = {
  aiInsight: string;
  trendData: { label: string; value: number; percentage: number }[];
  relatedNews: { keyword: string; title: string; thumbnail: string }[];
};

export default function DetailSidebar({ aiInsight, trendData, relatedNews }: DetailSidebarProps) {
  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <div className="insight-card">
          <div className="insight-header">
            <span>🤖</span>
            <div className="insight-title">AI 인사이트</div>
          </div>
          <div className="insight-content">{aiInsight}</div>
        </div>
      </div>
      <div className="sidebar-section">
        <div className="stats-chart">
          <div className="chart-title">📊 키워드 트렌드</div>
          <div id="trendChart">
            {trendData.map(item => (
              <div key={item.label} className="chart-bar">
                <div className="chart-label">{item.label}</div>
                <div className="chart-progress">
                    <div className="chart-fill" style={{ width: `${item.percentage}%` }}></div>
                </div>
                <div className="chart-value">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="sidebar-section">
        <div className="sidebar-title">관련 뉴스</div>
        <div className="related-news">
          {relatedNews.map(item => (
            <Link key={item.keyword} to={`/news-detail/${item.keyword}`} className="related-item">
              <div className="related-thumbnail">{item.thumbnail}</div>
              <div className="related-info">
                <div className="related-title">{item.title}</div>
                <div className="related-meta">AI News Analyzer</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 
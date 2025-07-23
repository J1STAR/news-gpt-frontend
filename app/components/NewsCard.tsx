import { Link } from "@remix-run/react";

type NewsCardProps = {
  id: number;
  title: string;
  keyword: string;
  count: number;
  category: string;
  insight: string;
  thumbnail: string;
  publishedAt: string;
  region?: string;
};

export default function NewsCard({
  title,
  keyword,
  count,
  publishedAt,
  insight,
  thumbnail,
  region
}: NewsCardProps) {
  const detailUrl = region === 'global'
    ? `/news-detail?keyword=${encodeURIComponent(keyword)}&region=global`
    : `/news-detail?keyword=${encodeURIComponent(keyword)}`;

  return (
    <Link to={detailUrl} className="news-card">
      <div className="news-thumbnail">
        <div className="thumbnail-icon">{thumbnail}</div>
      </div>
      <div className="news-content">
        <div className="news-title">{title}</div>
        <div className="news-meta">
          <span>📊 {count}건</span>
          <span>•</span>
          <span>{publishedAt}</span>
          {region === 'global' && '• 🌍 해외'}
        </div>
        <div className="news-insight">
          <div className="insight-label">AI 인사이트</div>
          {insight}
        </div>
      </div>
    </Link>
  );
} 
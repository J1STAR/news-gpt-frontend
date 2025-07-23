import type { Article } from "~/services/news.server";

type VideoInfoProps = {
  keyword: string;
  articles: Article[];
};

export default function VideoInfo({ keyword, articles }: VideoInfoProps) {
  return (
    <div className="video-info">
      <h1 className="video-title" id="mainTitle">{keyword} 뉴스 분석 리포트</h1>
      <div className="video-meta">
        <div className="video-stats">
          <span id="viewCount">조회수 {articles.length * 47}회</span>
          <span>•</span>
          <span id="publishDate">2025년 7월 21일</span>
        </div>
        <div className="video-actions">
          <button className="action-btn"><span>👍</span><span id="likeCount">42</span></button>
          <button className="action-btn"><span>📤</span><span>공유</span></button>
          <button className="action-btn"><span>💾</span><span>저장</span></button>
        </div>
      </div>
      <div className="channel-info">
        <div className="channel-avatar">🤖</div>
        <div className="channel-details">
          <div className="channel-name">AI News Analyzer</div>
          <div className="channel-subscribers">구독자 12.5만명</div>
        </div>
        <button className="subscribe-channel-btn">구독</button>
      </div>
      <div className="keyword-tags" id="keywordTags">
        {/* Keyword tags will be rendered here */}
      </div>
      <div className="description">
        <div className="description-content" id="descriptionContent">
          <h3>{keyword} 뉴스 분석 리포트</h3>
          <p>총 {articles.length}건의 관련 기사를 AI가 분석했습니다.</p>
          <div className="news-cards-grid">
            {articles.map((article, index) => (
              <a key={index} href={article.url} target="_blank" rel="noopener noreferrer" className="news-card-item">
                <div className="news-card-number">{index + 1}</div>
                <div className="news-card-title">{article.title}</div>
                <div className="news-card-summary">{article.summary}</div>
              </a>
            ))}
          </div>
        </div>
        <div className="show-more">더보기</div>
      </div>
    </div>
  );
} 
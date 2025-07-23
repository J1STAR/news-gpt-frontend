type Article = {
  title: string;
  summary: string;
  url: string;
  date: string;
};

type ArticleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  keyword: string | null;
  articles: Article[];
};

export default function ArticleModal({ isOpen, onClose, keyword, articles }: ArticleModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal" id="article-modal" style={{ display: 'block' }}>
      <div className="modal-content">
        <div className="modal-header">
          <h3 id="modal-title">{keyword} 관련 기사</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div id="modal-articles">
          {articles.length > 0 ? (
            <div className="articles-grid">
              {articles.map((article, index) => (
                <a key={index} href={article.url} target="_blank" rel="noopener noreferrer" className="article-card">
                  <div className="article-date">{article.date}</div>
                  <div className="article-title">{article.title}</div>
                  <div className="article-summary">{article.summary}</div>
                </a>
              ))}
            </div>
          ) : (
            <p>관련 기사를 찾을 수 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
} 
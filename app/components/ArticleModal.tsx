import type { Article } from "~/services/news.server";
import { useEffect, useRef } from 'react';

type ArticleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  keyword: string | null;
  articles: Article[];
  isLoading: boolean;
};

export default function ArticleModal({ isOpen, onClose, keyword, articles, isLoading }: ArticleModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleBackdropClick = (event: globalThis.MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleBackdropClick);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleBackdropClick);
    };
  }, [isOpen, onClose]);


  if (!isOpen) return null;

  return (
    <div 
        className="modal" 
        id="article-modal" 
        style={{ display: 'block' }}
    >
      <div className="modal-content" ref={modalRef}>
        <div className="modal-header">
          <h3 id="modal-title">{keyword} 관련 기사</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div id="modal-articles" className="modal-articles-scroll">
            {isLoading ? (
                 <div style={{ textAlign: 'center', padding: '40px' }}>
                    <div className="typing-dots" style={{ fontSize: '18px', color: '#5A7DBC' }}>
                        ⚡ 최신 기사를 검색 중...
                    </div>
                 </div>
            ) : articles.length > 0 ? (
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
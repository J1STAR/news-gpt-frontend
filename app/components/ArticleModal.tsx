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
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm"
      id="article-modal"
    >
      <div
        className="relative flex h-auto max-h-[80vh] w-11/12 max-w-3xl flex-col rounded-2xl border border-gray-700 bg-gray-800 p-7 shadow-2xl"
        ref={modalRef}
      >
        <div className="mb-5 flex items-center justify-between border-b-2 border-gray-700 pb-4">
          <h3 id="modal-title" className="text-xl font-bold text-white">{keyword} 관련 기사</h3>
          <button className="text-3xl text-gray-400 transition-colors hover:text-white" onClick={onClose}>&times;</button>
        </div>
        <div id="modal-articles" className="overflow-y-auto pr-2">
            {isLoading ? (
                 <div className="flex justify-center p-10">
                    <div className="text-lg font-semibold text-blue-400">
                        ⚡ 최신 기사를 검색 중...
                    </div>
                 </div>
            ) : articles.length > 0 ? (
                <div className="grid gap-5">
                {articles.map((article, index) => (
                    <a
                      key={index}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block rounded-xl border-l-4 border-blue-600 bg-gray-700 p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-teal-400 hover:bg-gray-600/70 hover:shadow-lg"
                    >
                      <div className="text-xs text-gray-400 group-hover:text-teal-300">{article.date}</div>
                      <div className="mb-2 font-semibold text-white group-hover:text-teal-200">{article.title}</div>
                      <p className="text-sm text-gray-300">{article.summary}</p>
                    </a>
                ))}
                </div>
            ) : (
                <p className="py-10 text-center text-gray-400">관련 기사를 찾을 수 없습니다.</p>
            )}
        </div>
      </div>
    </div>
  );
} 
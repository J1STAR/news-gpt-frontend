import { Info } from "lucide-react";
import { marked } from "marked";

interface JobSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string | null;
  isLoading: boolean;
  summary?: string;
}

export default function JobSummaryModal({
  isOpen,
  onClose,
  jobTitle,
  isLoading,
  summary,
}: JobSummaryModalProps) {
  if (!isOpen) return null;

  // 바깥 영역 클릭 시 닫힘
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  // esc키 닫기 (접근성)
  // useEffect 사용 불필요, 상위에서만 쓰는 경우 생략 가능

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={handleBackgroundClick}
    >
      <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-8 max-w-lg w-full">
        <button
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
          aria-label="닫기"
        >✕</button>
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-6 h-6 text-blue-500" />
          <h3 className="text-lg font-bold text-blue-500">
            {jobTitle} 직무 요약
          </h3>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <span className="animate-pulse text-gray-400">🤔 AI가 직무의 핵심을 파악하고 있어요...</span>
          </div>
        ) : (
          summary ? (
            <div
              className="prose prose-invert max-w-none prose-p:my-2"
              dangerouslySetInnerHTML={{ __html: marked.parse(summary) }}
            />
          ) : (
            <p className="text-gray-400">요약 데이터가 없습니다.</p>
          )
        )}
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';

type TermsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void;
};

export default function TermsModal({ isOpen, onClose, onAgree }: TermsModalProps) {
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) setScrolledToBottom(false); // 모달 열릴 때 초기화
  }, [isOpen]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5;
    if (atBottom) setScrolledToBottom(true);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">🛡 이용약관</h2>

        {/* 🔍 약관 스크롤 영역 */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="h-[300px] overflow-y-auto text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-4 pr-2"
        >
          <p>
            본 서비스(이하 ‘시소’)는 다양한 뉴스 데이터를 기반으로 GPT 기반 AI 분석 결과 및 키워드 중심 견해를 제공합니다.
            사용자는 아래 내용을 충분히 숙지하고 동의한 뒤 서비스를 이용해주시기 바랍니다.
          </p>

          <h3 className="font-semibold">1. 서비스의 성격</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>시소는 다양한 국내·외 뉴스 및 오픈소스 데이터를 바탕으로 AI가 분석한 키워드, 인사이트, 직무 기반 해석을 제공합니다.</li>
            <li>이러한 정보는 단순 참고용이며, 사실의 단정이나 특정 견해의 정답을 제시하지 않습니다.</li>
            <li>최종 판단과 선택의 책임은 전적으로 사용자에게 있습니다.</li>
          </ul>

          <h3 className="font-semibold">2. 데이터 및 AI 응답의 한계</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>뉴스 데이터는 RSS, API, 오픈웹 등 외부 소스를 기반으로 하며, 일부 정보는 오류·지연·누락이 있을 수 있습니다.</li>
            <li>AI의 응답은 최신 정보와 불일치할 수 있으며, 특정 기사나 사실을 대표하지 않습니다.</li>
          </ul>

          <h3 className="font-semibold">3. 책임 있는 인공지능 사용 원칙 (4대 원칙)</h3>
          <ol className="list-decimal list-inside space-y-1">
            <li><strong>투명성</strong>: AI의 역할과 한계를 명확히 알리고, 분석 근거를 가능한 한 제공합니다.</li>
            <li><strong>공정성</strong>: 다양한 시각과 균형 잡힌 견해를 제공하며, 편향되지 않도록 노력합니다.</li>
            <li><strong>안전성</strong>: 부정확하거나 오해 소지가 있는 응답을 방지하기 위해 지속적으로 개선합니다.</li>
            <li><strong>사용자 중심성</strong>: 사용자의 선택권을 존중하며, AI는 조력자에 불과함을 명시합니다.</li>
          </ol>

          <h3 className="font-semibold">4. 기타 유의사항</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>서비스 개선을 위해 사용자 활동 기록(예: 검색, 클릭 등)은 비식별화되어 분석될 수 있습니다.</li>
            <li>AI 생성 콘텐츠를 외부에 활용하거나 인용할 경우, 출처 표기를 권장합니다.</li>
            <li>법적, 의료적, 재정적 판단이 필요한 사안은 반드시 전문가의 조언을 따르시기 바랍니다.</li>
          </ul>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            📍 문의: support@siso.ai<br />
            📅 최종 수정일: 2025.07.29
          </p>
        </div>

        {/* ✅ 버튼 영역 */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            취소
          </button>
          <button
            onClick={onAgree}
            disabled={!scrolledToBottom}
            className={`px-4 py-2 rounded-lg text-white transition-colors ${
              scrolledToBottom ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            동의하고 닫기
          </button>
        </div>
      </div>
    </div>
  );
}

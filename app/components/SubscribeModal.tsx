type SubscribeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
      <div className="relative w-full max-w-md rounded-lg bg-[var(--card-light)] p-8 shadow-xl dark:bg-[var(--card-dark)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">📧 뉴스레터 구독</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          매주 AI가 분석한 뉴스 인사이트를 이메일로 받아보세요!
        </p>

        <form className="flex flex-col gap-4">
          <input
            type="email"
            className="w-full rounded-lg border-2 border-gray-300 bg-white p-3 text-base text-gray-900 focus:border-[var(--accent-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]/50 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="이메일 주소를 입력하세요"
            required
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-[var(--accent-color)] py-3 text-base font-medium text-white transition-colors hover:bg-blue-600"
          >
            구독하기
          </button>
        </form>

        {/* These messages can be conditionally rendered based on form state */}
        {/* <div className="mt-4 rounded-md bg-green-100 p-3 text-center text-green-800 dark:bg-green-900/50 dark:text-green-300">
          ✅ 구독이 완료되었습니다! 매주 인사이트를 받아보세요.
        </div>
        <div className="mt-4 rounded-md bg-red-100 p-3 text-center text-red-800 dark:bg-red-900/50 dark:text-red-300">
          ❌ 구독 중 오류가 발생했습니다. 다시 시도해주세요.
        </div> */}
      </div>
    </div>
  );
} 
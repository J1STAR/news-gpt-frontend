// type SubscribeModalProps = {
//   isOpen: boolean;
//   onClose: () => void;
// };

// export default function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
//       <div className="relative w-full max-w-md rounded-lg bg-[var(--card-light)] p-8 shadow-xl dark:bg-[var(--card-dark)]">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
//         >
//           &times;
//         </button>
//         <h2 className="text-2xl font-bold mb-4">📧 뉴스레터 구독</h2>
//         <p className="mb-6 text-gray-600 dark:text-gray-400">
//           매주 AI가 분석한 뉴스 인사이트를 이메일로 받아보세요!
//         </p>

//         <form className="flex flex-col gap-4">
//           <input
//             type="email"
//             className="w-full rounded-lg border-2 border-gray-300 bg-white p-3 text-base text-gray-900 focus:border-[var(--accent-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]/50 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
//             placeholder="이메일 주소를 입력하세요"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full rounded-lg bg-[var(--accent-color)] py-3 text-base font-medium text-white transition-colors hover:bg-blue-600"
//           >
//             구독하기
//           </button>
//         </form>

//         {/* These messages can be conditionally rendered based on form state */}
//         {/* <div className="mt-4 rounded-md bg-green-100 p-3 text-center text-green-800 dark:bg-green-900/50 dark:text-green-300">
//           ✅ 구독이 완료되었습니다! 매주 인사이트를 받아보세요.
//         </div>
//         <div className="mt-4 rounded-md bg-red-100 p-3 text-center text-red-800 dark:bg-red-900/50 dark:text-red-300">
//           ❌ 구독 중 오류가 발생했습니다. 다시 시도해주세요.
//         </div> */}
//       </div>
//     </div>
//   );
// }

// import { useState } from 'react';
// import TermsModal from './TermsModal'; // 이용약관 모달 컴포넌트

// type SubscribeModalProps = {
//   isOpen: boolean;
//   onClose: () => void;
// };

// export default function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
//   const [email, setEmail] = useState('');
//   const [agreed, setAgreed] = useState(false);
//   const [termsOpen, setTermsOpen] = useState(false);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
//       <div className="relative w-full max-w-md rounded-lg bg-[var(--card-light)] p-8 shadow-xl dark:bg-[var(--card-dark)]">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
//         >
//           &times;
//         </button>

//         <h2 className="text-2xl font-bold mb-4">📧 뉴스레터 구독</h2>
//         <p className="mb-6 text-gray-600 dark:text-gray-400">
//           매주 AI가 분석한 뉴스 인사이트를 이메일로 받아보세요!
//         </p>

//         <form
//           className="flex flex-col gap-4"
//           onSubmit={(e) => {
//             e.preventDefault();
//             if (!agreed) return;
//             console.log('✅ 구독 요청 이메일:', email);
//             // 여기에 구독 API 연동 로직 추가
//             onClose(); // 닫기
//           }}
//         >
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full rounded-lg border-2 border-gray-300 bg-white p-3 text-base text-gray-900 focus:border-[var(--accent-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]/50 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
//             placeholder="이메일 주소를 입력하세요"
//             required
//           />

//           {/* 약관 동의 체크 */}
//           <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
//             <input
//               type="checkbox"
//               id="agree"
//               checked={agreed}
//               onChange={(e) => setAgreed(e.target.checked)}
//               className="mt-1"
//             />
//             <label htmlFor="agree">
//               <span className="mr-1">아래</span>
//               <button
//                 type="button"
//                 className="underline text-blue-600 hover:text-blue-800"
//                 onClick={() => setTermsOpen(true)}
//               >
//                 이용약관
//               </button>
//               에 동의합니다.
//             </label>
//           </div>

//           <button
//             type="submit"
//             disabled={!agreed}
//             className={`w-full rounded-lg py-3 text-base font-medium text-white transition-colors ${
//               agreed ? 'bg-[var(--accent-color)] hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
//             }`}
//           >
//             구독하기
//           </button>
//         </form>

//         {/* 약관 모달 */}
//         <TermsModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} />
//       </div>
//     </div>
//   );
// }






import { useState } from 'react';
import TermsModal from './TermsModal';

type SubscribeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity"
      onClick={onClose} // ✅ 배경 클릭 시 모달 닫힘
    >
      <div
        className="relative w-full max-w-md rounded-lg bg-[var(--card-light)] p-8 shadow-xl dark:bg-[var(--card-dark)]"
        onClick={(e) => e.stopPropagation()} // ✅ 내부 클릭은 닫힘 방지
      >
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

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!agreed) return;
            console.log('✅ 구독 요청 이메일:', email);
            onClose();
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border-2 border-gray-300 bg-white p-3 text-base text-gray-900 focus:border-[var(--accent-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]/50 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="이메일 주소를 입력하세요"
            required
          />

          <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              readOnly
              onClick={() => setTermsOpen(true)} // ✅ 체크 대신 약관 모달 열기
              className="mt-1 cursor-pointer"
            />
            <label htmlFor="agree" onClick={() => setTermsOpen(true)} className="cursor-pointer">
              <span className="mr-1">아래</span>
              <span className="underline text-blue-600 hover:text-blue-800">이용약관</span>
              에 동의합니다.
            </label>
          </div>

          <button
            type="submit"
            disabled={!agreed}
            className={`w-full rounded-lg py-3 text-base font-medium text-white transition-colors ${
              agreed ? 'bg-[var(--accent-color)] hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            구독하기
          </button>
        </form>

        {/* 약관 모달 */}
        <TermsModal
          isOpen={termsOpen}
          onClose={() => setTermsOpen(false)}
          onAgree={() => {
            setAgreed(true);
            setTermsOpen(false);
          }}
        />
      </div>
    </div>
  );
}

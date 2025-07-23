import { Link } from "@remix-run/react";

type HeaderProps = {
  onSubscribeClick: () => void;
};

export default function Header({ onSubscribeClick }: HeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-700 bg-gray-900 px-8 py-4 text-white">
      <div className="flex items-center">
        <Link to="/" className="flex items-center font-bold text-white no-underline">
          <span style={{ fontSize: '24px' }}>📺</span>
          <h1 className="ml-2 text-2xl">NewsGPT</h1>
        </Link>
      </div>

      <div className="header-actions">
        <button
          className="cursor-pointer rounded-full border-none bg-gradient-to-tr from-[#00D9C0] to-[#00B8A9] px-6 py-3 text-base font-medium text-white shadow-[0_4px_15px_rgba(0,217,192,0.3)] transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,217,192,0.4)]"
          onClick={onSubscribeClick}
        >
          📧 구독하기
        </button>
      </div>
    </div>
  );
}
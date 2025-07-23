import { Link } from "@remix-run/react";

type HeaderProps = {
  onSubscribeClick: () => void;
};

export default function Header({ onSubscribeClick }: HeaderProps) {
  return (
    <div className="header">
      <div className="logo-section">
        <Link to="/" className="logo">
          <span style={{ fontSize: '24px' }}>📺</span>
          <h1>NewsGPT</h1>
        </Link>
      </div>

      <div className="header-actions">
        <button className="subscribe-btn" onClick={onSubscribeClick}>
          📧 구독하기
        </button>
      </div>
    </div>
  );
}
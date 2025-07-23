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
          <h1>News TUBE GPT v2</h1>
        </Link>
      </div>

      <div className="search-container">
        <div className="search-box">
          <input type="text" className="search-input" placeholder="뉴스 키워드 검색..." id="searchInput" />
          <button className="search-btn">
            <span>🔍</span>
          </button>
        </div>
      </div>

      <div className="header-actions">
        <button className="subscribe-btn" onClick={onSubscribeClick}>
          📧 구독하기
        </button>
      </div>
    </div>
  );
} 
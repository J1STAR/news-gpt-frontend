import { Link } from "@remix-run/react";

type SidebarProps = {
  activeCategory: string;
};

export default function Sidebar({ activeCategory }: SidebarProps) {
  const categories = [
    { name: 'all', label: '전체', icon: '🏠' },
    { name: 'domestic', label: '국내 뉴스', icon: '📰' },
    { name: 'global', label: '해외 뉴스', icon: '🌍' },
    { name: 'tech', label: '기술 트렌드', icon: '💻' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-title">카테고리</div>
        {categories.map(cat => (
          <Link to={`/?category=${cat.name}`} key={cat.name} className={`sidebar-item ${activeCategory === cat.name ? 'active' : ''}`}>
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </Link>
        ))}
      </div>

      <div className="sidebar-section">
        <div className="sidebar-title">분석 도구</div>
        <Link to="/analysis" className="sidebar-item">
          <span>🔍</span>
          <span>상세 분석</span>
        </Link>
        <div className="sidebar-item">
          <span>💡</span>
          <span>AI 인사이트</span>
        </div>
      </div>
    </div>
  );
} 
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

  const getLinkClassName = (isActive: boolean) =>
    `flex flex-col items-center justify-center rounded-lg p-2 text-center transition-colors duration-200 mb-1 ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-300 hover:bg-gray-700'
    }`;

  return (
    <div className="sticky top-20 h-fit w-20 rounded-xl bg-gray-800 p-2">
      <div className="mb-4">
        <div className="mb-2 text-center text-xs font-medium uppercase text-gray-500">카테고리</div>
        {categories.map(cat => (
          <Link
            to={`/?category=${cat.name}`}
            key={cat.name}
            className={getLinkClassName(activeCategory === cat.name)}
          >
            <span className="block text-xl mb-1">{cat.icon}</span>
            <span className="text-xs leading-tight">{cat.label}</span>
          </Link>
        ))}
      </div>

      <div className="mb-4">
        <div className="mb-2 text-center text-xs font-medium uppercase text-gray-500">분석 도구</div>
        <Link to="/analysis" className={getLinkClassName(false)}>
          <span className="block text-xl mb-1">🔍</span>
          <span className="text-xs leading-tight">상세 분석</span>
        </Link>
        <div className={getLinkClassName(false) + " cursor-pointer"}>
          <span className="block text-xl mb-1">💡</span>
          <span className="text-xs leading-tight">AI 인사이트</span>
        </div>
      </div>
    </div>
  );
} 
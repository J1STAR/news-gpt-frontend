import { NavLink } from '@remix-run/react';

export default function Navigation() {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `mx-2 rounded-lg px-6 py-3 font-medium no-underline transition-colors duration-300 ${
      isActive
        ? 'bg-[#00D9C0] font-bold text-gray-900'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  return (
    <nav className="flex flex-row justify-center border-b border-gray-700 bg-gray-900 py-2">
      <div className="flex items-center justify-center">
        <NavLink to="/trending" className={navLinkClasses}>
          트렌드
        </NavLink>
      </div>

      <div className="flex items-center justify-center">
        <NavLink to="/analysis" className={navLinkClasses}>
          산업 분석
        </NavLink>
      </div>
    </nav>
  );
} 
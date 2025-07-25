import { Link, NavLink } from "@remix-run/react";
import { useState, useEffect } from "react";

type HeaderProps = {
  onSubscribeClick: () => void;
};

export default function Header({ onSubscribeClick }: HeaderProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme from document
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive
        ? 'text-[var(--accent-color)]'
        : 'hover:text-[var(--accent-color)]'
    }`;
    
  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--card-light)] dark:bg-[var(--card-dark)] shadow-md transition-colors duration-300">
      <div className="container mx-auto flex items-center justify-between whitespace-nowrap px-6 py-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3 text-2xl font-bold text-[var(--accent-color)]">
            <span style={{ fontSize: '24px' }}>📺</span>
            <h1 className="ml-2 text-2xl">NewsGPT</h1>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/trending" className={navLinkClasses}>
              Trend
            </NavLink>
            <NavLink to="/industry-analysis" className={navLinkClasses}>
              산업 분석
            </NavLink>
            <NavLink to="/job-analysis" className={navLinkClasses}>
              직무 분석
            </NavLink>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button
            title="Toggle Theme"
            className="theme-toggle relative flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={toggleTheme}
          >
            <svg className="sun-icon size-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ transform: isDark ? 'rotate(90deg) scale(0)' : 'rotate(0) scale(1)', opacity: isDark ? 0 : 1, transition: 'transform 0.3s ease, opacity 0.3s ease' }}>
              <path d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-.386l1.591-1.591M3 12h2.25m.386-6.364l1.591 1.591M12 9a3 3 0 100 6 3 3 0 000-6z" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <svg className="moon-icon size-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', transform: isDark ? 'rotate(0) scale(1)' : 'rotate(-90deg) scale(0)', opacity: isDark ? 1 : 0, transition: 'transform 0.3s ease, opacity 0.3s ease' }}>
              <path d="M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
          <div className="header-actions">
            <button
              className="rounded-full bg-[var(--accent-color)] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
              onClick={onSubscribeClick}
            >
              구독하기
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
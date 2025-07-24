export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--card-light)] dark:bg-[var(--card-dark)] shadow-md transition-colors duration-300">
      <div className="container mx-auto flex items-center justify-between whitespace-nowrap px-6 py-4">
        <div className="flex items-center gap-8">
          <a className="flex items-center gap-3 text-2xl font-bold text-[var(--accent-color)]" href="/">
            <img src="/logo.png" alt="See-Saw Logo" className="size-8" />
            <span>See-Saw</span>
          </a>
          <nav className="hidden md:flex items-center gap-6">
            <a className="text-sm font-medium hover:text-[var(--accent-color)] transition-colors" href="/">홈</a>
            <a className="text-sm font-medium hover:text-[var(--accent-color)] transition-colors" href="/trending">트렌딩</a>
            <a className="text-sm font-medium hover:text-[var(--accent-color)] transition-colors" href="/latest">최신</a>
            <a className="text-sm font-medium hover:text-[var(--accent-color)] transition-colors" href="/topics">토픽</a>
            <a className="text-sm font-medium hover:text-[var(--accent-color)] transition-colors" href="/bookmarks">북마크</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="size-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </div>
            <input className="block w-full rounded-lg border-none bg-gray-100 dark:bg-gray-800 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] focus:ring-opacity-50" placeholder="검색..." type="search" />
          </div>
          <button className="theme-toggle relative flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={() => document.documentElement.classList.toggle('dark')}>
            <svg className="sun-icon size-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-.386l1.591-1.591M3 12h2.25m.386-6.364l1.591 1.591M12 9a3 3 0 100 6 3 3 0 000-6z" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <svg className="moon-icon size-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
          <button className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <svg className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
          <div className="size-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm cursor-pointer hover:shadow-lg transition-shadow">
            U
          </div>
        </div>
      </div>
    </header>
  );
}
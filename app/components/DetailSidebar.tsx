import { Link } from "@remix-run/react";

type DetailSidebarProps = {
  aiInsight: string;
  trendData: { label: string; value: number; percentage: number }[];
  relatedNews: { keyword: string; title: string; thumbnail: string }[];
};

export default function DetailSidebar({ aiInsight, trendData, relatedNews }: DetailSidebarProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-[var(--card-light)] p-4 shadow-md dark:bg-[var(--card-dark)]">
        <div className="flex items-center gap-2 font-bold mb-2">
          <span>🤖</span>
          <span>AI 인사이트</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{aiInsight}</p>
      </div>

      <div className="rounded-lg bg-[var(--card-light)] p-4 shadow-md dark:bg-[var(--card-dark)]">
        <div className="font-bold mb-2">📊 키워드 트렌드</div>
        <div className="space-y-2">
          {trendData.map(item => (
            <div key={item.label} className="flex items-center gap-2 text-sm">
              <div className="w-20 text-gray-600 dark:text-gray-400">{item.label}</div>
              <div className="flex-1 rounded-full bg-gray-200 dark:bg-gray-700">
                <div className="rounded-full bg-blue-500 py-1 text-center text-xs font-medium leading-none text-white" style={{ width: `${item.percentage}%` }}></div>
              </div>
              <div className="w-10 text-right text-gray-600 dark:text-gray-400">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-[var(--card-light)] p-4 shadow-md dark:bg-[var(--card-dark)]">
        <div className="font-bold mb-2">관련 뉴스</div>
        <div className="space-y-3">
          {relatedNews.map(item => (
            <Link key={item.keyword} to={`/news-detail/${item.keyword}`} className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-200 text-2xl dark:bg-gray-700">{item.thumbnail}</div>
              <div>
                <div className="font-bold">{item.title}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">AI News Analyzer</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 
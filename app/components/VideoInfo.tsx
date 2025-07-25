import type { Article } from "~/services/news.server";

type VideoInfoProps = {
  keyword: string;
  articles: Article[];
};

export default function VideoInfo({ keyword, articles }: VideoInfoProps) {
  return (
    <div className="text-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-2">{keyword} 뉴스 분석 리포트</h1>
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <div>
          <span>조회수 {articles.length * 47}회</span>
          <span className="mx-2">•</span>
          <span>2025년 7월 21일</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1.5 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">
            <span>👍</span>
            <span>42</span>
          </button>
          <button className="flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1.5 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">
            <span>📤</span>
            <span>공유</span>
          </button>
          <button className="flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1.5 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">
            <span>💾</span>
            <span>저장</span>
          </button>
        </div>
      </div>
      <hr className="my-4 border-gray-200 dark:border-gray-700" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-600 text-2xl">🤖</div>
          <div>
            <div className="font-bold">AI News Analyzer</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">구독자 12.5만명</div>
          </div>
        </div>
        <button className="rounded-full bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700">
          구독
        </button>
      </div>
      <hr className="my-4 border-gray-200 dark:border-gray-700" />
      <div className="mt-4">
        <h3 className="font-bold">{keyword} 뉴스 분석 리포트</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">총 {articles.length}건의 관련 기사를 AI가 분석했습니다.</p>
        <div className="mt-4 grid grid-cols-1 gap-4">
          {articles.map((article, index) => (
            <a key={index} href={article.url} target="_blank" rel="noopener noreferrer" className="block rounded-lg border border-gray-200 p-4 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
              <div className="flex items-start gap-4">
                <div className="text-lg font-bold text-[var(--accent-color)]">{index + 1}</div>
                <div>
                  <div className="font-bold">{article.title}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{article.summary}</div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
} 
import { Link } from "@remix-run/react";

type NewsCardProps = {
  id: number;
  title: string;
  keyword: string;
  count: number;
  category: string;
  insight: string;
  thumbnail: string;
  publishedAt: string;
  region?: string;
};

export default function NewsCard({
  title,
  keyword,
  count,
  publishedAt,
  insight,
  thumbnail,
  region
}: NewsCardProps) {
  const detailUrl = region === 'global'
    ? `/news-detail/keyword=${encodeURIComponent(keyword)}&region=global`
    : `/news-detail/keyword=${encodeURIComponent(keyword)}`;

  return (
    <Link to={detailUrl} className="group block cursor-pointer overflow-hidden rounded-xl bg-gray-800/50 shadow-lg transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-500/20">
      <div className="relative flex h-44 w-full items-center justify-center overflow-hidden bg-gradient-to-br from-gray-700 to-teal-600/70">
        <div className="z-10 text-5xl opacity-90 transition-transform duration-300 group-hover:scale-110">{thumbnail}</div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      <div className="p-4">
        <h3 className="mb-2 h-14 font-semibold text-white line-clamp-2">{title}</h3>
        <div className="mb-3 flex items-center gap-2 text-xs text-gray-400">
          <span>📊 {count}건</span>
          <span>•</span>
          <span>{publishedAt}</span>
          {region === 'global' && <span className="font-semibold text-teal-400">• 🌍 해외</span>}
        </div>
        <div className="rounded-lg border-l-4 border-teal-500 bg-gray-700/50 p-3 text-sm text-gray-300">
          <div className="mb-1 text-xs font-bold text-teal-400">AI 인사이트</div>
          <p className="line-clamp-2">{insight}</p>
        </div>
      </div>
    </Link>
  );
} 
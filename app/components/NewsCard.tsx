import { Link } from "@remix-run/react";
import { formatDate } from "~/utils/date.utils";

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

  const formattedDate = formatDate(new Date(publishedAt));

  return (
    <Link to={detailUrl} className="group block rounded-lg bg-[var(--card-light)] p-6 shadow-md transition-shadow duration-300 hover:shadow-xl dark:bg-[var(--card-dark)]">
      <div className="flex flex-col-reverse items-start gap-6 sm:flex-row">
        <div className="flex-1">
          <h2 className="text-xl font-bold group-hover:text-[var(--accent-color)]">{title}</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {insight}
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-gray-500">
            <span>📊 {count}건</span>
            <span>•</span>
            <span>{formattedDate}</span>
            {region === 'global' && <span className="font-semibold text-teal-400">• 🌍 해외</span>}
          </div>
        </div>
        <div className="w-full sm:w-48 h-32 flex-shrink-0 rounded-lg bg-cover bg-center text-5xl flex items-center justify-center">
          {thumbnail}
        </div>
      </div>
    </Link>
  );
} 
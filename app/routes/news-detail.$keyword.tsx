import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getNewsDetail } from "~/services/news.server";
import VideoPlayer from "~/components/VideoPlayer";
import VideoInfo from "~/components/VideoInfo";
import DetailSidebar from "~/components/DetailSidebar";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const keyword = params.keyword!;
  const url = new URL(request.url);
  const region = url.searchParams.get('region') || 'domestic';
  
  const detailData = await getNewsDetail(keyword, region);
  return json({ detailData });
};

export default function NewsDetail() {
  const { detailData } = useLoaderData<typeof loader>();
  
  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[var(--card-light)] dark:bg-[var(--card-dark)] shadow-md transition-colors duration-300">
        <div className="container mx-auto flex items-center justify-between whitespace-nowrap px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
              <span>←</span>
              <span>뒤로가기</span>
            </Link>
          </div>
          <h1 className="text-xl font-bold text-[var(--accent-color)]">{detailData.keyword} 뉴스</h1>
        </div>
      </header>
      <main className="container mx-auto max-w-7xl flex-1 px-6 py-10">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-1 max-w-4xl">
            <div className="rounded-lg bg-[var(--card-light)] p-6 shadow-md dark:bg-[var(--card-dark)]">
              <VideoPlayer keyword={detailData.keyword} />
            </div>
            <div className="mt-6 rounded-lg bg-[var(--card-light)] p-6 shadow-md dark:bg-[var(--card-dark)]">
              <VideoInfo keyword={detailData.keyword} articles={detailData.articles} />
            </div>
          </div>
          <div className="w-full lg:w-96">
            <DetailSidebar 
              aiInsight={detailData.aiInsight}
              trendData={detailData.trendData}
              relatedNews={detailData.relatedNews}
            />
          </div>
        </div>
      </main>
    </>
  );
} 
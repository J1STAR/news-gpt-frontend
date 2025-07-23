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
    <div className="bg-black text-white">
      <div className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-700 bg-gray-800 px-4 py-3">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 rounded-full bg-gray-700 px-4 py-2 text-white no-underline transition-all hover:bg-gray-600">
            <span>←</span>
            <span>뒤로가기</span>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-white no-underline">
            <span style={{ fontSize: '24px' }}>📺</span>
            <h1 className="text-xl font-medium">News TUBE GPT v2</h1>
          </Link>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl gap-6 p-4 md:p-6">
        <div className="flex-1 max-w-[854px]">
          <VideoPlayer keyword={detailData.keyword} />
          <VideoInfo keyword={detailData.keyword} articles={detailData.articles} />
        </div>
        <DetailSidebar 
          aiInsight={detailData.aiInsight}
          trendData={detailData.trendData}
          relatedNews={detailData.relatedNews}
        />
      </div>
    </div>
  );
} 
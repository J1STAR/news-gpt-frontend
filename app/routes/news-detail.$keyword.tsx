import { json, LoaderFunctionArgs } from "@remix-run/node";
import type { LinksFunction } from '@remix-run/node';
import { Link, useLoaderData } from "@remix-run/react";
import { getNewsDetail } from "~/services/news.server";
import VideoPlayer from "~/components/VideoPlayer";
import VideoInfo from "~/components/VideoInfo";
import DetailSidebar from "~/components/DetailSidebar";
import newsDetailStyles from '~/styles/news-detail.css?url';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: newsDetailStyles },
];

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
      <div className="header">
        <div className="logo-section">
          <Link to="/" className="back-btn">
            <span>←</span>
            <span>뒤로가기</span>
          </Link>
          <Link to="/" className="logo">
            <span style={{ fontSize: '24px' }}>📺</span>
            <h1>News TUBE GPT v2</h1>
          </Link>
        </div>
      </div>

      <div className="main-container">
        <div className="main-content">
          <VideoPlayer keyword={detailData.keyword} />
          <VideoInfo keyword={detailData.keyword} articles={detailData.articles} />
        </div>
        <DetailSidebar 
          aiInsight={detailData.aiInsight}
          trendData={detailData.trendData}
          relatedNews={detailData.relatedNews}
        />
      </div>
    </>
  );
} 
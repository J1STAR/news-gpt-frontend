import { useState } from 'react';
import { json, LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Header from '~/components/Header';
import Sidebar from '~/components/Sidebar';
import NewsCard from '~/components/NewsCard';
import SubscribeModal from '~/components/SubscribeModal';
import { getNews } from '~/services/news.server';
import indexStyles from "~/styles/index.css?url";

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: indexStyles },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const category = url.searchParams.get('category') || 'all';
  const news = await getNews(category);
  return json({ news, category });
};

export default function Index() {
  const { news, category } = useLoaderData<typeof loader>();
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);

  return (
    <>
      <Header onSubscribeClick={() => setIsSubscribeModalOpen(true)} />
      
      <div className="main-container">
        <Sidebar activeCategory={category} />

        <div className="content">
          <div className="content-header">
            <h2 className="content-title">이번 주 AI 뉴스 분석</h2>
            <p className="content-subtitle">AI가 분석한 최신 뉴스 트렌드와 키워드를 확인하세요</p>
          </div>

          <div className="news-grid" id="newsGrid">
            {news.length > 0 ? (
              news.map((item) => <NewsCard key={item.id} {...item} />)
            ) : (
              <p>뉴스를 불러오는데 실패했습니다.</p>
            )}
          </div>
        </div>
      </div>
      
      <SubscribeModal 
        isOpen={isSubscribeModalOpen} 
        onClose={() => setIsSubscribeModalOpen(false)} 
      />
    </>
  );
}

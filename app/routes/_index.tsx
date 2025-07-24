import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
// import Sidebar from '~/components/Sidebar';
import NewsCard from '~/components/NewsCard';
import { getNews } from '~/services/news.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const category = url.searchParams.get('category') || 'all';
  const news = await getNews(category);
  return json({ news, category });
};

export default function Index() {
  const { news } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="mx-auto flex max-w-7xl gap-4 px-4 py-6">
        {/* <Sidebar activeCategory={category} /> */}

        <div className="flex-1">
          <div className="mb-6">
            <h2 className="mb-2 text-2xl font-medium text-white">이번 주 AI 뉴스 분석</h2>
            <p className="text-sm text-gray-400">AI가 분석한 최신 뉴스 트렌드와 키워드를 확인하세요</p>
          </div>

          <div className="mb-10 grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-5" id="newsGrid">
            {news.length > 0 ? (
              news.map((item) => <NewsCard key={item.id} {...item} />)
            ) : (
              <p>뉴스를 불러오는데 실패했습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

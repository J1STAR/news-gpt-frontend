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
    <main className="container mx-auto max-w-5xl flex-1 px-6 py-10">
      <div className="flex-1">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">이번 주 AI 뉴스 분석</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">AI가 분석한 최신 뉴스 트렌드와 키워드를 확인하세요</p>
        </div>

        <div className="mt-8 grid gap-8">
          {news.length > 0 ? (
            news.map((item) => <NewsCard key={item.id} {...item} />)
          ) : (
            <p>뉴스를 불러오는데 실패했습니다.</p>
          )}
        </div>
      </div>
    </main>
  );
}

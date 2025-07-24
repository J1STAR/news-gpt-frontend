import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Header from '~/components/Header';
import { getNews } from '~/services/news.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const category = url.searchParams.get('category') || 'all';
  const news = await getNews(category);
  return json({ news, category });
};

export default function Index() {
  const { news, category } = useLoaderData<typeof loader>();

  const categories = [
    { id: 'all', name: '전체', active: category === 'all' },
    { id: 'ai', name: 'AI', active: category === 'ai' },
    { id: 'cloud', name: '클라우드 컴퓨팅', active: category === 'cloud' },
    { id: 'security', name: '사이버보안', active: category === 'security' },
    { id: 'web', name: '웹 개발', active: category === 'web' },
  ];

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-5xl flex-1 px-6 py-10">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">최신 기술 동향</h1>
        <div className="mt-6 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <a
              key={cat.id}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${cat.active
                ? 'bg-[var(--accent-color)] text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              href={cat.id === 'all' ? '/' : `/?category=${cat.id}`}
            >
              {cat.name}
            </a>
          ))}
        </div>
        <div className="mt-8 grid gap-8">
          {news.length > 0 ? (
            news.map((item) => (
              <a
                key={item.id}
                className="group block rounded-lg bg-[var(--card-light)] p-6 shadow-md transition-shadow duration-300 hover:shadow-xl dark:bg-[var(--card-dark)]"
                href={`/news-detail/${item.keyword}`}
              >
                <div className="flex flex-col-reverse items-start gap-6 sm:flex-row">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold group-hover:text-[var(--accent-color)]">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {item.summary}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="inline-block text-xs font-medium text-gray-500">
                          {new Date(item.date).toLocaleDateString('ko-KR')} · {item.readTime || '5분'} 읽기
                        </span>
                        {item.keyword && (
                          <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {item.keyword}
                          </span>
                        )}
                      </div>
                      <button className="text-gray-400 hover:text-[var(--accent-color)] transition-colors">
                        <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  {item.imageUrl && (
                    <div
                      className="w-full sm:w-48 h-32 flex-shrink-0 rounded-lg bg-cover bg-center"
                      style={{ backgroundImage: `url(${item.imageUrl})` }}
                    />
                  )}
                </div>
              </a>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">뉴스를 불러오는데 실패했습니다.</p>
            </div>
          )}
        </div>
        {news.length > 0 && (
          <div className="mt-10 flex items-center justify-center space-x-2">
            <a className="flex size-10 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" href="#">
              <svg className="size-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" fillRule="evenodd"></path>
              </svg>
            </a>
            <a className="flex size-10 items-center justify-center rounded-full bg-[var(--accent-color)] text-white text-sm font-medium" href="#">1</a>
            <a className="flex size-10 items-center justify-center rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" href="#">2</a>
            <a className="flex size-10 items-center justify-center rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" href="#">3</a>
            <a className="flex size-10 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" href="#">
              <svg className="size-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" fillRule="evenodd"></path>
              </svg>
            </a>
          </div>
        )}
      </main>
    </>
  );
}

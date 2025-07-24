import Header from '~/components/Header';

export default function Bookmarks() {
    // 임시 북마크 데이터
    const bookmarks = [
        {
            id: 1,
            title: "AI 기반 소프트웨어 개발의 미래",
            summary: "AI가 소프트웨어 개발 생명주기를 어떻게 변화시키고 있는지, 코드 생성부터 자동화된 테스트까지 살펴봅니다.",
            date: "2024-01-15",
            readTime: "5분",
            keyword: "AI",
            imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop"
        },
        {
            id: 2,
            title: "2024년 클라우드 컴퓨팅 트렌드",
            summary: "서버리스 아키텍처, 엣지 컴퓨팅, 멀티 클라우드 전략을 포함한 최신 클라우드 컴퓨팅 트렌드를 살펴봅니다.",
            date: "2024-01-14",
            readTime: "7분",
            keyword: "클라우드",
            imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop"
        },
        {
            id: 3,
            title: "사이버보안 위협과 완화 전략",
            summary: "현재 사이버보안 위협에 대한 개요와 시스템 및 데이터 보호를 위한 효과적인 전략을 제시합니다.",
            date: "2024-01-13",
            readTime: "6분",
            keyword: "보안",
            imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=200&fit=crop"
        }
    ];

    return (
        <>
            <Header />
            <main className="container mx-auto max-w-5xl flex-1 px-6 py-10">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">북마크한 기사</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">나중에 읽기 위해 저장한 기사들입니다.</p>

                <div className="mt-8 grid gap-8">
                    {bookmarks.length > 0 ? (
                        bookmarks.map((item) => (
                            <div
                                key={item.id}
                                className="group block rounded-lg bg-[var(--card-light)] p-6 shadow-md transition-shadow duration-300 hover:shadow-xl dark:bg-[var(--card-dark)]"
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
                                                    {new Date(item.date).toLocaleDateString('ko-KR')} · {item.readTime} 읽기
                                                </span>
                                                {item.keyword && (
                                                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                        {item.keyword}
                                                    </span>
                                                )}
                                            </div>
                                            <button className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                                                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                </svg>
                                                삭제
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
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <svg className="mx-auto size-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                            </svg>
                            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">북마크가 없습니다</h3>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">관심 있는 기사를 북마크해보세요.</p>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
import Header from '~/components/Header';

export default function Latest() {
    // 임시 최신 뉴스 데이터
    const latestNews = [
        {
            id: 1,
            title: "OpenAI GPT-4 Turbo 새로운 기능 발표",
            summary: "OpenAI가 GPT-4 Turbo의 새로운 기능들을 발표했습니다. 향상된 성능과 더 긴 컨텍스트 윈도우가 주요 특징입니다.",
            date: "2024-01-16",
            readTime: "3분",
            keyword: "AI",
            imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop",
            isNew: true
        },
        {
            id: 2,
            title: "구글, 새로운 양자 컴퓨팅 칩 공개",
            summary: "구글이 차세대 양자 컴퓨팅 프로세서를 공개하며 양자 우위 달성에 한 걸음 더 다가섰습니다.",
            date: "2024-01-16",
            readTime: "4분",
            keyword: "양자컴퓨팅",
            imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop",
            isNew: true
        },
        {
            id: 3,
            title: "메타, VR/AR 기술 혁신 발표",
            summary: "메타가 차세대 VR/AR 기술을 발표하며 메타버스 생태계 확장에 박차를 가하고 있습니다.",
            date: "2024-01-15",
            readTime: "5분",
            keyword: "VR/AR",
            imageUrl: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=400&h=200&fit=crop"
        },
        {
            id: 4,
            title: "테슬라 자율주행 기술 업데이트",
            summary: "테슬라가 FSD(Full Self-Driving) 베타 버전의 새로운 업데이트를 출시했습니다.",
            date: "2024-01-15",
            readTime: "6분",
            keyword: "자율주행",
            imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=200&fit=crop"
        },
        {
            id: 5,
            title: "애플 Vision Pro 개발자 도구 공개",
            summary: "애플이 Vision Pro를 위한 새로운 개발자 도구와 SDK를 공개했습니다.",
            date: "2024-01-14",
            readTime: "4분",
            keyword: "Apple",
            imageUrl: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=400&h=200&fit=crop"
        }
    ];

    return (
        <>
            <Header />
            <main className="container mx-auto max-w-5xl flex-1 px-6 py-10">
                <div className="flex items-center gap-3 mb-6">
                    <h1 className="text-3xl font-bold tracking-tight md:text-4xl">최신 뉴스</h1>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                        실시간 업데이트
                    </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-8">가장 최근에 발표된 기술 뉴스를 확인하세요.</p>

                <div className="mt-8 grid gap-8">
                    {latestNews.map((item) => (
                        <a
                            key={item.id}
                            className="group block rounded-lg bg-[var(--card-light)] p-6 shadow-md transition-shadow duration-300 hover:shadow-xl dark:bg-[var(--card-dark)]"
                            href={`/news-detail/${item.keyword}`}
                        >
                            <div className="flex flex-col-reverse items-start gap-6 sm:flex-row">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h2 className="text-xl font-bold group-hover:text-[var(--accent-color)]">
                                            {item.title}
                                        </h2>
                                        {item.isNew && (
                                            <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-200">
                                                NEW
                                            </span>
                                        )}
                                    </div>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                        {item.summary}
                                    </p>
                                    <div className="mt-4 flex items-center gap-4">
                                        <span className="inline-block text-xs font-medium text-gray-500">
                                            {new Date(item.date).toLocaleDateString('ko-KR')} · {item.readTime} 읽기
                                        </span>
                                        {item.keyword && (
                                            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                {item.keyword}
                                            </span>
                                        )}
                                        <button className="ml-auto text-gray-400 hover:text-[var(--accent-color)] transition-colors">
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
                    ))}
                </div>

                <div className="mt-10 flex items-center justify-center">
                    <button className="rounded-lg bg-[var(--accent-color)] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-600">
                        더 많은 뉴스 보기
                    </button>
                </div>
            </main>
        </>
    );
}
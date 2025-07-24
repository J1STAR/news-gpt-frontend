import Header from '~/components/Header';

export default function Topics() {
    const topics = [
        {
            id: 'ai',
            name: '인공지능',
            description: 'AI, 머신러닝, 딥러닝 관련 최신 소식',
            articleCount: 156,
            color: 'bg-blue-500',
            icon: '🤖'
        },
        {
            id: 'cloud',
            name: '클라우드 컴퓨팅',
            description: 'AWS, Azure, GCP 등 클라우드 서비스 동향',
            articleCount: 89,
            color: 'bg-green-500',
            icon: '☁️'
        },
        {
            id: 'security',
            name: '사이버보안',
            description: '보안 위협, 취약점, 보안 솔루션 정보',
            articleCount: 67,
            color: 'bg-red-500',
            icon: '🔒'
        },
        {
            id: 'web',
            name: '웹 개발',
            description: '프론트엔드, 백엔드, 풀스택 개발 트렌드',
            articleCount: 134,
            color: 'bg-purple-500',
            icon: '💻'
        },
        {
            id: 'mobile',
            name: '모바일 개발',
            description: 'iOS, Android, 크로스플랫폼 개발',
            articleCount: 78,
            color: 'bg-orange-500',
            icon: '📱'
        },
        {
            id: 'blockchain',
            name: '블록체인',
            description: '암호화폐, DeFi, NFT, Web3 기술',
            articleCount: 45,
            color: 'bg-yellow-500',
            icon: '⛓️'
        },
        {
            id: 'iot',
            name: 'IoT',
            description: '사물인터넷, 스마트 디바이스, 엣지 컴퓨팅',
            articleCount: 34,
            color: 'bg-indigo-500',
            icon: '🌐'
        },
        {
            id: 'devops',
            name: 'DevOps',
            description: 'CI/CD, 컨테이너, 인프라 자동화',
            articleCount: 92,
            color: 'bg-teal-500',
            icon: '⚙️'
        }
    ];

    return (
        <>
            <Header />
            <main className="container mx-auto max-w-5xl flex-1 px-6 py-10">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">기술 토픽</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">관심 있는 기술 분야별로 뉴스를 탐색해보세요.</p>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {topics.map((topic) => (
                        <a
                            key={topic.id}
                            href={`/?category=${topic.id}`}
                            className="group block rounded-lg bg-[var(--card-light)] p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-[var(--card-dark)]"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`flex size-12 items-center justify-center rounded-lg ${topic.color} text-white text-xl`}>
                                    {topic.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg group-hover:text-[var(--accent-color)] transition-colors">
                                        {topic.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {topic.articleCount}개 기사
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                {topic.description}
                            </p>
                            <div className="mt-4 flex items-center text-sm text-[var(--accent-color)] font-medium">
                                더 보기
                                <svg className="ml-1 size-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </div>
                        </a>
                    ))}
                </div>

                <div className="mt-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
                    <h2 className="text-2xl font-bold mb-4">맞춤형 뉴스 추천</h2>
                    <p className="mb-6 opacity-90">
                        관심 있는 토픽을 선택하면 개인화된 뉴스를 추천해드립니다.
                    </p>
                    <button className="rounded-lg bg-white bg-opacity-20 px-6 py-3 font-medium transition-colors hover:bg-opacity-30">
                        토픽 구독하기
                    </button>
                </div>
            </main>
        </>
    );
}
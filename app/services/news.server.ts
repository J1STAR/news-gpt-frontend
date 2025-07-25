import { getPastWeeksRanges } from '~/utils/date.utils';

const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

type Keyword = {
  keyword: string;
  count: number;
  category?: string;
};

export type NewsCardData = {
  id: number;
  title: string;
  keyword: string;
  count: number;
  category: string;
  insight: string;
  thumbnail: string;
  publishedAt: string;
  region?: string;
};

export type Article = {
  title: string;
  summary: string;
  url: string;
  date: string;
};

export type NewsDetailData = {
  keyword: string;
  articles: Article[];
  aiInsight: string;
  trendData: { label: string; value: number; percentage: number }[];
  relatedNews: { keyword: string; title: string; thumbnail: string }[];
};

async function generateKeywordInsight(keyword: string): Promise<string> {
  const keywordInsights: { [key: string]: string } = {
    AI: `AI 기술 발전, 정책 논의, 투자 증가, 표준화, 인재 양성, 보안 이슈, 스타트업 활성화, 특허 급증, 국제 경쟁력 강화, 신제품 출시 등 전방위적 성장세를 보이고 있습니다.`,
    인공지능: `인공지능 기술 혁신, 산업 적용 확대, 규제 정비, 투자 활성화, 국제 협력, 전문 인력 확보, 윤리적 이슈, 생태계 조성, 특허 경쟁, 미래 전망 등이 주요 화두입니다.`,
    반도체: `반도체 기술 혁신, 공급망 안정화, 정부 정책 지원, 투자 확대, 국제 협력, 인재 확보, 보안 강화, 신규 업체 진입, 특허 경쟁, 글로벌 시장 확대 등이 주요 동향입니다.`,
    바이오: `바이오 기술 발전, 의료 혁신, 규제 개선, 투자 활성화, 국제 표준화, 전문 인력 양성, 데이터 보안, 스타트업 성장, 특허 출원 증가, 글로벌 경쟁력 제고가 핵심 트렌드입니다.`,
    암호화폐: `암호화폐 규제 정비, 디지털 자산 제도화, 블록체인 기술 발전, 투자 시장 성숙화, 중앙은행 디지털화폐, 거래소 보안 강화, 전문 인력 양성, 핀테크 생태계 확장, 특허 경쟁 심화, 글로벌 표준화가 핵심 동향입니다.`,
    사이버보안: `사이버 위협 증가, 보안 솔루션 발전, 개인정보보호 강화, 정부 정책 지원, 국제 협력 확대, 보안 전문가 양성, 기업 보안 투자, 보안 스타트업 성장, 보안 특허 경쟁, 글로벌 보안 표준화가 핵심 동향입니다.`,
    로봇: `로봇 기술 혁신, 산업 자동화 확산, 서비스 로봇 상용화, 정부 지원 정책, 로봇 표준화 작업, 전문 인력 확보, 로봇 보안 이슈, 로봇 스타트업 활성화, 로봇 특허 급증, 글로벌 로봇 시장 진출이 주요 트렌드입니다.`,
  };

  if (keywordInsights[keyword]) {
    return keywordInsights[keyword];
  }

  const generalInsights = [
    `${keyword} 기술 발전, 정책 지원, 투자 확대, 표준화 작업, 인재 양성, 보안 강화, 생태계 조성, 특허 경쟁, 글로벌 진출, 미래 전망 등이 주요 트렌드입니다.`,
    `${keyword} 분야의 혁신 가속화, 산업 적용 확대, 규제 정비, 투자 활성화, 국제 협력, 전문 인력 확보, 기술 표준화, 스타트업 성장이 두드러집니다.`,
    `${keyword} 관련 기술 발전, 시장 확대, 정부 지원, 민간 투자, 인재 확보, 보안 이슈, 혁신 생태계, 특허 출원, 국제 경쟁력이 핵심 화두입니다.`,
  ];

  return generalInsights[Math.floor(Math.random() * generalInsights.length)];
}

function getKeywordIcon(keyword: string): string {
  if (!keyword || typeof keyword !== "string") {
    return "📰";
  }

  const icons: { [key: string]: string } = {
    AI: "🤖",
    인공지능: "🤖",
    GPT: "🤖",
    반도체: "🔧",
    메모리: "💾",
    CPU: "⚡",
    바이오: "🧬",
    의료: "🏥",
    헬스케어: "💊",
    암호화폐: "💰",
    블록체인: "⛓️",
    비트코인: "₿",
    사이버보안: "🛡️",
    보안: "🔒",
    해킹: "🛡️",
    로봇: "🤖",
    자동화: "⚙️",
    산업로봇: "🦾",
    자동차: "🚗",
    전기차: "🔋",
    배터리: "🔋",
    핀테크: "💰",
    금융: "💳",
    CBDC: "🪙",
    게임: "🎮",
    메타버스: "🥽",
    VR: "🥽",
    클라우드: "☁️",
    서버: "🖥️",
    데이터: "📊",
  };

  for (const [key, icon] of Object.entries(icons)) {
    if (keyword.includes(key)) return icon;
  }

  return "📰";
}

export async function getNews(category: string): Promise<NewsCardData[]> {
  const [lastWeek] = getPastWeeksRanges(1); // Get last week's range
  const { start: startDate, end: endDate } = lastWeek;

  let url: string;

  switch (category) {
    case "domestic":
      url = `${API_BASE_URL}/weekly-keywords-by-date?start_date=${startDate}&end_date=${endDate}`;
      break;
    case "global":
      url = `${API_BASE_URL}/global-weekly-keywords-by-date?start_date=${startDate}&end_date=${endDate}`;
      break;
    default:
      url = `${API_BASE_URL}/weekly-keywords-by-date?start_date=${startDate}&end_date=${endDate}`;
      break;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    const data: { keywords: Keyword[] } = await response.json();

    if (!data.keywords || data.keywords.length === 0) {
      return getSampleNews(category);
    }

    const newsCards = await Promise.all(
      data.keywords.slice(0, 12).map(async (keyword, index) => {
        const insight = await generateKeywordInsight(keyword.keyword);
        return {
          id: index,
          title: `${keyword.keyword} 분석 리포트`,
          keyword: keyword.keyword,
          count: keyword.count,
          category: keyword.category || "tech",
          insight: insight,
          thumbnail: getKeywordIcon(keyword.keyword),
          publishedAt: new Date().toLocaleDateString("ko-KR"),
          region: category === "global" ? "global" : "domestic",
        };
      }),
    );

    return newsCards;
  } catch (error) {
    console.error("Failed to fetch news data, returning sample data.", error);
    return getSampleNews(category);
  }
}

export async function getNewsDetail(
  keyword: string,
  region: string = "domestic",
): Promise<NewsDetailData> {
  const [lastWeek] = getPastWeeksRanges(1);
  const { start: startDate, end: endDate } = lastWeek;

  let url;
  if (region === "global") {
    url = `${API_BASE_URL}/api/global-keyword-articles/${encodeURIComponent(
      keyword,
    )}?start_date=${startDate}&end_date=${endDate}`;
  } else {
    url = `${API_BASE_URL}/keyword-articles?keyword=${encodeURIComponent(
      keyword,
    )}&start_date=${startDate}&end_date=${endDate}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API Error for ${keyword}: ${response.statusText}`);
    }
    const data: { articles: Article[] } = await response.json();
    const articles = data.articles || [];

    // Simulate generating insights and trend data
    const aiInsight = await generateKeywordInsight(
      articles.length > 0 ? keyword : "샘플",
    );
    const trendData = [
      { label: "이번 주", value: articles.length || 10, percentage: 100 },
      {
        label: "지난 주",
        value: Math.floor((articles.length || 10) * 0.8),
        percentage: 80,
      },
    ];

    const relatedKeywords = ["AI", "반도체", "바이오", "전기차"].filter(
      (k) => k !== keyword,
    );
    const relatedNews = relatedKeywords.map((k) => ({
      keyword: k,
      title: `${k} 분석 리포트`,
      thumbnail: getKeywordIcon(k),
    }));

    return {
      keyword,
      articles,
      aiInsight,
      trendData,
      relatedNews,
    };
  } catch (error) {
    console.error(
      `Failed to fetch news detail for ${keyword}, returning sample data.`,
      error,
    );
    // Return sample data on error
    return {
      keyword,
      articles: [
        {
          title: "샘플 기사",
          summary: "샘플 요약",
          url: "#",
          date: "2025-07-21",
        },
      ],
      aiInsight: "샘플 AI 인사이트입니다.",
      trendData: [{ label: "이번 주", value: 10, percentage: 100 }],
      relatedNews: [
        { keyword: "AI", title: "AI 분석 리포트", thumbnail: "🤖" },
      ],
    };
  }
}

function getSampleNews(category: string): NewsCardData[] {
  if (category === "global") {
    return [
      {
        id: 1,
        title: "AI 기술 동향 분석(영어원문)",
        keyword: "AI",
        count: 247,
        category: "tech",
        insight:
          "AI 기술 발전, 정책 논의, 투자 증가, 표준화 노력, 인재 개발, 보안 이슈, 스타트업 생태계 성장, 특허 급증, 국제 경쟁력 강화, 신제품 출시 등 종합적인 성장 트렌드를 보이고 있습니다.",
        thumbnail: "🤖",
        publishedAt: new Date().toLocaleDateString("ko-KR"),
        region: "global",
      },
      {
        id: 2,
        title: "혁신과 디지털 전환(영어원문)",
        keyword: "Innovation",
        count: 183,
        category: "tech",
        insight:
          "혁신 주도 변화, 디지털 파괴, 신기술 등장, 벤처 캐피털 투자, R&D 이니셔티브, 특허 경쟁, 글로벌 시장 확장, 기술적 돌파구 등이 핵심 테마로 부상하고 있습니다.",
        thumbnail: "💡",
        publishedAt: new Date().toLocaleDateString("ko-KR"),
        region: "global",
      },
      {
        id: 3,
        title: "머신러닝 응용 분야(영어원문)",
        keyword: "Machine Learning",
        count: 156,
        category: "tech",
        insight:
          "머신러닝 응용, 알고리즘 개선, 데이터 처리 능력, AI 모델 훈련, 예측 분석, 자동화 솔루션, 연구 혁신, 산업 구현 등이 빠르게 확산되고 있습니다.",
        thumbnail: "🤖",
        publishedAt: new Date().toLocaleDateString("ko-KR"),
        region: "global",
      },
    ];
  }
  return [
    {
      id: 1,
      title: "AI 분석 리포트",
      keyword: "AI",
      count: 247,
      category: "tech",
      insight:
        "AI 기술 발전, 정책 논의, 투자 증가, 표준화, 인재 양성, 보안 이슈, 스타트업 활성화, 특허 급증, 국제 경쟁력 강화, 신제품 출시 등 전방위적 성장세를 보이고 있습니다.",
      thumbnail: "🤖",
      publishedAt: new Date().toLocaleDateString("ko-KR"),
    },
    {
      id: 2,
      title: "반도체 분석 리포트",
      keyword: "반도체",
      count: 183,
      category: "tech",
      insight:
        "반도체 기술 혁신, 공급망 안정화, 정부 정책 지원, 투자 확대, 국제 협력, 인재 확보, 보안 강화, 신규 업체 진입, 특허 경쟁, 글로벌 시장 확대 등이 주요 동향입니다.",
      thumbnail: "🔧",
      publishedAt: new Date().toLocaleDateString("ko-KR"),
    },
    {
      id: 3,
      title: "바이오 분석 리포트",
      keyword: "바이오",
      count: 156,
      category: "tech",
      insight:
        "바이오 기술 발전, 의료 혁신, 규제 개선, 투자 활성화, 국제 표준화, 전문 인력 양성, 데이터 보안, 스타트업 성장, 특허 출원 증가, 글로벌 경쟁력 제고가 핵심 트렌드입니다.",
      thumbnail: "🧬",
      publishedAt: new Date().toLocaleDateString("ko-KR"),
    },
  ];
}

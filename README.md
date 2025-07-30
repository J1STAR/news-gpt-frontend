# 📰 News GPT Frontend - AI 뉴스 분석 플랫폼

## 프로젝트 개요

News GPT Frontend는 글로벌 트렌딩 키워드를 기반으로 AI가 뉴스를 분석하고 해석하는 웹 애플리케이션입니다. Remix 프레임워크를 사용하여 구축되었으며, 실시간 뉴스 분석, 산업별 키워드 분석, 직무별 키워드 분석 등 다양한 기능을 제공합니다.

## 🏗️ 프로젝트 구조

```
news-gpt-frontend/
├── app/
│   ├── components/           # 재사용 가능한 UI 컴포넌트
│   │   ├── ArticleModal.tsx      # 뉴스 기사 모달
│   │   ├── ChatbotModal.tsx      # AI 챗봇 모달
│   │   ├── DetailSidebar.tsx     # 상세 정보 사이드바
│   │   ├── Header.tsx            # 네비게이션 헤더
│   │   ├── IndustryAnalysisResults.tsx  # 산업 분석 결과
│   │   ├── JobSummaryModal.tsx   # 직무 분석 요약 모달
│   │   ├── SubscribeModal.tsx    # 구독 모달
│   │   ├── TermsModal.tsx        # 이용약관 모달
│   │   ├── VideoInfo.tsx         # 비디오 정보
│   │   ├── VideoPlayer.tsx       # 비디오 플레이어
│   │   └── WeeklySummary.tsx     # 주간 요약
│   ├── entry.client.tsx      # 클라이언트 진입점
│   ├── entry.server.tsx      # 서버 진입점
│   ├── images/               # 이미지 리소스
│   │   └── seesaw.png            # 로고 이미지
│   ├── root.tsx              # 루트 레이아웃
│   ├── routes/               # 페이지 라우트
│   │   ├── _index.tsx            # 메인 페이지 (글로벌 인기 검색어)
│   │   ├── api.chat.tsx          # 챗봇 API 엔드포인트
│   │   ├── api.industry-analysis.tsx  # 산업 분석 API
│   │   ├── api.job-analysis.tsx       # 직무 분석 API
│   │   ├── api.keyword-articles.tsx   # 키워드 기사 API
│   │   ├── industry-analysis.tsx      # 산업별 키워드 분석 페이지
│   │   ├── job-analysis.tsx           # 직무별 키워드 분석 페이지
│   │   └── news-detail.$keyword.tsx   # 뉴스 상세 페이지
│   ├── services/             # 백엔드 API 서비스
│   │   ├── chat.server.ts         # 챗봇 서비스
│   │   ├── industry-analysis.server.ts  # 산업 분석 서비스
│   │   ├── job-analysis.server.ts       # 직무 분석 서비스
│   │   ├── news.server.ts           # 뉴스 서비스
│   │   └── trending.server.ts       # 트렌딩 키워드 서비스
│   ├── tailwind.css          # Tailwind CSS 스타일
│   └── utils/                # 유틸리티 함수
│       └── date.utils.ts         # 날짜 관련 유틸리티
├── public/                   # 정적 파일
├── package.json              # 프로젝트 의존성 및 스크립트
├── tailwind.config.ts        # Tailwind CSS 설정
├── tsconfig.json             # TypeScript 설정
├── vite.config.ts            # Vite 빌드 도구 설정
└── README.md                 # 프로젝트 문서
```

## 🚀 주요 기능

### 1. 글로벌 인기 검색어 분석
- **국가별 트렌딩 키워드**: 한국, 미국, 멕시코, 영국, 인도, 남아공, 호주의 실시간 인기 검색어
- **공통/고유 키워드 구분**: 여러 국가에서 동시에 인기인 키워드와 특정 국가에서만 인기인 키워드를 시각적으로 구분
- **AI 해설**: GPT-4o를 활용한 키워드별 상세 분석 및 해설
- **관련 뉴스**: 키워드와 관련된 최신 뉴스 기사 제공

### 2. 산업별 키워드 분석
- **주간 키워드 요약**: 지난 주의 주요 키워드를 국내/해외로 구분하여 분석
- **산업 관점 분석**: 키워드를 산업적 관점에서 해석하고 분석
- **기사 모달**: 키워드별 관련 뉴스 기사를 모달로 표시

### 3. 직무별 키워드 분석
- **직무 선택**: IT/개발, 데이터, 기획/디자인, 마케팅/세일즈, 경영/인사/재무, 미디어/콘텐츠 등 다양한 직무 분야
- **AI 분석**: 선택한 직무 관점에서 키워드를 분석하고 인사이트 제공
- **실시간 분석**: 백엔드 API와 연동하여 분석 결과 제공

### 4. AI 챗봇
- **지능형 대화**: 주간 키워드 분석 기반 AI 챗봇
- **다양한 질문 유형**: 산업별 분석, 키워드 트렌드, 비교 분석, 일반 질문 등
- **실시간 응답**: 백엔드 API와 연동하여 실시간 응답

### 5. 다크 모드 지원
- **테마 토글**: 라이트/다크 모드 전환 기능

## 🛠️ 기술 스택

### Frontend
- **Framework**: Remix 2.16.8 (React 기반 풀스택 프레임워크)
- **Language**: TypeScript 5.1.6
- **Styling**: Tailwind CSS 3.4.4
- **Build Tool**: Vite 6.0.0
- **Icons**: Lucide React 0.525.0
- **Markdown**: Marked 16.1.1

### Development Tools
- **Package Manager**: Yarn
- **Linting**: ESLint 8.38.0
- **Version Manager**: Mise (Node.js 24.4.0)

### Backend Integration
- **API Base URL**: `http://127.0.0.1:8000/api/v1`
- **Endpoints**: 
  - `/trending` - 트렌딩 키워드 조회
  - `/news` - 뉴스 기사 조회
  - `/gpt-commentary` - GPT 해설 생성
  - `/weekly-keywords-by-date` - 주간 키워드 조회
  - `/job-analysis` - 직무별 분석
  - `/chat` - 챗봇 응답

## 📦 설치 및 실행

### 1. 개발 환경 요구사항
- Node.js 24.4.0 이상
- Yarn 패키지 매니저
- Mise 버전 관리자 (권장)

### 2. Mise 설치 (권장)
```bash
# Windows
winget install jdx.mise

# macOS
brew install jdx/mise/mise

# Linux
curl https://mise.run | sh
```

### 3. 프로젝트 설정
```bash
# Node.js 버전 설정
mise install node@24.4.0
mise use node@24.4.0

# Yarn 설치
npm install -g yarn

# 의존성 설치
yarn install
```

### 4. 개발 서버 실행
```bash
yarn run dev
```

개발 서버가 성공적으로 실행되면 다음 URL에서 접근할 수 있습니다:
- **개발 서버**: http://localhost:5173
- **빌드**: `yarn run build`
- **프로덕션 서버**: `yarn start`

## 🔧 개발 스크립트

```json
{
  "dev": "remix vite:dev",        // 개발 서버 실행
  "build": "remix vite:build",    // 프로덕션 빌드
  "start": "remix-serve ./build/server/index.js",  // 프로덕션 서버 실행
  "lint": "eslint --ignore-path .gitignore --cache --cache-location ./node_modules/.cache/eslint .",  // 코드 린팅
  "typecheck": "tsc"              // TypeScript 타입 체크
}
```

## 🎨 UI/UX 특징

### 디자인 시스템
- **CSS 변수 기반 테마**: 라이트/다크 모드 지원

### 컴포넌트 구조
- **재사용 가능한 컴포넌트**: 모듈화된 UI 컴포넌트
- **Props 기반 설계**: 타입 안전한 컴포넌트 인터페이스
- **상태 관리**: React Hooks를 활용한 효율적인 상태 관리

## 🔌 API 통신

### 서비스 레이어
- **trending.server.ts**: 트렌딩 키워드 및 뉴스 관련 API
- **industry-analysis.server.ts**: 산업별 분석 API
- **job-analysis.server.ts**: 직무별 분석 API
- **chat.server.ts**: 챗봇 API
- **news.server.ts**: 뉴스 관련 API

### 에러 처리
- **네트워크 에러**: 적절한 에러 메시지 표시
- **폴백 데이터**: API 실패 시 샘플 데이터 제공
- **로딩 상태**: 사용자 경험을 위한 로딩 인디케이터


## 🤝 기여 가이드

### 개발 환경 설정
1. 프로젝트를 포크하고 클론
2. `yarn install`로 의존성 설치
3. `yarn run dev`로 개발 서버 실행
4. 변경사항 커밋 및 PR 생성

### 코드 스타일
- **ESLint**: 프로젝트의 ESLint 규칙 준수
- **Prettier**: 일관된 코드 포맷팅
- **TypeScript**: 엄격한 타입 체크

## 📞 지원

프로젝트 관련 문의사항이나 버그 리포트는 GitHub Issues를 통해 제출해주세요.

---
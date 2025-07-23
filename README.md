# 📺 News GPT v2 - AI 뉴스 분석 (Remix ver.)

이 프로젝트는 기존의 HTML/CSS/JS로 작성된 AI 뉴스 분석 대시보드를 Remix 프레임워크를 사용하여 리팩토링한 버전입니다. 서버 사이드 렌더링, 중첩 라우팅, 데이터 로딩 최적화 등 Remix의 기능을 활용하여 더 빠르고 확장 가능한 웹 애플리케이션을 구축하는 것을 목표로 합니다.

-  Remix Docs: [remix.run/docs](https://remix.run/docs)

## 주요 페이지

- **메인 페이지 (`/`)**: `app/routes/_index.tsx`
  - 국내/외/기술 등 카테고리별 최신 뉴스 키워드 리포트를 보여줍니다.
  - `loader`를 통해 서버에서 뉴스 데이터를 가져와 렌더링합니다.
- **상세 분석 페이지 (`/analysis`)**: `app/routes/analysis.tsx`
  - 주간 국내/외 키워드 트렌드, 산업별 심층 분석, AI 챗봇 기능을 제공합니다.
  - `loader`로 초기 주간 키워드 데이터를 가져오고, `fetcher`를 사용하여 페이지 전환 없이 동적으로 추가 데이터를 로드합니다.

## 프로젝트 구조

- `app/components`: 재사용 가능한 React 컴포넌트 (Header, Sidebar, NewsCard, Modals 등)
- `app/routes`: 페이지 경로에 매핑되는 라우트 컴포넌트
- `app/services`: 백엔드 API 통신 등 서버 전용 로직
- `app/styles`: CSS 파일

## Development

개발 서버 실행:

```sh
npm run dev
```

## Deployment

먼저, 프로덕션 용으로 앱을 빌드합니다:

```sh
npm run build
```

그 다음, 프로덕션 모드에서 앱을 실행합니다:

```sh
npm start
```

이제 배포할 호스트를 선택해야 합니다.

### DIY

Node 애플리케이션 배포에 익숙하다면, 내장된 Remix 앱 서버는 프로덕션 환경에서 사용할 수 있습니다.

`npm run build`의 결과물을 배포해야 합니다:

- `build/server`
- `build/client`

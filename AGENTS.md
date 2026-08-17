# Agent Guide

## 0. 이 파일을 읽는 법

- Claude Code(`CLAUDE.md`가 이 파일을 import한다), Cursor, Copilot이 전부 이 파일 하나를 본다.
- 여기 적힌 규칙 대부분은 **ESLint가 강제**한다. 애매하면 `bun run lint`가 정답이다.
- 규칙이 불편하면 규칙을 끄지 말고 물어봐라. 대부분은 이유가 있고, 없으면 같이 지우면 된다.

## 1. Environment & Tooling

- **Bun만 쓴다.** npm/yarn/pnpm 금지. 설치·스크립트·락파일 전부 Bun.
- **TypeScript는 6.x에 고정**되어 있다. 7은 `typescript-eslint`가 아직 지원하지 않아
  type-aware 린팅이 통째로 깨진다. 올리지 말 것.
- `es-toolkit`이 있다. 유틸을 직접 만들기 전에 먼저 찾아본다.

| 명령                 | 언제                                                       |
| -------------------- | ---------------------------------------------------------- |
| `bun run dev`        | 개발 (:4321)                                               |
| `bun run storybook`  | 컴포넌트 작업 (:6006)                                      |
| `bun run check`      | **커밋 전** — prettier --write + eslint --fix              |
| `bun run verify`     | **PR 전** — format+lint+typecheck(astro check)+doctor+test |
| `bun run gen`        | `t()` 키를 추가·삭제한 뒤                                  |
| `bun run gen:resume` | `src/content/resume/*.yaml`을 고친 뒤 (PDF 재생성)         |
| `bun run ui:add`     | shadcn 컴포넌트 추가                                       |

`typecheck`는 `tsc`가 아니라 `astro check`다 — `.astro` 파일은 tsc가 못 읽는다.

### 생성물은 손대지 않는다

`src/@types/`, `src/locales/**`(값 제외), `public/resume-*.pdf`는 생성물이고
**커밋되어 있다**. (Bun이 루트 패키지의 `prepare`/`postinstall`을 실행하지 않아서,
설치 시 재생성 훅은 조용히 아무 일도 안 한다. 그래서 커밋한다.)

손으로 고치면 다음 `bun run gen`에 사라진다. CI는 `bun run gen` 후
`git diff --exit-code`로 최신인지 검증한다.

**PDF만 예외로 CI에서 안 만든다.** GitHub Actions의 우분투 이미지에는 한글 폰트가 없어서
글자가 전부 두부(□)로 나온다. 로컬에서 `bun run gen:resume`을 돌려 커밋한다.

## 2. 아키텍처 — MVVM + feature-first

```
src/
├── common/                    # 크로스 피처. 루트 배럴 없음.
│   ├── components/
│   │   ├── ui/                #   프리미티브 (shadcn CLI 생성, 손으로 안 만든다)
│   │   └── layout/            #   앱을 아는 조합 컴포넌트 (AppProviders 포함)
│   ├── lib/                   #   라이브러리 설정·싱글턴 (i18n, dayjs, site)
│   └── utils/                 #   순수 헬퍼 (cn)
├── content.config.ts          # collection 정의. 스키마는 각 feature의 models가 소유한다
├── content/                   # MDX·yaml 원본 (projects, posts, resume)
├── features/<name>/
│   ├── index.ts               #   feature 배럴 — 바깥에서 볼 수 있는 유일한 표면
│   ├── models/                #   콘텐츠 zod 스키마와 도메인 타입
│   ├── viewmodels/            #   훅과 순수 선택·정렬 로직
│   └── views/
│       ├── components/        #     props만 받는 표현 컴포넌트
│       └── pages/             #     ViewModel을 호출하는 화면 전체 프레임
├── layouts/                    # Astro. 정적 셸(<head>, 공통 마크업). UI 텍스트는 여기 없다.
├── pages/
│   ├── _islands/               #   페이지가 마운트하는 하이드레이션 경계 하나.
│   │                           #   `_` 접두사는 Astro 라우터가 라우트로 안 보게 하는 관례
│   ├── [...lang]/              #   ko(`/`)와 en(`/en/`)을 한 파일에서 낸다
│   ├── blog/[slug].astro       #   글은 원본 언어 한 벌이라 `[...lang]` 밖이다
│   ├── resume/[lang].astro     #   PDF 원본. noindex
│   ├── rss.xml.ts, 404.astro   #   피드 + 라우팅
├── locales/{ko,en}/           # i18next-cli 생성
└── mocks/                     # MSW. dev·Storybook·vitest·Playwright 공유
```

### 계층 접근 규칙

| 계층         | 책임                                | 콘텐츠 접근                      |
| ------------ | ----------------------------------- | -------------------------------- |
| Model        | zod 스키마·도메인 타입. 로직 없음.  | **`astro:content` 금지** — zod만 |
| ViewModel    | 훅·선택·정렬·클라이언트 상태        | 없음 (props로 받는다)            |
| View         | UI                                  | **없음** — ViewModel 훅만        |
| Page(.astro) | `getCollection` → 아일랜드로 넘기기 | **`astro:content`는 여기서만**   |

**Model이 `astro:content`를 import하면 안 되는 이유**: Storybook과 vitest가 그 가상 모듈을
해석하지 못한다. `verbatimModuleSyntax: true`라서 `import { type CollectionEntry }`가 빈
side-effect import로 런타임에 살아남아 실제로 터진다. 그래서 스키마의 방향이
`features/*/models` → `src/content.config.ts`다 (반대가 아니다).

한 방향이다. View↛Model, ViewModel↛View, Model↛상위.
`eslint-plugin-boundaries`가 한국어 메시지로 막는다.

**View가 Model 타입이 필요하면** ViewModel 배럴이 재export한다 (`viewmodels/index.ts`).
이게 정식 경로다. `views/`에서 `../models`를 직접 import하면 린트 에러다.

### 왜 `.astro`가 아니라 `pages/_islands/`가 마운트를 하나로 묶나

`<AppProviders client:load><TodosPage /></AppProviders>`처럼 `.astro` 템플릿에서
프레임워크 컴포넌트를 직접 중첩하면, Astro가 자식을 별도 렌더 패스로 처리해서
`QueryClientProvider` 같은 React context가 안 이어진다(`No QueryClient set` 빌드 에러).

그래서 Provider와 View를 `pages/_islands/*.tsx`에서 순수 React 트리 하나로 미리 합치고,
`.astro`는 그 컴포넌트 하나에만 `client:load`를 건다. 새 페이지를 추가할 때도 같은 패턴 —
`.astro`가 프레임워크 컴포넌트를 두 개 이상 중첩하면 의심한다.

`_islands/`가 `pages/` 바깥이 아니라 안에 있는 이유: 아일랜드는 항상 페이지 하나에 딸린
라우팅 글루라서, `common/`·`features/`처럼 독립된 도메인 코드와 나란히 두면 오히려
관계가 안 보인다. `_` 접두사가 없으면 Astro가 "Unsupported file type in pages directory"
경고를 낸다 — 파일을 옮기라는 게 아니라 라우팅 대상이 아님을 표시하라는 뜻이다.

### Storybook은 Astro를 모른다

`common/`과 `features/*/views`는 순수 `.tsx` React라서 `@storybook/react-vite`가
Vite + React + Tailwind만으로 그대로 돌아간다(루트 `vite.config.ts`는 Storybook·vitest
전용이고 `astro.config.ts`와 무관하다). `.astro`는 스토리 대상이 아니다 — 텍스트도
로직도 없이 페이지·레이아웃 셸만 맡기 때문이다.

### import 규칙

- `@/common/<area>`만. `@/common`(루트 배럴)은 없고, `@/common/components/ui/button`은 금지.
- 다른 feature는 `@/features/<name>` 배럴만. 내부 경로 직접 접근 금지.
- 같은 feature 안에서는 `../models`, `../../viewmodels` 처럼 **디렉토리**를 가리킨다.
- `astro:content`·`astro:assets` 같은 Astro 빌드타임 가상 모듈은 `.astro`에서만.

### 배럴 규칙

- named export만. `export { default as X }` 금지, `export *`도 쓰지 않는다
  (예외: `common/lib/index.ts` — 부수효과 트리거를 겸한다).
- `import/no-default-export`가 `src/**`에서 에러다. 스토리·`.astro` 파일만 예외.
- **이름은 정의부와 사용부가 같다.** `import { Button as Btn }` 같은 리네임을 하지 않는다
  (진짜 충돌이 날 때만). 심볼 하나를 레포 전체에서 한 이름으로 검색할 수 있어야 한다.
- `.astro` 컴포넌트는 Astro가 default export를 강제한다 — 이름을 못 고정하는 유일한 자리다.
  그래서 **파일명을 PascalCase로 그대로 옮긴 이름**을 쓴다:
  `base-layout.astro` → `BaseLayout`. `Layout` 같은 축약은 쓰지 않는다.

### 완결 예시

`src/features/projects/`가 전 계층을 한 번씩 다 보여준다. 새 기능을 만들 땐 여기를 베낀다.

- `models/index.ts` — `projectSchema`(zod) + `PROJECT_DOMAINS` 같은 도메인 상수
- `viewmodels/select-projects.ts` — React 없는 순수 로직 (+ `.test.ts`)
- `viewmodels/use-domain-filter.ts` — URL 쿼리를 `useSyncExternalStore`로 읽는다
- `views/components/project-card/` — props만 받음. `namespace Props`
- `views/pages/projects-page.tsx` — ViewModel 호출 + 화면 조립
- `pages/_islands/projects-island.tsx` — `AppProviders` + 페이지 합본
- `pages/[...lang]/projects/index.astro` — `getCollection` → props → `client:load`

## 3. 새 기능 추가 절차

`/new-feature <name>` 커맨드가 아래를 다 해준다. 손으로 할 때 빠뜨리기 쉬운 게 4·5번이다.

1. `src/features/<name>/{models,viewmodels,views/{components,pages}}` + 각 `index.ts`
2. `models/index.ts`에 zod 스키마. 콘텐츠면 `src/content.config.ts`가 그걸 import한다
3. `viewmodels/select-<name>.ts` — 순수 선택·정렬 로직 (+ `.test.ts`)
4. `src/common/lib/i18n.ts`의 `I18N_NAMESPACES`와 `resources`에 네임스페이스 등록
5. `src/pages/_islands/<name>-island.tsx` — `AppProviders` + feature page 합본
6. `src/pages/[...lang]/<name>/index.astro` — `getCollection` → props → 아일랜드
7. `src/common/components/layout/site-header`의 `NAV_SECTIONS`에 한 줄
8. `bun run gen && bun run check`

로케일 JSON은 4번에서 만들지 않는다 — `t()`를 쓰고 `bun run gen:i18n`이 만든다.
그 파일이 생긴 뒤에 i18n.ts에서 import한다(순서를 바꾸면 import가 깨진다).

## 4. UI

### shadcn/ui

- **프리미티브를 손으로 만들지 않는다.** `bun run ui:add <name>` 후
  `src/common/components/index.ts`에 재export.
- 스타일은 `base-nova` = **Base UI**. Radix가 아니다.
  → 합성은 `asChild`가 아니라 **`render` prop**: `<Button render={<a href="/">…</a>} />`
- 아이콘은 **Phosphor**. `components.json`의 `iconLibrary`가 `phosphor`라 CLI가 알아서
  `@phosphor-icons/react`로 생성한다. 손으로 바꿀 일 없다.
- 생성된 `ui/**`는 린트 예외가 걸려 있다. 고치지 말고 재생성한다.

### 컴포넌트 규약

- 폴더 = 컴포넌트 이름(kebab-case). 구현은 `index.tsx`, 스토리는 `index.stories.tsx`.
- **스토리 없는 컴포넌트는 만들지 않는다.** ViewModel을 목킹하고 faker를 쓰면 된다.
- 스토리 `title`은 도메인 접두: `Common/…`, `<Feature>/…`, `<Feature>/Pages/…`
- props 타입은 declaration-merged namespace:
  ```tsx
  export declare namespace Button {
    export type Props = { … };
  }
  ```
  `declare`를 빼면 `react-refresh/only-export-components`가 경고한다.

### 스타일

- 손으로 쓰는 variants는 `tailwind-variants`(`tv()`). shadcn이 만든 CVA는 그대로 둔다.
- 색을 하드코딩하지 않는다. `src/styles.css`의 시맨틱 토큰(`bg-card`, `text-muted-foreground`)만.
- 정렬은 `prettier-plugin-tailwindcss`가 한다. 손으로 정렬하지 않는다.

### 이미지

- **날 `<img>`는 린트 에러다.** `astro:assets`의 `<Image />`/`<Picture />`를 쓴다 —
  WebP 변환·srcset·width/height가 자동으로 붙는다.
- 최적화 대상은 `src/` 안의 이미지뿐이다. `public/`은 그대로 나간다(파비콘·OG·PDF만).
- MDX 본문의 `![](../../assets/x.png)`도 같은 최적화를 탄다.
- React 아일랜드는 `<Image />`를 못 쓴다. 그럴 땐 `.astro`에서 `getImage()`로 만든
  src·srcset·width·height를 props로 넘기고, 그 줄에만 예외를 단다.

## 5. 데이터

서버가 없다. 모든 콘텐츠는 빌드 타임에 `src/content/`에서 읽어 HTML로 굳는다.

### Content Collections

| 컬렉션     | 원본                                 | 언어 처리                      |
| ---------- | ------------------------------------ | ------------------------------ |
| `projects` | `src/content/projects/{ko,en}/*.mdx` | 디렉토리. 슬러그가 hreflang 짝 |
| `posts`    | `src/content/posts/*.mdx`            | frontmatter `lang`. 번역 없음  |
| `resume`   | `src/content/resume/{ko,en}.yaml`    | 파일명이 곧 언어               |

- 스키마는 **feature의 `models/`가 소유**하고 `src/content.config.ts`가 import한다.
  방향을 뒤집으면 Storybook·vitest가 Model을 못 읽는다(2장 참고).
- `getCollection()`은 빌드 타임 전용이다. `.astro`가 읽어서 아일랜드에 props로 넘긴다.
- collection id를 손으로 자르지 않는다 — `parseProjectId()`처럼 검증하는 함수를 쓴다.
  `as` 캐스트로 넘기면 잘못 놓인 파일이 조용히 이상한 라우트를 만든다.
- `Date`는 경계에서 ISO 문자열로 바꾼다(`toPostSummary`). props로 넘어가며 어차피
  직렬화되므로, 안 바꾸면 타입이 거짓말을 한다.

### 런타임 상태

- `@tanstack/react-query`는 남아 있지만 **소비자가 아직 없다.** GitHub API(star 수,
  기여 그래프)를 붙일 때 첫 소비자가 생긴다.
- MSW도 같은 이유로 배선만 있다. `.env`의 `PUBLIC_ENABLE_MSW`는 기본 `false`다 —
  목킹할 게 없는데 켜두면 서비스워커가 모든 요청을 경유시키다 `passthrough` 실패를 던진다.
- **렌더를 막는 게이트를 만들지 않는다.** `if (!ready) return null`은 클라이언트에선 한
  프레임이지만 빌드 타임에는 영원이다 — 아일랜드가 SSR을 통째로 건너뛰고 본문이
  하이드레이션 `<template>`에 갇힌다. 로딩이 필요하면 그 쿼리에 `enabled`를 건다.
- 폼이 필요해지면 `@tanstack/react-form`을 그때 다시 깐다. 지금은 `mailto:`뿐이다.

### 이력서 PDF

`src/content/resume/{ko,en}.yaml` 하나가 두 곳으로 나간다.

- `/about` — 이력서 본문을 HTML로 그린다. `bun run gen:resume`이 **같은 페이지**를 Chromium
  인쇄 엔진으로 구워 `public/resume-{lang}.pdf`를 만든다. 화면과 PDF가 같은 컴포넌트에서
  나오므로 어긋날 수가 없다 — 사이트 크롬은 `print:hidden`이 걷어낸다.
- **주요 프로젝트 섹션은 yaml에 없다.** `projects` 컬렉션에서 자동으로 채워진다.
  이력서용으로 프로젝트를 다시 쓰지 않는다.

브라우저 인쇄 대화상자를 쓰지 않는 이유는 `scripts/gen-resume.ts` 주석에 있다.

## 6. i18n & dayjs

### 로케일 JSON은 전부 i18next-cli가 만든다

`src/locales/**`를 **손으로 편집하지 않는다.** 키는 코드에서 `t()`를 쓰면 생기고,
호출부를 지우면 `removeUnusedKeys`가 키도 지운다. 사람이 채우는 건 값(번역문)뿐이다.

`.astro`는 추출 대상이 아니다 — 텍스트는 전부 `.tsx` 아일랜드에 있다.

| 명령                                      | 하는 일                                         |
| ----------------------------------------- | ----------------------------------------------- |
| `bun run gen:i18n`                        | 추출 + 타입 생성. 키를 추가/삭제한 뒤 항상 이것 |
| `bun run i18n:status`                     | 언어별 번역 진행률                              |
| `bun run i18n:sync`                       | 보조 언어 파일을 기준 언어(ko) 구조에 맞춤      |
| `bun run i18n:lint`                       | 키로 빠져야 할 하드코딩 문자열 탐지             |
| `bunx i18next-cli rename-key <old> <new>` | 소스와 JSON을 한 번에 리네임                    |

키 이름을 바꿀 때도 JSON을 열지 않는다 — `rename-key`가 호출부와 파일을 같이 고친다.
CI는 `bun run gen` 후 `git diff --exit-code`로 JSON이 최신인지 검증한다.

- 네임스페이스 = feature 이름 + `common`. `defaultNS`는 `common`.
- **키는 문자열이 아니라 셀렉터 함수로 부른다** (`enableSelector: true`, `i18next.config.ts`):
  `t(($) => $.form.submit)`. `t('form.submit')`은 쓰지 않는다 — 자동완성·정의로 이동·
  오타 시 컴파일 에러가 이 형태에서만 나온다.
- 컴포넌트는 **네임스페이스 하나를 바인딩**한다: `useTranslation('projects')`.
  셀렉터는 그 네임스페이스 기준으로 풀린다 (`$.page.title` = `projects:page.title`).
- 다른 네임스페이스 키가 필요하면 `t(($) => $.actions.switchLanguage, { ns: 'common' })`처럼
  옵션으로 넘긴다.
- 값 보간은 옵션 객체로: `t(($) => $.page.remaining, { value: remaining })`.
- 새 키를 넣었으면 `bun run gen:i18n`. ko를 먼저 채우고 en을 채운다.
- **`extractFromComments`가 켜져 있다.** 주석 안에 번역 호출을 그대로 써두면 진짜 키가 생긴다.
  주석에는 설명만 쓰고 호출 형태를 붙여넣지 않는다.
- 동적 키는 셀렉터로 표현할 수 없다 — 정적 맵을 만들어서 각 항목을 셀렉터로 호출한다
  (`use-project-labels.ts` 참고).
- `src/@types/i18next.d.ts`도 생성물이다. `enableSelector`를 바꾸려면 이 파일이 아니라
  `i18next.config.ts`의 `types.enableSelector`를 고치고 파일을 지운 뒤 `bun run gen:i18n`한다
  — 이미 존재하는 파일은 i18next-cli가 다시 쓰지 않는다 (최초 생성 시에만 config를 반영).
- **문서 메타데이터는 `locales/`가 아니라 `common/lib/site.ts`에 둔다.** `<title>`·
  description·OG는 `.astro`에서만 쓰이는데 `.astro`는 추출 대상이 아니라, 억지로 키를
  만들면 `removeUnusedKeys`가 다음 `bun run gen`에 지운다.
- 라우트 제목은 **`common:nav.*`를 재사용한다** (`i18n.getFixedT(lang, 'common')`).
  그 키는 `SiteHeader`가 실제로 렌더해서 절대 안 지워진다. `.astro`에서만 쓰는 새 키를
  만드는 순간 조용히 사라지는 쪽으로 간다.
- dayjs 로케일은 `common/lib/dayjs.ts`가 i18next를 따라가게 해뒀다. 직접 `dayjs.locale()`을 부르지 않는다.
- **언어는 URL이 정한다.** `/`가 ko, `/en/`이 en이고 `[...lang]` rest 파라미터 하나가 둘을
  같이 낸다. 브라우저 언어는 보지 않는다 — 정적 사이트에서 런타임 감지는 크롤러에게
  한 벌만 보여줘서 hreflang을 만들 수 없다.
- `getStaticPaths`가 반환하는 객체는 **매번 새로 만든다**(`languagePaths()`가 함수인 이유).
  Astro가 라우트별로 그 객체에 내부 상태를 붙여서, 같은 인스턴스를 여러 라우트가 공유하면
  두 번째 라우트부터 `NoMatchingStaticPathFound`로 빌드가 깨진다.

## 7. 테스트

- **스토리가 곧 테스트다.** 모든 `*.stories.tsx`가 vitest 브라우저 프로젝트(chromium)에서 실행되고,
  `play()`가 있으면 인터랙션 테스트가 된다. a11y 위반은 실패다.
- 순수 로직만 `*.test.ts` (jsdom 프로젝트).
- e2e는 사용자 여정 하나에 spec 하나. 컴포넌트 상태 조합은 Storybook이 이미 커버한다.
- **e2e는 dev가 아니라 빌드 결과물(`astro preview`)을 상대로 돈다.** RSS·sitemap·PDF 같은
  빌드 산출물을 검사하고, dev 데몬과 포트를 다투지 않기 위해서다. `test:e2e`가 먼저 빌드한다.
- 아일랜드는 Playwright의 actionability로 하이드레이션 여부를 알 수 없다. 클릭 전에
  `astro-island[ssr]`가 0개가 될 때까지 기다린다(`e2e/projects.spec.ts`의 `waitForHydration`).
- JS를 끈 컨텍스트로 본문이 읽히는지 보는 회귀 테스트가 있다. 아일랜드가 SSR을 건너뛰는
  버그가 실제로 났었고, 브라우저에서는 안 보인다.
- 비동기로 갱신되는 컨트롤은 Playwright `check()` 말고 `click()` + `toBeChecked()`.
  `check()`는 상태가 오기 전에 다시 클릭해서 되돌린다.
- `bun run test:e2e`가 Claude Code 같은 AI 에이전트 환경에서 막히면 — Astro 7은 그런 환경을
  감지하면 `astro dev`를 백그라운드 데몬으로 돌리는데, 그러면 Playwright의 foreground 가정이
  깨진다. `playwright.config.ts`가 이미 `ASTRO_DEV_BACKGROUND=0`으로 강제 꺼뒀다.

## 8. es-toolkit

- 유틸을 직접 만들기 전에 `es-toolkit`에 있는지 본다. lodash는 쓰지 않는다.
- 변환 파이프라인은 `es-toolkit/fp` + `pipe`.
- `es-toolkit/compat`은 피한다 (lodash 호환 레이어).
- **안 쓰는 경우**: 날짜는 dayjs, 클래스 병합은 `cn`, 네이티브 한 줄로 되는 것.

## 9. Commits & PRs

`<type>: <title>`, 명령형. PR 전에 `bun run verify`.

`feat` 새 기능 · `fix` 버그 · `docs` 문서 · `style` 서식 · `refactor` 구조 ·
`test` 테스트 · `chore` 잡무 · `ci` CI 설정

## 10. LLM 지침

- **한국어로 답한다.**
- `git reset --hard` 같은 파괴적 명령은 명시적으로 요청받았을 때만.
- 컴포넌트를 만들면 스토리도 만든다. 예외 없다.
- 린트 규칙을 끄는 커밋을 만들지 않는다. 막히면 물어본다.
- 생성물(`src/api`, `src/@types`)을 편집하지 않는다.

## 11. 지금 있는 것

| 라우트                           | 내용                                   |
| -------------------------------- | -------------------------------------- |
| `/`, `/en/`                      | 히어로 + pinned 프로젝트 3 + 최근 글 3 |
| `/projects/`, `/en/projects/`    | 도메인 필터(`?domain=`) + 카드 목록    |
| `/projects/<slug>/` (+`/en/`)    | MDX 상세                               |
| `/blog/`, `/en/blog/`            | 글 목록 (UI만 이중언어)                |
| `/blog/<slug>/`                  | MDX 본문. 원본 언어 한 벌              |
| `/about/`, `/en/about/`          | 소개·연락 + 이력서 PDF 뷰어            |
| `/resume/{ko,en}/`               | PDF 원본. `noindex`                    |
| `/rss.xml`, `/sitemap-index.xml` | 피드·색인                              |

아직 안 채운 것: `src/content/resume/*.yaml`의 `timeline`·`skills`가 빈 배열이고,
프로젝트가 하나뿐이다. `public/og.png`는 있다.

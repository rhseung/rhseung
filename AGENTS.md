# Agent Guide

## 0. 이 파일을 읽는 법

- Claude Code(`CLAUDE.md`가 이 파일을 import한다), Cursor, Copilot이 전부 이 파일 하나를 본다.
- 여기 적힌 규칙 대부분은 **ESLint가 강제**한다. 애매하면 `bun run lint`가 정답이다.
- 규칙이 불편하면 규칙을 끄지 말고 물어봐라. 대부분은 이유가 있고, 없으면 같이 지우면 된다.
- "어디에 파일을 두면 되나" 는 `docs/registries.md`가 지도다. 여기는 이유, 거기는 자리.
- 인프라 전체 그림은 `OVERVIEW.md`에 있다. 사람이 처음 읽는 자리다.

## 1. Environment & Tooling

- **Bun만 쓴다.** npm/yarn/pnpm 금지. 설치, 스크립트, lockfile 전부 Bun.
- **TypeScript는 6.x에 고정**되어 있다. 7은 `typescript-eslint`가 아직 지원하지 않아
  type-aware linting이 통째로 깨진다. 올리지 말 것.
- `es-toolkit`이 있다. 유틸을 직접 만들기 전에 먼저 찾아본다. lodash는 쓰지 않고
  `es-toolkit/compat`은 피한다. 다만 날짜는 dayjs, 클래스 병합은 `cn`, 네이티브 한 줄로
  되는 것은 그대로 둔다.
- **도구 버전은 `mise.toml`이, 나머지 npm 패키지는 `package.json`이 잠근다.** 배포 파이프라인,
  secret(`fnox`), Cloudflare 설정에서 겪은 것은 `docs/deploy.md`에 있다.

| 명령                | 언제                                                 |
| ------------------- | ---------------------------------------------------- |
| `bun run dev`       | 개발 (:4321)                                         |
| `bun run dev:prod`  | production처럼 (WIP gate 켜고) 개발                  |
| `bun run storybook` | 컴포넌트 작업 (:6006)                                |
| `bun run check`     | **커밋 전** - prettier --write + eslint --fix        |
| `bun run verify`    | **PR 전** - format+lint+typecheck+doctor+test+readme |
| `bun run gen`       | `t()` key를 추가하거나 삭제한 뒤                     |

`typecheck`는 `tsc`가 아니라 `astro check`다. `.astro` 파일은 tsc가 읽지 못한다. worker만
`tsc -p worker`로 따로 본다. workerd는 DOM이 없어서 루트 tsconfig와 같은 program에 둘 수
없기 때문이다. 그 여파는 `docs/deploy.md`의 Worker 절에 있다.

**worker의 `Env`는 손으로 쓰지 않는다.** `wrangler types`가 `wrangler.jsonc`에서
`worker/env.d.ts`를 만들고, `typecheck`가 `tsc -p worker` 앞에서 그것을 돌린다. binding
이름을 바꾸면 쓰는 자리가 전부 compile error가 된다. secret은 설정 파일에 없으므로
`worker/secrets.d.ts`가 같은 `Env` interface에 선언 병합으로 얹는다.

**생성물은 손대지 않고, 커밋하지도 않는다.** `src/types/i18next.d.ts`와 `resources.d.ts`,
`worker/env.d.ts`, `public/resume-*.pdf`, `styled-system/`이 그렇다. 손으로 고치면 다음 `bun run gen`에 사라진다.
`src/types/`는 폴더가 아니라 **파일 이름으로** ignore한다. 같은 폴더에 손으로 쓴 ambient
선언이 같이 살기 때문이다(지금은 `citation-js.d.ts` 하나). 폴더를 막고 `!`로 그것만 빼면,
손으로 쓴 파일 이름이 바뀔 때 조용히 추적에서 빠져 fresh clone에서 사라진다.
`src/locales/**`는 생성물이 아니다. key는 추출기가 만들지만 **값(번역문)은 사람이 채운다.**
자세한 것은 `docs/deploy.md`.

**collection schema를 바꿨으면 `.astro/`와 `node_modules/.astro`를 지운다.** 캐시가 파일
내용으로만 갱신을 정해서, schema만 바꾸면 옛 모양이 남아 dev와 빌드가 같이 깨진다.
에러가 컴포넌트를 가리켜서 캐시를 의심하기 어렵다.

```sh
astro dev stop && rm -rf .astro node_modules/.astro dist && bun run dev
```

## 2. 아키텍처 - MVVM + feature-first

```
src/
├── common/                    # 크로스 피처. 루트 배럴 없음.
│   ├── components/
│   │   ├── ui/                #   프리미티브 (shadcn 에서 받아 온 것. 고칠 때 우리 것이 된다)
│   │   └── layout/            #   앱을 아는 조합 컴포넌트 (AppProviders 포함)
│   ├── lib/                   #   i18n/, routing/, content/ 로 나뉜다. 표면은 배럴 하나
│   └── styles/                #   config/ 는 panda.config.ts 가 읽고, recipes/ 만 배럴에 오른다
├── content.config.ts          # collection 정의. 스키마는 각 feature의 models가 소유한다
├── content/                   # MDX, yaml 원본 (projects, posts, resume)
├── features/<name>/
│   ├── index.ts               #   feature 배럴 - 바깥에서 볼 수 있는 유일한 표면
│   ├── models/                #   콘텐츠 zod 스키마와 도메인 타입
│   ├── viewmodels/            #   훅과 순수 선택, 정렬 로직
│   └── views/
│       ├── components/        #     props만 받는 표현 컴포넌트
│       └── pages/             #     ViewModel을 호출하는 화면 전체 프레임
├── layouts/                    # 셸(<head>, 공통 마크업)과 셸이 붙이는 script. UI 텍스트 없음
├── pages/
│   ├── _islands/               #   페이지가 마운트하는 하이드레이션 경계 하나.
│   │                           #   `_` 접두사는 Astro 라우터가 라우트로 안 보게 하는 관례
│   ├── [lang]/                 #   모든 라우트가 `/ko/...` 또는 `/en/...` 아래 있다
│   ├── rss.xml.ts, 404.astro   #   피드 + 라우팅
├── locales/{ko,en}/           # i18next-cli 생성
└── mocks/                     # story 가 props 로 쓰는 목 데이터. 네트워크 목킹은 없다
```

### 계층 접근 규칙

| 계층         | 책임                                 | 콘텐츠 접근                      |
| ------------ | ------------------------------------ | -------------------------------- |
| Model        | zod 스키마, 도메인 타입. 로직 없음.  | **`astro:content` 금지** - zod만 |
| ViewModel    | 훅, 선택, 정렬, 클라이언트 상태      | 없음 (props로 받는다)            |
| View         | UI                                   | **없음** - ViewModel 훅만        |
| Page(.astro) | `getCollection` -> 아일랜드로 넘기기 | **`astro:content`는 여기서만**   |

**Model이 `astro:content`를 import하면 안 되는 이유**: Storybook과 vitest가 그 가상 모듈을
해석하지 못한다. `verbatimModuleSyntax: true`라서 `import { type CollectionEntry }`가 빈
side-effect import로 런타임에 살아남아 실제로 터진다. 그래서 스키마의 방향이
`features/*/models` -> `src/content.config.ts`다 (반대가 아니다).

한 방향이다. View는 Model을, ViewModel은 View를, Model은 상위 계층을 모른다.
`eslint-plugin-boundaries`가 한국어 메시지로 막는다.

**View가 Model 타입이 필요하면** ViewModel 배럴이 재export한다 (`viewmodels/index.ts`).
이게 정식 경로다. `views/`에서 `../models`를 직접 import하면 린트 에러다.

**collection entry를 받는 ViewModel은 구조 타입으로 받는다.** `detailSlugs`, `detailPaths`,
`pickBody`가 `entries: readonly { id: string }[]` 또는 `<E extends { id: string }>`를 받는
이유다. `CollectionEntry`를 받으면 `astro:content`가 딸려 와서 그 함수가 vitest에서 못 돈다.
id 모양은 `<slug>/<lang>`이고, 그 파싱은 `.astro` frontmatter가 아니라 ViewModel이 한다.

### 왜 `.astro`가 아니라 `pages/_islands/`가 마운트를 하나로 묶나

`<AppProviders client:load><TodosPage /></AppProviders>`처럼 `.astro` 템플릿에서
프레임워크 컴포넌트를 직접 중첩하면, Astro가 자식을 별도 렌더 패스로 처리해서
`QueryClientProvider` 같은 React context가 안 이어진다(`No QueryClient set` 빌드 에러).

그래서 Provider와 View를 `pages/_islands/*.tsx`에서 순수 React 트리 하나로 미리 합치고,
`.astro`는 그 컴포넌트 하나에만 `client:load`를 건다. 새 페이지를 추가할 때도 같은 패턴이다.
`.astro`가 프레임워크 컴포넌트를 두 개 이상 중첩하면 의심한다.

**`src/pages/`의 파일은 전부 라우트다.** `*.test.ts`나 `*.stories.tsx`를 여기 두면 Astro가
`/robots.txt.test` 같은 라우트로 잡아 prerender가 빌드 타임에 실행한다. `verify`는 빌드를 안
돌아서 그것을 못 잡고 배포 빌드만 깨진다. 로직을 라우트 밖으로 옮기고 거기서 테스트한다.
lint가 막는다.

**dev에는 worker가 없다.** `astro.config.ts`의 `workerDevServer`가 worker의 응답 함수
(`faviconResponse`, `rootResponse`)를 middleware로 물려 로컬에서도 같은 화면이 나오게 한다.
그 hook은 **값을 돌려주면 안 된다.** Vite가 반환값을 post hook으로 보는데 connect app은 그
자체가 함수라, `use()`의 반환을 그대로 돌려주면 Vite가 인자 없이 호출해서 터진다.
`configurePreviewServer`도 같이 달려 있지만 **정적 `astro preview`에서는 호출되지 않는다** -
preview는 `/api/favicon/*`이 404고 `/`는 빌드된 폴백을 탄다.

`_islands/`가 `pages/` 바깥이 아니라 안에 있는 이유: 아일랜드는 항상 페이지 하나에 딸린
라우팅 글루라서, `common/`, `features/`처럼 독립된 도메인 코드와 나란히 두면 오히려
관계가 안 보인다. `_` 접두사가 없으면 Astro가 "Unsupported file type in pages directory"
경고를 낸다 - 파일을 옮기라는 게 아니라 라우팅 대상이 아님을 표시하라는 뜻이다.

### 셸이 붙이는 script

`layouts/`에는 `.astro` 셸 말고 브라우저에서 도는 script 둘이 있다. island가 아니라
`layout.astro`가 직접 붙이므로 그 옆이 자리다.

- `theme.js`는 첫 paint 전에 `<html data-theme>`를 정한다. `?raw`로 읽어 `is:inline`에
  싣기 때문에 **import를 쓸 수 없다.** `common/viewmodels/theme-store.ts`와 같은 판정을 두 벌
  갖고 있는데, 합치려고 module로 바꾸면 script가 paint 뒤에 돌아 첫 화면이 깜빡인다. 두 벌이
  어긋나지 않는지는 `theme.test.ts`가 `?raw`로 읽어 검증한다.
- `view-transitions.ts`는 `astro:before-preparation`과 `astro:after-swap`에 붙어 목록과 상세의
  제목을 짝짓는다. 짝은 이동할 때 정해지므로 `<style>` 하나를 만들어 규칙을 갈아끼운다.
  대상 element에 inline style을 주는 쪽으로 바꾸면 `html:not([data-theme-transition])` 가드가
  JS 시점 판정이 되어 theme 전환과 겹칠 때 동작이 달라진다.

`document`를 직접 만지는 자리는 이 둘과 `viewmodels/`의 theme 전환, 본문 heading 추적뿐이다.
전부 브라우저 API가 `document`에 달려 있어서고, React로 감싸면 한 겹만 는다.

### Storybook은 Astro를 모른다

`common/`과 `features/*/views`는 순수 `.tsx` React라서 `@storybook/react-vite`가
Vite + React + Panda(PostCSS)만으로 그대로 돌아간다(루트 `vite.config.ts`는 Storybook, vitest
전용이고 `astro.config.ts`와 무관하다). `.astro`는 스토리 대상이 아니다 - 텍스트도
로직도 없이 페이지, 레이아웃 셸만 맡기 때문이다.

### import 규칙

- `@/common/<area>`만. `@/common`(루트 배럴)은 없고, `@/common/components/ui/button`은 금지.
- 다른 feature는 `@/features/<name>` 배럴만. 내부 경로 직접 접근 금지.
- 같은 feature 안에서는 `../models`, `../../viewmodels`처럼 **디렉토리**를 가리킨다.
- `astro:content`, `astro:assets` 같은 Astro 빌드타임 가상 모듈은 `.astro`에서만.
- **한 파일은 한 개념을 선언한다.** 도메인이 둘이면 파일도 둘. export가 많은 건 괜찮고
  서로 다른 개념이 섞이는 게 문제다 (`career/models/types.ts`가 Career, Award, SkillGroup을
  한 파일에 둔 게 반례).

### 배럴 규칙

- named export만. `export { default as X }` 금지.
- **`common/components`는 폴더마다 배럴을 두고 `export *`로 걷어올린다.** `ui/`, `layout/`,
  `mdx/`가 각자 `index.ts`를 갖고, 루트 배럴은 그 셋을 재export하는 세 줄이다. 컴포넌트를
  추가할 때 루트 배럴을 안 고쳐도 되고, 심볼을 빠뜨려 "있는데 안 보이는" 상태가 안 생긴다.
  이름 충돌은 빌드가 잡는다.
- **무겁거나 node 전용인 모듈은 배럴에 올리지 않는다.** 배럴은 island와 story가 타는 길이라,
  올리는 순간 그것을 쓰는 화면 전부가 같이 받는다. zod는 52KB를 얹고, `render-paper`의
  citation-js와 unified-latex는 브라우저에서 `node:fs`를 찾다 story를 죽인다. 그래서
  `content-schema.ts`, `contributions-schema.ts`, `render-paper.ts`는 배럴 밖이고 쓰는 쪽이
  파일을 직접 가리킨다. lint 예외가 그 세 자리에 붙어 있는 이유다.
- `import/no-default-export`가 `src/**`에서 에러다. 스토리, `.astro` 파일만 예외.
- **이름은 정의부와 사용부가 같다.** `import { Button as Btn }` 같은 리네임을 하지 않는다
  (진짜 충돌이 날 때만). 심볼 하나를 레포 전체에서 한 이름으로 검색할 수 있어야 한다.
- `.astro` 컴포넌트는 Astro가 default export를 강제한다 - 이름을 못 고정하는 유일한 자리다.
  그래서 **파일명을 PascalCase로 그대로 옮긴 이름**을 쓴다:
  `base-layout.astro` -> `BaseLayout`. `Layout` 같은 축약은 쓰지 않는다.

### 완결 예시

`src/features/projects/`가 전 계층을 한 번씩 다 보여준다. 새 기능을 만들 땐 여기를 베낀다.

- `models/types.ts` - `ProjectItem` 같은 도메인 타입 + `PROJECT_STATUSES` 같은 상수
- `models/define.ts` - 콘텐츠 파일이 부르는 `defineProject`
- `models/index.ts` - `import.meta.glob`으로 `src/content/projects/`를 모아 `projectsOf(lang)`로 낸다
- `viewmodels/select-projects.ts` - React 없는 순수 로직 (+ `.test.ts`)
- `viewmodels/use-project-filters.ts` - URL query(`?stack=`, `?q=`)를 `nuqs`로 읽는다
- `views/components/project-card/` - props만 받음. `namespace Props`
- `views/pages/projects-page.tsx` - ViewModel 호출 + 화면 조립
- `pages/_islands/projects-island.tsx` - `AppProviders` + 페이지 합본
- `pages/[lang]/projects/index.astro` - `getCollection` -> props -> `client:load`

## 3. 새 기능 추가 절차

`/new-feature <name>` 커맨드가 스캐폴드부터 route까지 다 해준다. 손으로 할 때 빠뜨리기
쉬운 것은 둘이다. `src/pages/_islands/<name>-island.tsx`를 만드는 것과,
`src/common/viewmodels/use-site-sections.ts`의 `SECTIONS`에 한 줄 넣는 것이다.
어느 파일을 어디에 두는지는 `docs/registries.md`가 지도다.

locale JSON은 손으로 만들지 않는다. `t()`를 쓰고 `bun run gen:i18n`이 만든다.

## 4. UI

스타일을 쓰거나 컴포넌트를 만들기 전에는 `panda-here` skill을 읽는다. css와 cva와 sva를 어디에
쓰는지, token 이름, 같은 속성을 덮어쓸 때의 함정이 거기 있다. 여기에는 그 skill이 다루지 않는
것만 적는다.

### 프리미티브

- `src/common/components/ui/`는 **shadcn에서 가져온 것이다.** 필요해질 때마다 Panda recipe로
  고쳐 쓰고 있지만 아직 대부분은 받아 온 그대로다. 그래서 파일 관례가 `<name>.tsx`로 다르고,
  story도 `badge` 하나뿐이며, `eslint.config.js`가 이 폴더에서 jsx-a11y rule 둘을 끈다.
  **자체 제작으로 고쳐 쓰는 컴포넌트는 그때 폴더 관례로 옮기고 story를 붙인다.** CLI로
  재생성하지는 않는다. 쓰이는 것만 남겼다.
- headless는 **Base UI**다. Radix가 아니다. 합성은 `asChild`가 아니라 **`render` prop**으로
  한다: `<Button render={<a href="/">...</a>} />`
- 아이콘은 **heroicons를 먼저 찾아본다.** 손으로 쓰는 코드는 `@heroicons/react/24/outline`이고,
  채운 변형이 필요하면 `/24/solid`다. 없으면 그때만 `@phosphor-icons/react`를 쓴다. 지금
  phosphor가 남은 자리는 셋뿐이다. `mdx/shortcut`은 mac modifier glyph라 heroicons에 개념이
  없고, `GithubLogo`는 heroicons가 브랜드 로고를 만들지 않으며, `ui/sheet`의 닫기 X가 있다.
- **heroicons는 채운 변형을 prop이 아니라 import 경로로 준다.** phosphor의 `weight="fill"`처럼
  runtime에 바꿀 수 없다. 상태에 따라 채움이 달라지는 자리는 아이콘을 쌍으로 들고 다녀야
  한다(`use-site-sections.ts`의 `Icon`과 `IconSolid`).
- 두 라이브러리를 같은 자리에 꽂는 prop은 `@/common/lib`의 `IconComponent`로 받는다.
- 컴포넌트 안의 아이콘은 크기를 주지 않는다. `& svg:not([class*=size_])`로 컴포넌트가 정한다.

### 컴포넌트 규약

- 폴더 이름이 컴포넌트 이름(kebab-case)이다. 구현은 `index.tsx`, story는 `index.stories.tsx`.
- **story 없는 컴포넌트를 만들지 않는다.** ViewModel을 mocking하고 faker를 쓰면 된다. 다만
  구조가 균일하고 양이 많은 데이터에만 faker를 쓴다. `Tech` 같은 literal union이나 슬러그
  참조처럼 타입이 좁고 의미가 있는 값은 `src/mocks/`에 손으로 적는다.
  **faker를 쓰면 `src/mocks/`에서 seed를 박는다.** 안 박으면 story가 vitest browser project에서
  돌 때마다 데이터가 달라져 시각 회귀를 볼 수 없다.
- story `title`은 도메인 접두사를 붙인다. `Common/...`, `<Feature>/...`, `<Feature>/Pages/...`
- props 타입은 declaration-merged namespace로 적는다.
  ```tsx
  export declare namespace Button {
    export type Props = { ... };
  }
  ```
  `declare`를 빼면 `react-refresh/only-export-components`가 경고한다.

### 폰트

- 본문과 제목 전부 **Pretendard 단독**이다. 라틴까지 Pretendard가 덮는다.
- 코드는 **MonoLisa Code** 단독이고 폴백은 시스템 고정폭(`ui-monospace`)이다. ligature를
  `calt`로 켜는 것은 `src/common/styles/config/global.ts`의 `code, kbd, pre, samp` 블록
  하나다. italic face도 받는 이유는 dark theme `tokyo-night`이 주석을 기울여 내기 때문이다.
- **MonoLisa는 유료라 커밋하지 않는다.** `bun run gen:fonts`가 R2에서 받아 `public/fonts/`에
  굽는다. 받지 못하면 `@font-face`가 실패해 시스템 고정폭으로 떨어진다. fork와 license 없는
  clone이 폴백 코드 없이 그냥 돈다. 자세한 것은 `docs/deploy.md`.
- `size-adjust`는 MonoLisa의 x-height가 커서 같은 `font-size`에 크게 읽히는 것을 되돌린
  값이다. 눈으로 맞춘 값이라 본문 크기를 바꾸면 다시 봐야 한다.
- token은 `fontFamily: 'body' | 'display' | 'mono' | 'serif'`다. `display`는 지금 `body`와 같은
  값이지만 slot을 열어 둔다. 제목 서체를 바꿀 때 값만 바꾸면 되기 때문이다. `serif`는 논문
  전용이다.
- `src/fonts.css`는 **생성물**이다. 손으로 고치지 않고 파일 header의 출처에서 다시 받는다.
  자체 호스팅인 이유는 외부 CDN이면 첫 paint가 남의 서버에 묶이고, Worker가 굽는 이력서 PDF도
  네트워크 상태를 타기 때문이다.

### 스타일에서 skill 바깥의 것

- Tailwind에서 옮긴 이유는 하나다. token 바깥 값을 **compiler가** 막는다(`strictTokens`).
  규칙으로 "색을 하드코딩하지 않는다"고 적어 두는 동안 하드코딩이 하나 들어와 있었다.
- 세 층이다. 원시 token과 semantic token은 `panda.config.ts`와 `src/common/styles/config/`가
  갖고, recipe는 `src/common/styles/recipes/`에 있으며, 컴포넌트는 그것을 부른다. 색은
  `config/palette.ts`가 `Record<ThemeMode, Palette>`로 들어서, theme을 추가하면 palette 전체가
  compile error로 채워진다. `styled-system/`은 생성물이다.
- **`config/`는 배럴에 올리지 않는다.** `panda.config.ts`가 빌드 타임에 상대경로로 직접 읽는
  것들이라, 배럴을 거치면 런타임 번들이 `globalCss`와 palette 전체를 같이 받는다. 배럴
  `src/common/styles/index.ts`는 `recipes/`만 재export한다.
- `bun run lint`의 `scripts/lint-inline-css.ts`가 한 번만 쓰는 `css()`를 변수로 뺀 자리를 잡는다.
- 전역 CSS(`src/common/styles/config/global.ts`)에는 token으로 적을 수 없는 것만 남는다. 페이지 전환
  pseudo-element, KaTeX 내부 DOM, reset이 그렇다.
- 기술 badge의 브랜드 색은 token이 될 수 없다. 기술마다 다르기 때문이다. `techTone`이
  `--brand`를 받아 그 자리에서 tone을 만든다: `<Badge tone="brand" style={brand(hex)}>`
- **badge에 `variant="ghost"`를 쓰지 않는다.** hover 전에는 container가 보이지 않아서 badge로
  읽히지 않는다. 분류축은 `secondary`(채움), 나머지는 `outline`(테두리)이다.

### 외부 링크

- **사이트 밖으로 나가는 링크는 `<ExternalLink />`만 쓴다.** 손으로 `target="_blank"`를 쓰면
  lint error다. 화살표 아이콘과 `rel="noreferrer noopener"`가 같이 빠지기 때문이다.
- favicon은 **MDX 본문 링크에서만** 선다(`<ExternalLink showFavicon />`). 기본값이 꺼짐이라
  카드와 dock과 푸터의 링크는 전부 화살표다. 산문 속 링크는 어디로 가는지가 정보지만, UI
  chrome의 링크는 자리와 label이 이미 말해 주어서 아이콘이 제각각이면 줄만 시끄러워진다.
- favicon은 `<img>`가 아니라 **`<object>`**로 받는다. Worker가 `/api/favicon/<host>`를
  proxy하는데, favicon이 없는 host에는 본문 없는 404를 준다. `<object>`는 그때 자식을 대신
  그리므로 화살표가 `currentColor`로 theme을 그대로 따라간다. `<img>`로는 그 분기를 만들 수
  없다.

### 이미지

- **날 `<img>`는 lint error다.** `astro:assets`의 `<Image />`나 `<Picture />`를 쓴다. WebP
  변환과 srcset과 width/height가 자동으로 붙는다.
- 최적화 대상은 `src/` 안의 이미지뿐이다. `public/`은 그대로 나간다. `icons/`는 우리 favicon
  류, `logos/`는 경력과 학력 기관 로고와 우리 wordmark, `images/`는 og와 아바타와 서명처럼
  로고가 아닌 이미지, `fonts/`는 font다. wordmark가 `images/`에 있었던 적이 있는데 그 폴더에
  로고가 섞이는 것이 이름과 맞지 않아 옮겼다. 루트에 남는 것은
  `resume-*.pdf`(생성물인데 이미 공유된 링크가 있어 경로를 바꾸지 않는다)뿐이다.
  `robots.txt`는 환경마다 내용이 달라야 해서 `src/pages/robots.txt.ts` route다.
- MDX 본문의 `![](../../assets/x.png)`도 같은 최적화를 탄다.
- React island는 `<Image />`를 쓸 수 없다. 그럴 때는 `.astro`에서 `getImage()`로 만든 src와
  srcset과 width와 height를 props로 넘기고, 그 줄에만 예외를 단다.

## 5. 데이터

서버가 없다. 모든 콘텐츠는 빌드 타임에 `src/content/`에서 읽어 HTML로 굳는다.

### 데이터는 TS, 산문은 MDX

|                                                           | 어디에                   | 왜                                                        |
| --------------------------------------------------------- | ------------------------ | --------------------------------------------------------- |
| 언어 무관 구조 (`slug`, `date`, `stack`, `links`, `logo`) | `models/data.ts`         | 한 곳에만 있어 언어별로 어긋날 수 없다                    |
| 번역되는 문자열 (`title`, `org`, `summary`)               | `models/text.{ko,en}.ts` | `Record<Slug, ...>` - 한쪽을 빠뜨리면 **컴파일이 깨진다** |
| 긴 산문 (글 본문, 프로젝트 상세)                          | `src/content/**.mdx`     | 본문은 객체에 안 들어간다                                 |

**의존 방향은 한쪽이다.** `resume`은 `career`, `projects`를 가져다 문서를 조립할 뿐,
데이터를 소유하지 않는다. 반대 방향은 없다 - `career`는 `resume`을 모른다.
사람 정보(name, roles, intro, location, description)는 이력서 것이 아니라 사이트 것이라
`common:site.*` 키에 있고, 쓰는 뷰가 `t(($) => $.site.roles, { ns: 'common' })`로 직접 읽는다.

**컬렉션에는 본문이 있는 것만 둔다.** 경력, 학력, 대회, 기술은 본문이 없어서 TS 모듈이다.
전에는 `content/awards/{ko,en}/<slug>.mdx`처럼 항목마다 파일 두 개였는데, `date`, `order`가
양쪽에 복제돼 한쪽만 고치면 언어별로 정렬이 달라졌다. 아무것도 그걸 안 잡아줬다.

`skills`가 특히 그랬다 - `items`(고유명사)가 두 언어에서 완전히 같은데 통째로 복제됐다.

**기술 목록은 `src/content/skills.ts` 한 파일이 전부다** - 그룹, 이름, 브랜드 색, simple-icons
슬러그. 사이트 뱃지 색과 README 배지가 같이 여기서 나온다. 전에는 이름이 `common/lib/tech.ts`,
그룹이 `content/skills/*.ts`, 색, 아이콘이 README에 있어서 셋을 손으로 맞춰야 했다.

다른 컬렉션과 달리 glob이 아니라 **static import** 인 이유가 둘이다. (1) glob은 타입을
지워서 `Tech` 리터럴 유니온이 `string`으로 무너진다 - 프로젝트 `stack`의 오타를 못 잡는다.
(2) `import.meta.glob`은 Vite 전용이라 bare `bun`으로 도는 `scripts/gen-readme.ts`가
못 읽는다. 같은 이유로 그 파일은 bare bun이 못 푸는 import(`import.meta.glob`, Vite 가상 모듈)를
안 쓴다 - npm 패키지와 타입 import는 괜찮다.

남은 컬렉션은 둘뿐이다.

| 컬렉션     | 원본                                     | 언어 처리                                                          |
| ---------- | ---------------------------------------- | ------------------------------------------------------------------ |
| `posts`    | `src/content/posts/<slug>/<lang>.mdx`    | **산문 + 제목, 요약만.** `date`, `tags`, `draft`는 옆의 `index.ts` |
| `projects` | `src/content/projects/<slug>/<lang>.mdx` | **산문만.** 메타데이터는 `index.ts` 또는 `<slug>.ts`               |

프로젝트 상세 페이지는 그 언어로 MDX가 **있는 것만** 생긴다. 파일이 곧 `hasDetail`이다.

글은 반대다. **라우트는 모든 언어에 생기고** 본문이 폴백한다 - 요청 언어 파일이 없으면
`LANGUAGES` 순서로 첫 본문을 원문 그대로 보여주고 `TranslationNotice`를 얹는다
(`pickBody`). 제목, 요약이 frontmatter 인 이유는 본문과 한 몸이라서고, `date`를 `index.ts`
로 올린 이유는 언어별로 복제되면 정렬이 갈려서다.

### 런타임 상태

- `@tanstack/react-query`의 소비자는 `useContributions` 하나다. 잔디를 `/api/contributions`
  에서 받아 온다. dev에는 그 route가 없어서(worker가 KV를 쥐고 있다) 로컬에서는 데이터가
  안 와 빈 격자가 그대로 남는다.
- **네트워크를 목킹하지 않는다.** MSW를 썼다가 지웠다. story 하나가 잔디를 채우는 것과 dev
  플래그 하나를 위해 의존성 둘과 service worker와 `dist`에 남는 832KB짜리 죽은 chunk를 지고
  있었다. story는 `queryClient.setQueryData`로 캐시를 직접 심는다. 네트워크 계층 대신 데이터
  계층에서 목킹하는 쪽이 배선이 없다.
- `src/mocks/`에 남은 것은 story가 **props로 넘기는 목 데이터**뿐이다.
- `PUBLIC_DEVTOOLS=1`은 dev에서 React Query devtools overlay를 띄운다. **그 집은
  `mise.toml`의 `[env]`다** (§1). 정의가 없어도 꺼진 상태라 동작상 없어도 되지만, 없으면
  존재 자체를 코드 grep으로만 알 수 있다. 배포 빌드는 CI가 `mise-action`으로 `mise.toml`을
  읽어서 `[env]`가 그대로 간다.
- **`import.meta.env`는 `common/lib/env.ts`에서만 읽는다.** lint가 다른 자리를 막는다.
  Vite가 `import.meta.env.FOO`를 빌드 타임에 값으로 치환하는데, 이름을 틀리면 error가 아니라
  `undefined`다. `IS_PRODUCTION`이 조용히 false가 되면 production에서 WIP gate가 꺼진다.
  읽는 자리를 한곳으로 묶어 오타가 날 곳을 세 줄로 줄였다. 새 값이 필요하면 거기에 한 줄
  더하고, 이름을 통째로 넘기지 말고 **완성된 member expression**을 쓴다. 변수로 받아 두면
  치환이 안 걸려 값이 `undefined`가 된다.
- **렌더를 막는 게이트를 만들지 않는다.** `if (!ready) return null`은 클라이언트에선 한
  프레임이지만 빌드 타임에는 영원이다 - 아일랜드가 SSR을 통째로 건너뛰고 본문이
  하이드레이션 `<template>`에 갇힌다. 로딩이 필요하면 그 쿼리에 `enabled`를 건다.
  빌드가 모르는 데이터(잔디)는 **같은 모양의 빈 자리를 먼저 그린다.** 도착하면 색과 합계만
  채워서 layout shift가 0이다. 그 창을 만드는 것이 `contributionWindow()`이고, upstream과
  길이가 어긋나면 격자가 밀리므로 테스트가 길이를 고정한다.
- 폼이 필요해지면 `@tanstack/react-form`을 그때 다시 깐다. 지금은 `mailto:`뿐이다.

### 이력서 PDF

이력서는 화면과 PDF 두 곳으로 나가지만 출처는 하나다.

- `/{lang}/resume/` - 이력서 본문을 HTML로 그린다. 배포 뒤에 Worker가 **같은 페이지**를
  Browser Rendering으로 구워 R2에 넣고, `/resume-{lang}.pdf` 요청에 그것을 내보낸다. 화면과
  PDF가 같은 컴포넌트에서 나오므로 어긋날 수가 없다. 사이트 크롬은 `print:hidden`이 걷어낸다.
  빌드는 PDF를 만들지 않으므로 로컬에서는 그 링크가 404다. 자세한 것은 `docs/deploy.md`.
- **이력서는 아무 내용도 소유하지 않는다.** 경력, 학력, 수상, 기술, 프로젝트가 `src/content/`
  의 TS 항목 파일에서 온다. `resume` feature 에는 `models/`가 아예 없다 - 뷰가 조립만 한다.
  사람 정보는 `common:site.*` 키다.
- `/career`는 훑어보는 페이지, `/resume`는 PDF를 들고 나가는 페이지다. 출처는 하나다.

브라우저 인쇄 대화상자를 쓰지 않는 이유는 사람이 눌러야 나오기 때문이다. 빌드가 스스로
만들어야 배포본에 PDF가 항상 있다.

## 6. i18n & dayjs

추출 loop와 namespace 등록, key가 조용히 사라지는 경우는 `i18n-keys` skill이 다룬다. 여기에는
그 skill이 다루지 않는 것만 적는다.

- **`src/locales/**`를 손으로 편집하지 않는다.** key는 코드에서 `t()`를 쓰면 생기고,
  호출부를 지우면 `removeUnusedKeys`가 key도 지운다. 사람이 채우는 것은 값(번역문)뿐이다.
  key 이름을 바꿀 때도 JSON을 열지 않고 `bunx i18next-cli rename-key <old> <new>`를 쓴다.
- **`.astro`는 추출 대상이 아니다.** `input`에 `.astro`를 넣어도 parser가 조용히 건너뛴다.
  그래서 `.astro`에서만 쓰는 key는 다음 `bun run gen`에 사라지고, CI의 `git diff --exit-code`
  는 그것을 정상으로 통과시킨다. `.astro`가 읽는 key만 `preservePatterns`로 지킨다. 지금은
  `common:nav.*`와 `common:site.description` 둘뿐이다.
- route 제목은 **`common:nav.*`를 재사용한다**(`i18n.getFixedT(lang, 'common')`). 그 key는
  `SiteDock`이 실제로 render해서 절대 지워지지 않는다. `.astro`에서만 쓰는 새 key를 만드는
  순간 조용히 사라지는 쪽으로 간다.
- **번역되는 사이트 텍스트는 `common:site.*`다.** name, roles, intro, location은 view가
  `{ ns: 'common' }` 옵션으로 직접 읽는다. 그래야 추출기가 호출부를 보므로 `preservePatterns`
  로 지킬 필요가 없고, 쓰지 않게 되면 key도 같이 사라진다. `.astro`를 거쳐 props로 내리면
  호출부가 사라져 key가 지워진다. `site.description`만 예외인데, `<head>` meta와
  `rss.xml.ts`로만 나가서 view에 호출부가 없기 때문이다.
- **`SITE`에는 언어와 무관한 상수만 남긴다.** url, handle, github, email, ogImage, title.
  `title`은 브랜드 이름이라 ko와 en이 같다. `Record<Language, string>`으로 두면 언어별인
  척하는 indexing이 호출부마다 붙는다.
- namespace는 feature 단위가 기본이고 `defaultNS`는 `common`이다. 다만 1대1은 아니다.
  `career`는 `resume` namespace를 쓴다. 같은 이력 데이터를 두 화면이 나눠 쓰기 때문이다.
  새 feature에 무조건 namespace를 파지 말고 그 문구를 쓸 화면이 어디인지부터 본다.
- dayjs locale은 `common/lib/i18n/dayjs.ts`가 i18next를 따라가게 해 두었다. 직접
  `dayjs.locale()`을 부르지 않는다.
- 기간(`YearMonth`)은 `2026.08` 숫자 표기이고 언어를 타지 않는다. 글 날짜(dayjs `LL`)와
  규약이 다른 것은 의도다. `A - B` 쌍이 카드와 이력서 폭에 걸리고, `tabular-nums` 정렬은
  숫자라야 산다.
- **언어는 URL이 정한다.** 모든 route가 `/ko/` 또는 `/en/` 아래에 있고, `[lang]` parameter
  하나가 둘을 같이 낸다. 콘텐츠 route는 언어별로 굳어 있어서 crawler가 두 벌을 다 보고
  hreflang이 선다. 런타임 감지를 콘텐츠 route로 내리면 그게 무너진다.
- **`/`만 브라우저 언어를 본다.** worker가 `Accept-Language`를 읽어 `/ko/` 또는 `/en/`으로
  302를 낸다(`worker/root.ts`). 판정은 `common/lib/i18n/preferred-language.ts` 하나가 갖고,
  언어 제안 popover가 `navigator.languages`로 같은 함수를 부른다. 둘이 갈리면 리다이렉트로
  도착한 자리에서 제안이 또 뜬다.
  방문자마다 목적지가 달라서 **301이 아니라 302**이고 `Vary: accept-language`와 `no-store`가
  붙는다. 301은 브라우저가 캐시해 버려서 언어를 한 번 정하면 다시 못 고른다.
  `Accept-Language`를 안 보내는 crawler는 기본 언어로 간다 - 지금과 같다.
- **`redirects: { '/': ... }`는 worker가 없는 자리를 위한 폴백이다.** 정적 빌드에서 이것은
  HTTP 리다이렉트가 아니라 meta-refresh HTML 한 장으로 구워진다. 브라우저가 그 문서를 먼저
  그리기 때문에 방문자가 빈 화면과 "Redirecting from / to /ko/" 링크를 한 번 본다. 템플릿은
  Astro 안에 박혀 있어 못 고친다. 그래서 배포에서는 wrangler의 `run_worker_first: ["/"]`가
  `/`를 worker로 먼저 보낸다. 자산이 있는 경로는 원래 worker를 안 거친다.
  `astro dev`는 이 config 대신 `workerDevServer` 미들웨어가 받아 배포와 같은 협상을 한다.
  `astro preview`는 그 미들웨어가 안 걸려(`configurePreviewServer`가 정적 preview에서는
  호출되지 않는다) 폴백을 그대로 탄다. e2e가 preview를 상대로 도니 루트 spec은 폴백만 본다.
- **기본 언어도 접두사를 생략하지 않는다.** 하나만 생략하면 규칙이 둘이 되고, 글처럼 한
  언어에만 존재하는 문서에서 route 모양이 어긋난다. 그렇게 만들었다가 되돌렸다.
- `getStaticPaths`가 반환하는 객체는 **매번 새로 만든다**(`languagePaths()`가 함수인 이유).
  Astro가 route별로 그 객체에 내부 상태를 붙여서, 같은 instance를 여러 route가 공유하면
  두 번째 route부터 `NoMatchingStaticPathFound`로 빌드가 깨진다.

## 7. 테스트

컴포넌트는 vitest browser mode, 빌드 산출물은 Playwright다. 이 경계를 옮기지 않는다.

- **story가 곧 테스트다.** 모든 `*.stories.tsx`가 vitest의 browser project에서 실제 chromium
  으로 돌고(`@vitest/browser-playwright`), `play()`가 있으면 interaction test가 된다. a11y
  위반은 실패다.
- 순수 로직만 `*.test.ts`로 쓴다(jsdom project).
- **`.storybook/decorators.tsx`의 함정 둘.** decorator 함수 안에서 hook을 직접 부르면 안 된다.
  render 중에 호출된다는 보장이 없어서 컴포넌트로 한 겹 감싼다. 그리고 URL 상태는 진짜
  adapter가 아니라 `NuqsTestingAdapter`를 쓴다. 진짜 adapter는 iframe의 query를 고쳐서 story
  사이에 상태가 샌다.
- `preview.tsx`가 `localStorage`에 언어 제안 dismiss를 심는다. 안 심으면 돌리는 기계의 브라우저
  언어에 따라 제안이 떴다 말았다 해서 시각 회귀를 볼 수 없다.
- **e2e는 dev가 아니라 빌드 결과물(`astro preview`)을 상대로 돈다.** RSS와 sitemap과 PDF 같은
  빌드 산출물을 검사하고, dev daemon과 port를 다투지 않기 위해서다. `test:e2e`가 먼저 빌드한다.
- e2e를 vitest browser mode로 옮길 수 없다. `javaScriptEnabled: false` context와
  `request.get()`의 HTTP header 검사에 대응물이 없고, 빌드된 사이트가 아니라 컴포넌트를
  mount하기 때문이다.
- e2e는 사용자 여정 하나에 spec 하나다. 컴포넌트 상태 조합은 story가 이미 덮는다.
- island는 Playwright의 actionability로 hydration 여부를 알 수 없다. 클릭 전에
  `astro-island[ssr]`가 0개가 될 때까지 기다린다(`e2e/projects.spec.ts`의 `waitForHydration`).
- JS를 끈 context로 본문이 읽히는지 보는 회귀 테스트가 있다. island가 SSR을 건너뛰는 버그가
  실제로 났었고, 브라우저에서는 보이지 않는다.
- 비동기로 갱신되는 control은 Playwright `check()` 대신 `click()`과 `toBeChecked()`를 쓴다.
  `check()`는 상태가 오기 전에 다시 클릭해서 되돌린다.
- `bun run test:e2e`가 Claude Code 같은 AI agent 환경에서 막히면, Astro 7이 그런 환경을
  감지해 `astro dev`를 background daemon으로 돌린 것이다. 그러면 Playwright의 foreground
  가정이 깨진다. `playwright.config.ts`가 이미 `ASTRO_DEV_BACKGROUND=0`으로 꺼 두었다.

## 8. Commits & PRs

`<type>: <title>`, 명령형. PR 전에 `bun run verify`.

**커밋 하나에 변경 하나.** 판정은 `git diff --staged`로 한다. stage한 변경이 서로 독립적으로
되돌려질 수 있으면 커밋 두 개다. refactor와 기능, 서식과 로직을 같이 담지 않는다. 한
덩어리가 아니면 `git add -p`로 나눠 담는다.

**제목은 영어로 쓴다.** 제목은 `git log --oneline`과 GitHub 목록에 서고 grep 대상이다.
영어로 옮기면 뜻이 흐려지는 고유명사와 도메인 용어만 한국어로 남긴다.

**문장부호는 ASCII만 쓴다.** 중점, 엠대시, 화살표, 말줄임표는 터미널마다 폭이 달라 정렬이
깨진다.

`feat` 새 기능, `fix` 버그, `docs` 문서, `style` 서식, `refactor` 구조, `test` 테스트,
`chore` 잡무, `ci` CI 설정, `build` 빌드 설정.

**`.husky/pre-push`가 push 직전에 `verify`를 대신 돌려준다.** `package.json`의
`prepare: husky`가 `bun install` 때 걸린다. Bun 1.3은 루트 패키지의 `prepare`를 실행한다.

**PR 리뷰는 Claude에 맡긴다**(`.github/workflows/review.yml`). push마다 해결된 thread를 닫고
새 변경분만 재검토하며, 남은 사항이 없으면 approve한다. comment에는 thread 답글로 응답하고,
지시는 PR comment에 `@claude` mention으로 한다(`@claude review`).

배포 파이프라인과 환경 구분은 `docs/deploy.md`에 있다.

### WIP gate

아직 만드는 중인 구역은 **production에서만** 가려진다. **선언은 route 자신이 한다.**
`.astro`가 `Layout`에 `wip`을 넘기면 끝이다.

```
<Layout lang={lang} title={...} route={{ to: '/[lang]/research' }} wip>
```

`layout.astro`가 `IS_PRODUCTION && wip`일 때 본문 위에 `WipNotice`를 덮고, 덮인 본문에
`inert`를 건다. 불투명한 화면은 눈만 가려서, `inert`가 없으면 screen reader와 키보드 tab이
밑의 본문을 그대로 훑는다. wrapper는 `display: contents`라 레이아웃에 끼어들지 않는다.

**본문을 치우지 않고 덮는 이유**: 배포 뒤에 Worker가 배포된 `/{lang}/resume/`를 열어 그
화면을 그대로 PDF로 굽는다. 본문을 치우면 PDF가 안내문 그림이 되고, 이미 공유된
`/resume-{lang}.pdf` 링크가 그것을 받는다. `WipNotice`에 `_print`가 걸려 있어 인쇄할 때
덮개만 빠지고 PDF에는 진짜 이력서가 찍힌다.

숨김 효과를 기대하면 안 된다. staging이 공개 URL이라 미완성 콘텐츠는 어차피 바깥에서
읽힌다. gate는 **production 방문자에게 보이지 않게** 하는 것이지 비공개로 만드는 것이 아니다.

route 목록을 딴 데 모아 두지 않는다. 그렇게 했다가 되돌렸는데, `env.ts`에
`'/[lang]/research'` 같은 문자열을 베껴 두면 route를 옮길 때 조용히 어긋나기 때문이다.
`skills`가 이름과 그룹과 색을 세 파일에 나눠 두었다가 겪은 것과 같은 문제다. `env.ts`에는
`import.meta.env`를 읽는 세 줄만 남는다.

gate가 걸린 route에는 `noindex`가 같이 붙는다. navigation은 5개 구역을 그대로 보여준다.
눌러서 안내문을 만나는 것이 메뉴가 사라지는 것보다 덜 혼란스럽기 때문이다.

**로컬에서 production처럼 보려면 `bun run dev:prod`.** Astro 7이 dev를 daemon으로 띄워서
`SITE_ENV=production bun run dev`만으로는 부족하다. 이미 뜬 daemon이 재사용되면서 옛
환경변수가 그대로 남기 때문이다. 그래서 `dev`와 `dev:prod` 둘 다 `astro dev stop`을 앞에
붙인다.

## 9. LLM 지침

- **한국어로 답한다.**
- `git reset --hard` 같은 파괴적 명령은 명시적으로 요청받았을 때만.
- 컴포넌트를 만들면 story도 만든다. `common/components/ui/`만 예외인데, shadcn에서 받아 온
  그대로이기 때문이다. 그 폴더의 컴포넌트를 자체 제작으로 고쳐 쓸 때 story를 붙인다.
- **태그형(TODO/FIXME) 외 주석을 쓰지 않는다.** 설명이 필요하면 먼저 이름, 위치, 타입을
  고친다. 그래도 남는 지식은 테스트 이름 / 커밋 메시지 / 문서 중 하나에 넣는다 - 테스트는
  어기면 실패하고, 커밋은 `git blame`으로 닿는다. 셋 다 불가능할 때만 주석을 쓰고 그 이유를
  주석에 적는다 (eager glob의 TDZ처럼 빌드가 터지는 것 말고는 알 길이 없는 것).
  함수, 타입, prop에 이름값을 되풀이하는 JSDoc은 금지.
- 생성물(`src/types/i18next.d.ts`, `resources.d.ts`, `styled-system`)을 편집하지 않는다.
- lint rule을 끄는 커밋을 만들지 않는다. 막히면 물어본다.

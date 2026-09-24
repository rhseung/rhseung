# Agent Guide

규칙만 적는다. **왜 그런지는 커밋 메시지와 테스트 이름에 있다** - 규칙이 붙은 커밋을
`git log -S`로 찾으면 그때 무엇이 깨졌는지 나온다. 불편하면 끄지 말고 물어봐라.
대부분은 ESLint가 강제한다 - 애매하면 `bun run lint`가 정답.

| 찾는 것                  | 어디                 |
| ------------------------ | -------------------- |
| 파일을 어디에 두나       | `docs/registries.md` |
| 배포, Cloudflare, secret | `docs/deploy.md`     |
| 전체 그림 (사람용)       | `OVERVIEW.md`        |

## 1. 환경

**Bun만 쓴다.** npm/yarn/pnpm 금지. **TypeScript는 6.x 고정** - 올리지 말 것.
유틸은 `es-toolkit`을 먼저 찾아본다 (날짜는 dayjs, 클래스 병합은 `cn`).

| 명령                | 언제                           |
| ------------------- | ------------------------------ |
| `bun run dev`       | 개발 (:4321)                   |
| `bun run dev:prod`  | production처럼 (WIP gate 켜고) |
| `bun run storybook` | 컴포넌트 작업 (:6006)          |
| `bun run check`     | **커밋 전**                    |
| `bun run verify`    | **PR 전**                      |
| `bun run gen`       | `t()` key를 추가하거나 지운 뒤 |

## 2. 건드리기 전에 읽을 것

- 스타일, 컴포넌트 -> `panda-here` skill
- 사용자에게 보이는 문자열 -> `i18n-keys` skill
- 새 기능 -> `/new-feature <name>` 커맨드

## 3. 아키텍처 - feature-first slice

```
src/
├── common/           # 크로스 피처. components/{ui,layout,mdx}, lib/, styles/
├── content/          # MDX, TS 원본
├── features/<name>/
│   ├── index.ts         #  배럴. 바깥에서 보이는 유일한 표면
│   ├── paths.ts         #  라우트가 쓸 데이터. astro:content 는 여기서만
│   ├── model/           #  스키마, 도메인 타입, 수집     [빌드 타임]
│   ├── lib/             #  순수 로직 + .test.ts         [어디서나]
│   ├── components/      #  표현 컴포넌트                [SSR]
│   ├── view/            #  조립 지점. .astro 가 부르는 것
│   └── hooks/           #  브라우저 상태               [브라우저]
├── layouts/          # <head> 셸, 공통 크롬(dock 포함)
├── pages/[lang]/     # 라우트만
├── locales/{ko,en}/  # 생성물
└── mocks/            # story 가 props 로 쓰는 목 데이터
```

| 자리          | 책임                          | 콘텐츠 접근              |
| ------------- | ----------------------------- | ------------------------ |
| `model/`      | zod 스키마, 도메인 타입, 수집 | **`astro:content` 금지** |
| `lib/`        | 순수 로직. React 없음         | 없음                     |
| `components/` | UI. props 만 받는다           | 없음                     |
| `hooks/`      | 브라우저 상태                 | 없음                     |
| `view/`       | 위를 조립. 계층 밖이다        | 없음                     |
| `paths.ts`    | 라우트가 쓸 데이터            | **여기와 `.astro` 만**   |

의존은 한 방향이다(`model` -> `lib` -> `components`). `eslint-plugin-boundaries`가 막는다.
`components` 가 `model` 타입이 필요하면 `lib` 배럴이 재export한다.

**`.astro` 의 코드펜스에는 `getStaticPaths` 한 줄과 props 구조분해만 둔다.** 데이터는
`paths.ts` 가 만들어 props 로 넘긴다. `getCollection` 과 `render()` 도 거기서 부른다.
`paths.ts` 는 배럴에 올리지 않는다 - `astro:content` 가 딸려 오면 story 와 vitest 가 깨진다.

**`api/` 가 없는 것이 요점이다.** 서버가 없어서 안 만든 게 아니라, 없다는 사실이 구조에
드러나야 해서 비워 둔다.

**`hooks/` 가 있으면 그 feature 는 하이드레이션을 강제한다.** 폴더 목록만 보고 안다.
Astro 에서 제일 중요한 결정이 그거다.

**import**

- `@/common/<area>`만. `@/common` 루트 배럴은 없다.
- 다른 feature는 `@/features/<name>` 배럴만. 내부 경로 금지.
- 같은 feature 안에서는 `../model` 처럼 **디렉토리**를 가리킨다. `paths.ts` 만 예외다.
- 한 파일은 한 개념. export 가 많은 건 괜찮고 개념이 섞이는 게 문제다.

**배럴**

- named export 만. `export { default as X }` 금지. `src/**`에서 default export 는 lint error
  (story, `.astro` 만 예외).
- 무겁거나 node 전용인 모듈은 올리지 않는다 (`content-schema`, `contributions-schema`, `render-paper`).
- 이름은 정의부와 사용부가 같다. `import { X as Y }` 금지.
- `.astro` 는 파일명을 PascalCase 로 그대로 옮긴 이름 (`base-layout.astro` -> `BaseLayout`).

**완결 예시는 `src/features/projects/`다.** 새 기능은 여기를 베낀다.

## 4. 어기면 조용히 깨지는 것

전부 겪고 나서 적은 것들이다. lint가 못 잡는 것만 모았다.

- **생성물을 편집하지도 커밋하지도 않는다** - `src/types/i18next.d.ts`, `resources.d.ts`,
  `worker/env.d.ts`, `styled-system/`, `src/fonts.css`, `public/resume-*.pdf`.
  `src/locales/**`는 생성물이 아니다. key 는 추출기가, **값은 사람이** 채운다.
- **`src/pages/`의 파일은 전부 라우트다.** 테스트도 story 도 두지 않는다.
- **`.astro`가 프레임워크 컴포넌트를 중첩하지 않는다.** Provider 와 화면은
  `view/` 가 합치고 `.astro` 는 그 하나만 부른다.
- **기본은 하이드레이션 없음이다.** `client:*` 는 브라우저 API 가 필요할 때만 붙인다.
  view 를 지시어 없이 부르면 SSR 만 하고 JS 가 0이다.
- **렌더를 막는 게이트를 만들지 않는다.** `if (!ready) return null` 은 빌드 타임에 영원이다.
  쿼리에 `enabled` 를 걸어라.
- **`import.meta.env`는 `common/lib/env.ts`에서만 읽는다.** 완성된 member expression 으로.
- **`astro:content`, `astro:assets`는 `.astro`에서만.**
- **collection schema 를 바꿨으면 캐시를 지운다** - `rm -rf .astro node_modules/.astro dist`.
- **worker 라우트를 추가하면 `wrangler.jsonc` 의 `run_worker_first` 에도 넣는다.**
  거기 없는 경로는 자산 계층이 먼저 잡아 404(GET)나 405(POST)를 내고 worker 는 호출되지
  않는다. 빌드도 `verify` 도 못 잡는다 - 배포해야 드러난다.
- **worker 에서 `caches.default`를 쓰지 않는다.** `caches.open(name)` 을 쓴다.
- **날 `<img>`와 손으로 쓴 `target="_blank"`는 lint error다.** `<Image />`, `<ExternalLink />`.
- **story 없는 컴포넌트를 만들지 않는다** (`common/components/ui/` 만 예외).
- **언어는 URL 이 정한다.** 페이지는 `useLanguage()` 로 읽고, 리프만 props 로 받는다.

## 5. 테스트

컴포넌트는 vitest browser mode, 빌드 산출물은 Playwright. **이 경계를 옮기지 않는다.**

- **story 가 곧 테스트다.** 실제 chromium 으로 돌고 a11y 위반은 실패다.
- 순수 로직만 `*.test.ts` (jsdom).
- e2e 는 dev 가 아니라 `astro preview` 를 상대로 돈다. 사용자 여정 하나에 spec 하나.

## 6. 커밋

`<type>: <title>`, 명령형, **제목 한 줄만.** PR 전에 `bun run verify`.

- **커밋 하나에 변경 하나.** 판정은 `git diff --staged`. 독립적으로 되돌릴 수 있으면 커밋 둘이다.
- **제목은 영어로.** 옮기면 뜻이 흐려지는 고유명사만 한국어로 남긴다.
- **문장부호는 ASCII 만.** 중점, 엠대시, 화살표, 말줄임표 금지.
- push 는 따로 요청받았을 때만. 이미 만든 커밋은 건드리지 않는다 (amend, rebase, force-push 금지).
- `feat` `fix` `docs` `style` `refactor` `test` `chore` `ci` `build`

## 7. LLM 지침

- **한국어로 답한다.**
- `git reset --hard` 같은 파괴적 명령은 명시적으로 요청받았을 때만.
- **태그형(TODO/FIXME) 외 주석을 쓰지 않는다.** 설명이 필요하면 이름, 위치, 타입을 먼저 고친다.
  남는 지식은 테스트 이름 / 커밋 메시지 / 문서에 넣는다. 이름값을 되풀이하는 JSDoc 금지.
- **lint rule 을 끄는 커밋을 만들지 않는다.** 막히면 물어본다.

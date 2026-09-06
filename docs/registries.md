# 파일이 곧 등록이다

이 저장소는 "어딘가에 등록" 하는 대신 **정해진 자리에 파일을 두면 걷어가는** 구조다. 이 문서는
그 자리들의 지도다. 미래의 나를 위해 쓴다 - 각 항목은 "어디에 무엇을 두면, 누가 읽고, 무엇이
검사하나" 만 적는다. 규칙의 이유는 `AGENTS.md` 에 있다.

README 는 GitHub 프로필이라 여기 적는다.

## 한눈에

| 자리                                     | 무엇                     | 걷어가는 곳                                 | 검사                              |
| ---------------------------------------- | ------------------------ | ------------------------------------------- | --------------------------------- |
| `src/content/experience/<slug>/index.ts` | 경력                     | `features/career/models/data.ts` (glob)     | `career/models/data.test.ts`      |
| `src/content/education/<slug>/index.ts`  | 학력                     | 같은 곳                                     | 같은 곳                           |
| `src/content/awards/<slug>.ts`           | 수상                     | 같은 곳                                     | 같은 곳                           |
| `src/content/projects/<slug>.ts`         | 프로젝트                 | `features/projects/models` (glob)           | `projects/models/data.test.ts`    |
| `src/content/projects/<slug>/<lang>.mdx` | 프로젝트 상세 본문       | `content.config.ts` `projects` 컬렉션       | 같은 곳                           |
| `src/content/posts/<slug>/index.ts`      | 글 메타                  | `features/blog/models` (glob)               | `blog/models/data.test.ts`        |
| `src/content/posts/<slug>/<lang>.mdx`    | 글 본문                  | `content.config.ts` `posts` 컬렉션          | zod frontmatter                   |
| `src/content/research/<slug>/index.ts`   | 연구                     | `features/research/models` (glob)           | `research/models/data.test.ts`    |
| `src/content/research/<slug>/paper.tex`  | 논문 본문 (+`refs.bib`)  | `pages/[lang]/research/[slug].astro` (glob) | 빌드                              |
| `src/content/skills.ts`                  | 기술 목록 (한 파일)      | 뱃지, 프로젝트 `stack` 검증, README 배지    | `career/models/data.test.ts`      |
| `src/locales/<lang>/<ns>.json`           | 번역                     | `common/lib/i18n.ts` (glob)                 | `i18n.test.ts` 완전성, CI diff    |
| `src/pages/[lang]/<route>/index.astro`   | 라우트                   | Astro 파일 라우터 + `astro-typesafe-routes` | 타입 (`localeHref` 오타 = 에러)   |
| `src/common/components/mdx/<name>/`      | MDX 컴포넌트             | `mdx/components.tsx` 맵 (**손으로 등록**)   | 스토리                            |
| `src/common/styles/<name>.ts`            | 스타일 레시피            | `styles/index.ts` 배럴 (**손으로 등록**)    | `strictTokens`, `lint-inline-css` |
| `**/*.stories.tsx`                       | 스토리 = 브라우저 테스트 | vitest `storybook` 프로젝트 (glob)          | a11y 위반 = 실패                  |
| `**/*.test.ts`                           | 순수 로직 테스트         | vitest `unit` 프로젝트                      |                                   |
| `e2e/*.spec.ts`                          | 사용자 여정              | Playwright (`astro preview` 상대)           |                                   |
| `scripts/gen-*.ts`                       | 생성기                   | `package.json` `gen`·`build` (**손으로**)   |                                   |
| `.claude/skills/<name>/SKILL.md`         | 에이전트 스킬            | Claude Code (glob)                          |                                   |
| `.claude/commands/<name>.md`             | `/name` 커맨드           | Claude Code (glob)                          |                                   |

"**손으로 등록**" 이 붙은 셋만 파일을 만든 뒤 한 줄을 더 고친다. 나머지는 파일이 곧 등록이다.

## 콘텐츠

공통 규칙: 언어 무관 값(`slug`, 날짜, `links`, `stack`)은 항목 한 곳에, 번역되는 문자열은
`ko:`/`en:` 아래에. 언어를 빠뜨리면 컴파일 에러다(`Localized<T> = Record<Language, T>`).
`slug` 는 kebab-case 고 파일(폴더) 이름과 같아야 한다.

### 경력 · 학력 · 수상

```ts
// src/content/experience/<slug>/index.ts   (education 도 같은 모양)
import { defineCareer } from '@/features/career/models/define';
import logo from './logo.png?url'; // 로고는 항목 폴더에 같이 둔다. 없어도 된다.

export default defineCareer({
  slug: 'gist-aiter',
  start: { year: 2025, month: 9 }, // end 를 빼면 "현재"
  logo,
  links: { site: 'https://...' },
  ko: { org, role, summary?, achievements? },
  en: { ... },
});
```

```ts
// src/content/awards/<slug>.ts
export default defineAward({ slug, date: { year, month? }, ko: { title, issuer?, summary? }, en });
```

- 나오는 곳: `/career`, `/resume`(PDF 도 같은 컴포넌트).
- 검사: 모르는 필드는 실패(strict), 슬러그 중복, 끝 날짜 < 시작 날짜.

### 프로젝트

```ts
// src/content/projects/<slug>.ts  또는  <slug>/index.ts (본문이 있을 때)
export default defineProject({
  slug,
  stack: ['Astro', 'React'], // skills.ts 에 있는 이름만. 오타는 컴파일 에러
  start, end?, status: 'active' | 'shipped' | 'archived',
  links?: { repo, demo, package, post, paper },
  awards?: ['<award slug>'], // 실제 수상 슬러그여야 한다 (테스트)
  ko: { title, summary, highlight? }, en,
});
```

상세 페이지는 `<slug>/<lang>.mdx` 가 **있는 언어에만** 생긴다. 파일이 곧 `hasDetail` 이다.

### 글

```
src/content/posts/<slug>/
  index.ts   definePost({ slug, date: 'YYYY-MM-DD', tags, draft? })
  ko.mdx     frontmatter: title, summary  + 본문
  en.mdx     (선택) 번역본
  assets/    본문이 ./assets/x.png 로 참조. astro:assets 최적화를 탄다
```

라우트는 **모든 언어에** 생긴다. 요청 언어 파일이 없으면 `LANGUAGES` 순서로 첫 본문을 보여주고
번역 안내(`TranslationNotice`)를 얹는다. `draft: true` 면 목록·라우트·RSS 전부에서 빠진다.

### 연구

```
src/content/research/<slug>/
  index.ts    defineResearch({ slug, kind: 'rne' | 'lab' | 'paper', start, end?, links?, ko, en })
  paper.tex   (선택) 있으면 /research/<slug>/ 논문 페이지가 생긴다
  refs.bib    (선택) 인용·참고문헌
```

LaTeX 는 빌드 때 hast 로 파싱해 글과 같은 MDX 컴포넌트로 렌더한다. 클라이언트에는 안 실린다.

### 기술

`src/content/skills.ts` 한 파일이 전부다 - 그룹, 이름, 브랜드 색, simple-icons 아이콘.
glob 이 아니라 static import 인 이유는 `Tech` 리터럴 유니온을 살리기 위해서다(그래서 프로젝트
`stack` 오타가 컴파일 에러). 사이트 뱃지 색과 README 배지(`gen-readme`)가 같이 여기서 나온다.

## 번역

- 키는 코드에서 `t(($) => $.some.key)` 를 쓰면 `bun run gen:i18n` 이 만든다. JSON 을 손으로
  만들지 않는다. **값(번역문)만 사람이 채운다** - ko 먼저, en 다음.
- 새 네임스페이스는 `useTranslation('<ns>')` 를 쓰고 gen 을 돌리면 `src/locales/{ko,en}/<ns>.json`
  이 생긴다. 등록할 곳 없음. 한쪽 언어 파일이 빠지면 `i18n.test.ts` 가 실패한다.
- `.astro` 에서만 쓰는 키는 추출기가 못 봐서 지워진다. `i18next.config.ts` 의
  `preservePatterns` 에 적는다(지금 `common:nav.*`, `common:site.description`).

## 축 - 언어 · 테마

- 언어: `src/common/lib/languages.ts` 의 `LANGUAGES` 한 줄. `'ja'` 를 넣으면 콘텐츠 파일
  전부, `LANGUAGE_NAMES`/`LANGUAGE_TAGS`, 로케일 완전성 테스트가 고칠 곳을 가리킨다.
- 테마: `src/common/lib/theme.ts` 의 `THEME_MODES`. `'sepia'` 를 넣으면
  `src/common/styles/palette.ts`(색 전체), `panda.config.ts`, 독의 `theme.<mode>` 로케일 키가
  에러를 낸다.

## 라우트와 독

- `src/pages/[lang]/<route>/index.astro` 를 만들면 라우트와 `RouteId` 타입이 생긴다.
  `localeHref(lang, '/[lang]/<route>')` 의 오타는 컴파일 에러.
- 독(하단 내비)에 넣으려면 `src/common/viewmodels/use-site-sections.ts` 의 `SECTIONS` 에 한
  줄 - `key` 는 라우트 유니온으로 좁혀져 있고 라벨은 `common:nav.<key>` 다.
- 색인에서 뺄 라우트는 `src/common/lib/site.ts` 의 `NOINDEX_ROUTES`.

## MDX 컴포넌트

`src/common/components/mdx/<name>/index.tsx` + `index.stories.tsx` 를 만들고
`src/common/components/mdx/components.tsx` 의 맵에 넣는다. 맵은 `mdxComponents(lang)` 팩토리라
글·프로젝트 상세·논문이 같은 걸 쓴다. 본문 요소(`p`, `ul`, `table` …)의 모양은 컴포넌트가 아니라
`src/common/styles/prose.ts` 하나다.

## 스타일

- 토큰: `panda.config.ts`(크기·그림자·폰트) + `src/common/styles/palette.ts`(색, 테마별) +
  `src/common/styles/text-styles.ts`(textStyle, 자간).
- 레시피: `src/common/styles/<name>.ts` 에 두고 `index.ts` 에서 export. 파일 둘 이상이 쓰는 것만.
  한 파일 안에서 두 번이면 그 파일의 상수, 한 번이면 `className={css({...})}` 인라인 -
  `scripts/lint-inline-css.ts` 가 잡는다.
- `styled-system/` 은 생성물이다(`bun run gen`).

## 생성물

커밋하지 않고 `bun install`(postinstall)·`bun run build` 가 만든다.

| 생성물                                      | 만드는 것                            |
| ------------------------------------------- | ------------------------------------ |
| `src/@types/*.d.ts`                         | `gen:i18n`                           |
| `public/favicons/*`, `favicon-hosts.gen.ts` | `gen:favicons` - MDX 링크 도메인에서 |
| `styled-system/`                            | `panda codegen`                      |
| `public/resume-*.pdf`                       | `gen:resume` (빌드 뒤)               |
| README `<!-- tech:start -->` 구간           | `gen:readme` (커밋함)                |

새 생성기는 `scripts/gen-<name>.ts` 로 만들고 `package.json` 의 `gen`(또는 `build`) 순서에
끼운다. 실패하면 조용히 넘기지 말고 던진다 - 배포본이 로컬과 달라지는 것보다 빌드 실패가 낫다.

## 에이전트

- `.claude/skills/<name>/SKILL.md` - frontmatter 의 `description` 트리거로 자동 로드.
- `.claude/commands/<name>.md` - `/<name>`. `new-feature`, `new-component` 가 있다.
- `.claude/agents/<name>.md` - 서브에이전트(`ui-reviewer`).
- 규칙 자체는 `AGENTS.md` 한 파일이고 `CLAUDE.md` 가 import 한다.

# 파일 기반 등록 구조

이 저장소는 등록 목록 없이 **지정된 경로의 파일을 glob으로 수집하는** 구조다. 이 문서는 각
등록 지점의 경로, 파일 형식, 수집 주체, 검증 수단을 정리한다. 규칙은 `AGENTS.md`, 그 근거는
`docs/rationale.md`에 있다.

README는 GitHub 프로필 페이지이므로 이 문서를 별도로 둔다.

## 등록 원칙

1. **등록 목록 없음.** 지정된 경로에 파일을 두면 glob이 수집한다. 별도 등록 절차가 없다.
2. **언어 무관 값의 단일 소유.** `slug`, 날짜, 링크, `stack`은 항목 파일 하나에만 있고 번역되는
   문자열만 `ko:`/`en:` 아래 또는 `<lang>.mdx`에 있다. 한 언어를 빠뜨리면 컴파일 에러다.
3. **단일 파일에서 디렉터리로 전환.** 항목은 파일 하나로 시작하고, 본문이 생기면 디렉터리로
   옮긴다. 메타데이터만 있을 땐 `<slug>.ts` 하나. 본문(MDX)이나 첨부(로고, 논문)가 생기면 `<slug>/` 디렉터리로 옮기고 그 파일이 `index.ts`가 된다.
   glob이 `*.ts`와 `*/index.ts`를 둘 다 보므로 옮겨도 등록은 그대로다.

## 콘텐츠 - 단일 파일과 디렉터리

| 종류       | 메타데이터 전용      | 디렉터리 형식                                             | 디렉터리 전환 시점 |
| ---------- | -------------------- | --------------------------------------------------------- | ------------------ |
| 프로젝트   | `projects/<slug>.ts` | `projects/<slug>/index.ts` + `ko.mdx` (+`en.mdx`)         | 상세 본문 작성 시  |
| 연구       | `research/<slug>.ts` | `research/<slug>/index.ts` + `paper.tex` (+`refs.bib`)    | 논문 본문 게시 시  |
| 글         | (없음 - 본문 필수)   | `posts/<slug>/index.ts` + `ko.mdx` (+`en.mdx`, `assets/`) | 항상 디렉터리      |
| 경력, 학력 | (없음 - 로고 동반)   | `experience/<slug>/index.ts` + `logo.png`                 | 항상 디렉터리      |
| 수상       | `awards/<slug>.ts`   | 전환 없음                                                 |                    |
| 기술       | `skills.ts` 한 파일  | 전환 없음                                                 |                    |

경로는 전부 `src/content/` 아래다.

### 프로젝트 - 단일 파일에서 디렉터리로

시작은 파일 하나다.

```ts
// src/content/projects/campass.ts
import { defineProject } from '@/features/projects/models/define';

export default defineProject({
  slug: 'campass', // 파일 이름과 같게
  stack: ['React', 'TanStack Router'], // skills.ts 에 있는 이름만. 오타는 컴파일 에러
  start: { year: 2024, month: 11 },
  end: { year: 2024, month: 11 }, // 빼면 "현재"
  status: 'shipped', // 'active' | 'shipped' | 'archived'
  links: { repo: 'https://...', demo: 'https://...' }, // repo, demo, package, post, paper
  awards: ['junction-asia-2025'], // 실제 수상 슬러그여야 한다 (테스트)
  ko: { title: 'Campass', summary: '...', highlight: '...' },
  en: { title: 'Campass', summary: '...' },
});
```

이 상태에서는 목록 카드만 있고 제목 링크는 `links.repo` 다. 상세 본문을 추가하려면 **파일을
디렉터리로 옮기고 본문 파일을 같은 위치에 둔다.** 항목 내용은 변경되지 않는다.

```sh
mkdir src/content/projects/campass
git mv src/content/projects/campass.ts src/content/projects/campass/index.ts
$EDITOR src/content/projects/campass/ko.mdx   # 본문. frontmatter 없음
```

`ko.mdx` 생성과 동시에 `/ko/projects/campass/` 라우트가 생기고 카드 제목 링크가 그곳을 가리킨다.
`en.mdx`는 선택이다 - **있는 언어에만** 상세 페이지가 생긴다(`hasDetail`). 없는 언어의 카드는
계속 외부 링크로 나간다. 본문 안에서 `Callout`, `Steps` 같은 MDX 컴포넌트를 바로 쓸 수 있다.

역방향도 같다 - `ko.mdx` 삭제로 라우트가 사라지고, 디렉터리를 단일 파일로 되돌릴 수 있다.

### 연구 - 단일 파일에서 디렉터리로

```ts
// src/content/research/<slug>.ts
export default defineResearch({
  slug,
  kind: 'rne' | 'lab' | 'paper',
  start, end?,
  links?: { paper, poster, repo, site },
  ko: { title, org, role?, summary }, en,
});
```

논문 본문을 사이트에 게시하려면 디렉터리로 옮기고 `paper.tex`를 둔다. `refs.bib`이
있으면 `\cite{}`가 인용 링크와 참고문헌 목록이 된다. `paper.tex` 생성과 동시에
`/research/<slug>/` 라우트가 생긴다. LaTeX는 빌드 때 hast로 파싱해 글과 같은 MDX 컴포넌트로
렌더한다 - 클라이언트에는 안 실린다.

### 의존성 7개를 줄이려 하지 마라

`@citation-js/*` 셋과 `@unified-latex/*` 넷이 `render-paper.ts` 하나를 위해 달려 있다. 샘플
논문이 하나뿐이라 과해 보이지만, 세어 보니 **일곱 다 실제로 쓰인다.** `plugin-bibtex`와
`plugin-csl`은 side-effect import라 호출부가 안 보일 뿐이고, 그 둘이 빠지면
`format('citation')`과 `format('bibliography')`가 서식 없는 raw bibtex로 떨어진다.

**비용은 디스크뿐이다.** `@unified-latex`가 29개 하위 패키지로 22MB를 차지하지만, 우리가
적는 것은 넷이고 나머지는 전이 의존성이라 넷을 줄여도 트리는 그대로다. 그리고 전부 빌드
타임에만 돌아서 **클라이언트 번들에 0바이트**다(`dist/_astro`를 뒤져 확인했다). 줄이려면
패키지가 아니라 "`.tex`를 그대로 렌더한다"는 기능 자체를 버려야 한다.

### 글 - 항상 디렉터리

본문이 필수이므로 단일 파일 형식이 없다.

```
src/content/posts/<slug>/
  index.ts   definePost({ slug, date: 'YYYY-MM-DD', tags, draft? })   <- 언어 무관
  ko.mdx     frontmatter 에 title, summary + 본문                     <- 언어별
  en.mdx     (선택) 번역본
  assets/    본문이 ./assets/x.png 로 참조. astro:assets 최적화를 탄다
```

프로젝트와 반대로 라우트는 **모든 언어에** 생긴다. 요청 언어 파일이 없으면 `LANGUAGES` 순서로
첫 본문을 원문 그대로 보여주고 번역 안내(`TranslationNotice`)를 얹는다. `draft: true` 면
목록, 라우트, RSS 전부에서 빠진다. 제목, 요약이 `index.ts`가 아니라 frontmatter에 있는 이유는
본문과 한 몸이라서다.

### 경력 , 학력 - 항상 디렉터리

로고 파일을 동반하므로 디렉터리 형식이다.

```ts
// src/content/experience/<slug>/index.ts   (education 도 같은 모양)
import { defineCareer } from '@/features/career/models/define';
import logo from './logo.png?url'; // 없으면 이 줄과 logo 필드를 뺀다

export default defineCareer({
  slug: 'gist-aiter',
  start: { year: 2025, month: 9 }, // end 를 빼면 "현재"
  logo,
  links: { site: 'https://...' },
  ko: { org, role, summary?, achievements? },
  en: { ... },
});
```

### 수상 - 단일 파일

```ts
// src/content/awards/<slug>.ts
export default defineAward({ slug, date: { year, month? }, ko: { title, issuer?, summary? }, en });
```

프로젝트가 `awards: ['<slug>']`로 가리킬 수 있다. 없는 슬러그를 가리키면 테스트가 실패한다.

### 기술 - 단일 파일

`src/content/skills.ts`에 그룹, 이름, 브랜드 색, simple-icons 아이콘이 다 있다. glob이 아니라
static import 인 이유는 `Tech` 리터럴 유니온을 유지하기 위해서다 - 그래서 프로젝트 `stack`의
오타가 컴파일 에러다. 사이트 뱃지 색과 README 배지(`gen:readme`)가 같이 여기서 나온다.

### 검증

`bun run test`의 `models/data.test.ts` 들이 항목마다 본다 - 스키마가 모르는 필드(strict),
슬러그 중복, 끝 날짜가 시작보다 이른 것, 프로젝트가 가리키는 수상 슬러그, `stack` 이름,
같은 기술이 두 그룹에 있는 것. 나오는 곳은 `/career`, `/resume`(경력, 학력, 수상, 기술),
`/projects`, `/research`, `/blog` 다.

## 기타 등록 지점

| 경로                                   | 대상                     | 수집 주체                                     | 검증                              |
| -------------------------------------- | ------------------------ | --------------------------------------------- | --------------------------------- |
| `src/locales/<lang>/<ns>.json`         | 번역                     | `common/lib/i18n/i18n.ts` (glob)              | `i18n.test.ts` 완전성, CI diff    |
| `src/pages/[lang]/<route>/index.astro` | 라우트                   | Astro 파일 라우터 + `astro-typesafe-routes`   | 타입 (`localeHref` 오타 = 에러)   |
| `src/common/components/mdx/<name>/`    | MDX 컴포넌트             | `mdx/components.tsx` 맵 (**손으로 등록**)     | 스토리                            |
| `src/common/styles/recipes/<name>.ts`  | 스타일 레시피            | `recipes/index.ts` 배럴 (**손으로 등록**)     | `strictTokens`, `lint-inline-css` |
| `**/*.stories.tsx`                     | 스토리 = 브라우저 테스트 | vitest `storybook` 프로젝트 (glob)            | a11y 위반 = 실패                  |
| `**/*.test.ts`                         | 순수 로직 테스트         | vitest `unit` 프로젝트                        |                                   |
| `e2e/*.spec.ts`                        | 사용자 여정              | Playwright (`astro preview` 상대)             |                                   |
| `scripts/gen-*.ts`                     | 생성기                   | `package.json`의 `gen`과 `build` (**손으로**) |                                   |
| `src/types/<pkg>.d.ts`                 | 타입 없는 의존성 선언    | `tsconfig.json`의 `include` (glob)            | `astro check`                     |
| `.claude/skills/<name>/SKILL.md`       | 에이전트 스킬            | Claude Code (glob)                            |                                   |
| `.claude/commands/<name>.md`           | `/name` 커맨드           | Claude Code (glob)                            |                                   |

"**손으로 등록**" 표시가 있는 셋은 파일 생성 후 등록 코드 한 줄이 추가로 필요하다.

`src/types/`는 ambient 선언이 모이는 자리다. 손으로 쓴 것(타입을 싣지 않는 의존성)과 생성된
것(`gen:i18n`의 i18next 타입)이 같이 살고, gitignore가 **생성물 두 개를 이름으로** 막는다.
feature 안에 두면 그 폴더의 계층 규칙(`models`/`viewmodels`/`views`)을 어긴다.
`@citation-js/*` 선언이 `research/viewmodels/`에 있었던 것이 그 경우다.

## 번역

- 키는 코드에서 `t(($) => $.some.key)`를 쓰면 `bun run gen:i18n`이 만든다. JSON을 손으로
  만들지 않는다. **값(번역문)만 사람이 채운다** - ko 먼저, en 다음.
- 새 네임스페이스는 `useTranslation('<ns>')`를 쓰고 gen을 돌리면 `src/locales/{ko,en}/<ns>.json`
  이 생긴다. 등록할 곳 없음. 한쪽 언어 파일이 빠지면 `i18n.test.ts`가 실패한다.
- `.astro` 에서만 쓰는 키는 추출기가 못 봐서 지워진다. `i18next.config.ts`의
  `preservePatterns`에 적는다(지금 `common:nav.*`, `common:site.description`).

## 확장 축 - 언어, 테마

- 언어: `src/common/lib/i18n/languages.ts`의 `LANGUAGES` 한 줄. `'ja'`를 넣으면 콘텐츠 파일
  전부와 로케일 완전성 테스트가 고칠 곳을 가리킨다. 언어 이름(`languageName`)과 BCP 47
  태그(`languageTag`)는 `Intl`이 CLDR에서 꺼내므로 손댈 것이 없다.
- 테마: `src/common/styles/config/theme.ts`의 `THEME_MODES`. `'sepia'`를 넣으면
  `src/common/styles/config/palette.ts`(색 전체), `panda.config.ts`, 독의 `theme.<mode>` 로케일 키가
  에러를 낸다.

## 라우트 및 내비게이션

- `src/pages/[lang]/<route>/index.astro`를 만들면 라우트와 `RouteId` 타입이 생긴다.
  `localeHref(lang, '/[lang]/<route>')`의 오타는 컴파일 에러.
- 독(하단 내비)에 넣으려면 `src/common/viewmodels/use-site-sections.ts`의 `SECTIONS`에 한
  줄 - `key`는 라우트 유니온으로 좁혀져 있고 라벨은 `common:nav.<key>` 다.
- 색인에서 뺄 라우트는 `src/common/lib/routing/noindex.ts`의 `NOINDEX_ROUTES`.

## MDX 컴포넌트

`src/common/components/mdx/<name>/index.tsx` + `index.stories.tsx`를 만들고
`src/common/components/mdx/components.tsx`의 맵에 넣는다. 맵은 `mdxComponents(lang)` 팩토리라
글, 프로젝트 상세, 논문이 같은 걸 쓴다. 본문 요소(`p`, `ul`, `table` ...)의 모양은 컴포넌트가
아니라 `src/common/components/mdx/prose/index.tsx`의 `prose` 하나가 자손 선택자로 정한다.
글자 크기와 행간은 `config/text-styles.ts`의 `textStyle: 'prose'`다.

## 스타일

- 토큰: `panda.config.ts`(크기, 그림자, 폰트) + `src/common/styles/config/palette.ts`(색,
  테마별) + `src/common/styles/config/text-styles.ts`(textStyle, 자간).
- 레시피: `src/common/styles/recipes/<name>.ts`에 두고 `recipes/index.ts`에서 export. 파일
  둘 이상이 쓰는 것만.
  한 파일 안에서 두 번이면 그 파일의 상수, 한 번이면 `className={css({...})}` 인라인 -
  `scripts/lint-inline-css.ts`가 잡는다.
- `styled-system/`은 생성물이다(`bun run gen`).

## 생성물

커밋하지 않고 `bun install`(postinstall), `bun run build`가 만든다.

| 생성물                                     | 만드는 것             |
| ------------------------------------------ | --------------------- |
| `src/types/i18next.d.ts`, `resources.d.ts` | `gen:i18n`            |
| `styled-system/`                           | `panda codegen`       |
| README `<!-- tech:start -->` 구간          | `gen:readme` (커밋함) |

새 생성기는 `scripts/gen-<name>.ts`로 만들고 `package.json`의 `gen`(또는 `build`) 순서에
끼운다. 실패하면 조용히 넘기지 말고 던진다 - 배포본이 로컬과 달라지는 것보다 빌드 실패가 낫다.

## 에이전트 설정

- `.claude/skills/<name>/SKILL.md` - frontmatter의 `description` 트리거로 자동 로드.
- `.claude/commands/<name>.md` - `/<name>`. `new-feature`, `new-component`가 있다.
- `.claude/agents/<name>.md` - 서브에이전트(`ui-reviewer`).
- 규칙은 `AGENTS.md` 한 파일이고 `CLAUDE.md`가 import 한다. 세션마다 통째로 실리므로 짧게
  유지한다. 규칙의 이유와 겪은 함정은 `docs/rationale.md`로 빼고 거기서 찾아 읽는다.

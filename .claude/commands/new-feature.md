---
description: feature slice 전 계층·배럴·로케일 네임스페이스·라우트까지 갖춘 feature를 스캐폴드한다
argument-hint: <feature-name>
---

`AGENTS.md` §3(아키텍처)을 그대로 따라 `$1` feature를 만든다.

`src/features/career/`가 전 계층을 한 번씩 다 보여준다. 먼저 읽어라.

## 파일

```
src/features/$1/
├── index.ts            # 배럴. 바깥에서 보이는 유일한 표면
├── paths.ts            # 라우트가 쓸 데이터. 배럴에 올리지 않는다
├── model/index.ts      # zod 스키마, 도메인 타입, 콘텐츠 수집
├── lib/index.ts        # 순수 로직. components 가 필요한 model 타입도 여기서 재export
├── components/
│   ├── index.ts
│   └── $1-page.tsx     # 화면 전체. props 만 받는다
├── view/$1-view.tsx    # 조립 지점. model 을 읽어 components 에 넘기고 Provider 를 씌운다
└── hooks/              # 브라우저 상태가 있을 때만. 있으면 하이드레이션이 강제된다
```

여기에 라우트 파일 하나: `src/pages/[lang]/$1/index.astro`.
코드펜스에는 `export const getStaticPaths = $1Paths;` 와 props 구조분해만 둔다.

## 다들 까먹는 스텝

1. `src/common/hooks/use-site-sections.ts`의 `SECTIONS`에 한 줄 (독에 넣을 때만).
2. `src/locales/{ko,en}/$1.json`은 손으로 만들지 않는다 - `useTranslation('$1')`과 `t()`
   호출이 소스에 있는 상태에서 `bun run gen:i18n`을 돌리면 생긴다. 등록할 곳은 없다.
   한쪽 언어 파일이 빠지면 `bun run test`의 i18n 완전성 테스트가 잡는다.

## 걸려 넘어질 규칙

- **`components`는 `model`을 import할 수 없다.** 타입이 필요하면 `lib/index.ts`가 재export한다.
- **`view/`는 계층 밖이다.** `components/` 안에 두면 boundaries가 막는다.
- **`client:*`는 `.astro`가 붙인다.** 브라우저 API가 필요할 때만. 기본은 SSR 뿐이고 JS 0이다.
- story 없는 컴포넌트를 만들지 않는다.

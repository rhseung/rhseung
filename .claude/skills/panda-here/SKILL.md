---
name: panda-here
description: 이 프로젝트에서 스타일을 쓰거나 컴포넌트를 만들기 전에 읽는다 - Panda CSS 의 css/cva/sva 를 어디에 쓰는지, 토큰 이름, 같은 속성을 덮어쓸 때의 함정. 트리거 - 스타일, className, css(), cva, sva, 토큰, textStyle, 색, 간격, Badge, Button, 프리미티브, 컴포넌트 추가.
---

# 이 레포의 Panda

## 1. 셋 중 하나를 고른다

| 상황                                              | 도구                                                                                                                            |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 그 자리에서만 쓰는 레이아웃 (flex, gap, 폭, 정렬) | `css({...})` 인라인. 반복 레이아웃은 `styled-system/patterns` 의 `stack`/`hstack`                                               |
| 같은 묶음이 두 번 이상 나오거나 variant 가 있다   | `cva` 레시피. 여러 파일이 쓰면 `src/common/styles/`                                                                             |
| 슬롯이 여럿이다 (root, item, label)               | `sva` 레시피 (`page`, `prose` 가 예)                                                                                            |
| 텍스트 한 줄 (크기, 굵기, 행간)                   | `textStyle: 'body' \| 'caption' \| 'micro' \| 'heading.page' \| 'heading.section' \| 'heading.sub' \| 'heading.card' \| 'stat'` |

한 번 쓰는 `css()` 는 변수로 빼지 않고 `className={css({...})}` 로 그 자리에 쓴다. 같은 파일에서
두 번 이상일 때만 상수, 파일 둘 이상이면 `src/common/styles/` 의 레시피다.

값은 전부 토큰이다. `px: '13px'` 같은 임의값은 `strictTokens` 가 컴파일 에러로 막는다.
정말 토큰이 될 수 없는 값(`calc`, `1px`, `50%`)만 대괄호 탈출구 `'[1px]'` 로 적는다.

## 2. 토큰 이름은 역할이다

색: `surface` / `surface.raised` / `surface.muted` / `text` / `text.muted` / `accent` / `accent.fg` /
`danger` / `line` / `line.input` / `focus` / `tone.*` / `contribution.*`. 값은
`src/common/styles/palette.ts` 가 `Record<ThemeMode, Palette>` 로 든다 - 테마를 추가하면 팔레트 전체를
채워야 컴파일된다. 투명도는 `'text.muted/60'`.

테두리는 `border: 'line' | 'input' | 'transparent'`, 링은 `boxShadow: 'focus' | 'danger' | 'selected'`,
폰트는 `fontFamily: 'body' | 'display' | 'mono' | 'serif'`.

## 3. 같은 속성을 두 번 붙이지 않는다

Panda 의 원자 클래스는 같은 속성이 두 번 붙으면 **스타일시트 순서**가 이기는 쪽을 정한다.
호출 순서가 아니다. 그래서 `className` 으로 컴포넌트의 속성을 덮어쓰지 않는다.

- 레이아웃만 얹는다 (`ml: 'auto'`, `position`). 이건 충돌이 없다.
- 컴포넌트의 속성을 바꿔야 하면 그 컴포넌트가 받는 `css` prop 으로 병합한다
  (`Badge`, `ToggleGroupItem`, `PopoverContent`, `SheetContent`). 안에서 `css(recipe.raw(...), cssProp)`
  로 한 객체가 되어 나중 키가 이긴다.
- 상태는 클래스 삼항이 아니라 속성 셀렉터다 - `'&[aria-current=page]'`, `_pressed`, `_open`.

## 4. 프리미티브는 우리 것이다

`src/common/components/ui/` 는 shadcn 에서 시작했지만 이제 Panda 레시피로 다시 쓴 우리 코드다.
CLI 로 재생성하지 않는다. 헤드리스는 그대로 **Base UI** 라 합성은 `asChild` 가 아니라 `render` prop:

```tsx
<Button render={<a href="/">Home</a>} />
```

`Button` 안의 아이콘은 `data-icon="inline-start"` 만 붙이고 크기는 안 준다 - 컴포넌트가 정한다.

## 5. 본문은 `prose` 하나다

MDX 글, 프로젝트 상세, 논문(hast -> JSX) 전부 `<Prose>` 안에서 `src/common/styles/prose.ts` 의
레시피를 받는다. 블록 사이 간격은 `> * + *` 가 맡으므로 MDX 컴포넌트는 자기 마진을 갖지 않는다.
본문 글꼴이나 간격을 바꿀 때 열 파일은 그 하나다.

## 6. 컴포넌트마다 스토리

kebab-case 폴더에 `index.tsx` + `index.stories.tsx`. 스토리가 브라우저 테스트(a11y 포함)로 돈다.
대비가 4.5:1 아래로 떨어지면 실패하니 작은 글자에 `text.muted/60` 같은 투명도를 함부로 주지 않는다.

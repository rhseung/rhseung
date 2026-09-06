import { css, cva } from 'styled-system/css';

// 본문 디자인 전체가 이 한 객체다. 블록 사이 리듬은 `> * + *` 가 맡고, 요소는 자기 모양만 갖는다.
export const prose = cva({
  base: {
    color: 'text',
    textStyle: 'prose',
    wordBreak: 'keep-all',
    '& > * + *': { mt: '5' },
    '& > :is(h1, h2)': { mt: '12' },
    '& > :is(h3, h4, h5, h6)': { mt: '8' },
    '& > :is(h1, h2, h3, h4, h5, h6) + *': { mt: '3' },
    '& :is(li, blockquote, td, th) > * + *': { mt: '2' },

    '& h1': { textStyle: 'heading.page' },
    '& h2': { textStyle: 'heading.section' },
    '& h3': { textStyle: 'heading.sub' },
    '& h4': { textStyle: 'heading.card', fontWeight: 'semibold' },
    '& :is(h5, h6)': { textStyle: 'sm', fontWeight: 'semibold' },
    '& :is(h1, h2, h3, h4, h5, h6) a': { color: '[inherit]', fontWeight: '[inherit]' },

    '& :is(ul, ol)': { pl: '6' },
    '& ul': { listStyleType: 'disc' },
    '& ol': { listStyleType: 'decimal' },
    '& li': { pl: '1' },
    '& li + li': { mt: '1' },
    '& li > :is(ul, ol)': { mt: '1' },
    '& ::marker': { color: 'text.muted' },
    '& li:has(> input[type=checkbox])': { position: 'relative', listStyleType: 'none' },
    // 체크는 mask 라야 색이 토큰을 따라간다. GFM 은 체크박스를 항상 `disabled` 로 낸다.
    '& input[type=checkbox]': {
      position: 'absolute',
      top: '[0.3em]',
      left: '[-1.5rem]',
      display: 'inline-grid',
      boxSize: '4',
      flexShrink: 0,
      appearance: 'none',
      placeContent: 'center',
      rounded: '[4px]',
      border: 'input',
      transition: 'colors',
      opacity: 1,
      _checked: { borderColor: 'accent', bg: 'accent' },
      '&:checked::after': {
        content: '""',
        boxSize: '3.5',
        bg: 'accent.fg',
        mask: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cpath d='M232.49 80.49l-128 128a12 12 0 01-17 0l-56-56a12 12 0 1117-17L96 183 215.51 63.51a12 12 0 0117 17z'/%3E%3C/svg%3E\") center / contain no-repeat",
      },
    },

    '& blockquote': {
      borderLeftWidth: '[4px]',
      borderLeftStyle: 'solid',
      borderLeftColor: 'line',
      pl: '4',
      color: 'text.muted',
    },
    '& hr': { borderTop: 'line', my: '10' },
    '& :is(img, video)': { rounded: 'lg', border: 'line' },
    '& strong': { fontWeight: 'semibold' },

    '& :not(pre) > code': {
      rounded: 'md',
      bg: 'surface.muted',
      px: '1.5',
      py: '0.5',
      fontFamily: 'mono',
      fontSize: '[0.85em]',
      fontWeight: 'normal',
    },
    // shiki 가 `defaultColor: false` 로 두 테마 색을 CSS 변수로 낸다. `pre` 에 배경, `span` 에 글자색.
    '& pre': {
      overflowX: 'auto',
      rounded: 'lg',
      p: '4',
      fontFamily: 'mono',
      textStyle: 'sm',
      lineHeight: '[1.7]',
      color: 'var(--shiki-light)',
      bg: 'var(--shiki-light-bg)',
      _dark: { color: 'var(--shiki-dark)', bg: 'var(--shiki-dark-bg)' },
    },
    '& pre span': {
      color: 'var(--shiki-light)',
      fontStyle: 'var(--shiki-light-font-style)',
      fontWeight: 'var(--shiki-light-font-weight)',
      textDecoration: 'var(--shiki-light-text-decoration)',
      _dark: {
        color: 'var(--shiki-dark)',
        fontStyle: 'var(--shiki-dark-font-style)',
        fontWeight: 'var(--shiki-dark-font-weight)',
        textDecoration: 'var(--shiki-dark-text-decoration)',
      },
    },

    '& table': { w: 'full', borderCollapse: 'collapse', textStyle: 'sm', textAlign: 'left' },
    '& thead': { borderBottom: 'line' },
    '& th': {
      color: 'text.muted',
      textStyle: 'caption',
      fontWeight: 'medium',
      letterSpacing: 'wide',
    },
    '& tbody tr + tr': { borderTop: 'line' },
    '& :is(th, td)': { py: '2.5', pr: '4', verticalAlign: 'top' },

    '& sup a': { color: 'accent', fontWeight: 'medium', textDecoration: 'none' },
    '& .footnotes': { mt: '12', borderTop: 'line', pt: '6', color: 'text.muted', textStyle: 'sm' },
    '& .footnotes li::marker': { color: 'text.muted', textStyle: 'caption' },
    '& .footnotes p': { my: '0' },

    // 논문. unified-latex 가 낸 클래스와 KaTeX 내부 DOM 을 여기서 받는다.
    '& .environment.abstract': {
      mb: '8',
      borderLeftWidth: '[2px]',
      borderLeftStyle: 'solid',
      borderLeftColor: 'line',
      py: '1',
      pl: '4',
      color: 'text.muted',
      textStyle: 'sm',
    },
    // `.tag` 가 `absolute` 라 자리를 안 차지한다. 패딩으로 레인을 비워야 안 겹친다.
    '& .display-math': { position: 'relative', my: '6', pr: '10', textAlign: 'center' },
    '& .citation': {
      fontWeight: 'normal',
      textDecoration: 'underline',
      textDecorationColor: 'text.muted/40',
      textUnderlineOffset: '2px',
      _hover: { textDecorationColor: 'current' },
    },
  },
  variants: {
    layout: {
      article: {},
      paper: {
        fontFamily: 'serif',
        lineHeight: '[1.5]',
        textAlign: 'justify',
        hyphens: 'auto',
        counterReset: 'section',
        '& :is(h2, h3, h4)': { textAlign: 'left' },
        '& h2': { counterIncrement: 'section', counterReset: 'subsection' },
        '& h3': { counterIncrement: 'subsection' },
        '& h2::before': { content: 'counter(section)', mr: '[0.75em]' },
        '& h3::before': { content: "counter(section) '.' counter(subsection)", mr: '[0.75em]' },
        // unified-latex 는 이어지는 텍스트를 같은 `<p>` 에 넣는다. 새 `<p>` 는 곧 새 문단이다.
        '& > p + p': { mt: '0' },
        '& p': { textIndent: '[1.5em]' },
        '& :is(h2, h3, h4) + p': { textIndent: '0' },
        '& .katex': { fontSize: '[1em]' },
        // KaTeX 의 세로 마진을 안쪽 패딩으로 옮긴다. 글리프가 줄상자를 몇 px 넘겨서, 여유가
        // 없으면 세로 스크롤바가 서고 위쪽은 스크롤로 닿지도 못해 잘린다.
        '& .display-math .katex-display': {
          display: 'flex',
          justifyContent: '[safe center]',
          overflow: '[auto hidden]',
          my: '0',
          py: '[1em]',
        },
        // `.tag` 의 컨테이닝 블록을 스크롤러 바깥으로 올린다. `.katex` 까지 같이 풀어야 번호가
        // 수식 꼬리 위에 안 얹힌다.
        '& .display-math :is(.katex, .katex-html)': { position: 'static' },
      },
    },
  },
  defaultVariants: { layout: 'article' },
});

export const proseLink = css({
  textDecoration: 'underline',
  textDecorationColor: 'current/40',
  textDecorationThickness: '[0.0625em]',
  textUnderlineOffset: '2px',
});

export const bibliography = css({
  '& .csl-entry': {
    mb: '2',
    pl: '6',
    textIndent: '[-1.5rem]',
    color: 'text.muted',
    textStyle: 'sm',
    lineHeight: 'relaxed',
  },
});

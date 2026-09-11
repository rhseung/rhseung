import { cva, cx } from 'styled-system/css';

import type { Language } from '@/common/lib';

import { useCodeCopy } from '../code-block/use-code-copy';

const prose = cva({
  base: {
    color: 'text.body',
    textStyle: 'prose',
    wordBreak: 'keep-all',
    '& > :first-child, & > astro-slot > :first-child': { mt: '0' },

    '& :is(img, video):not([class*="_"])': { rounded: 'lg', border: 'line' },

    '& sup a': { color: 'accent', fontWeight: 'medium', textDecoration: 'none' },
    '& .footnotes': { mt: '12', borderTop: 'line', pt: '6', color: 'text.muted', textStyle: 'sm' },
    '& .footnotes > h2': { srOnly: true },
    '& .footnotes li::marker': { color: 'text.muted', textStyle: 'caption' },
    '& .footnotes p': { my: '0' },

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
        '& :is(h1, h2, h3, h4, h5, h6)': { fontFamily: 'serif', textAlign: 'left' },
        '& h2': { counterIncrement: 'section', counterReset: 'subsection' },
        '& h3': { counterIncrement: 'subsection' },
        '& h2::before': { content: 'counter(section)', mr: '[0.75em]' },
        '& h3::before': { content: "counter(section) '.' counter(subsection)", mr: '[0.75em]' },
        '& > p + p, & > astro-slot > p + p': { mt: '0' },
        '& p': { textIndent: '[1.5em]' },
        '& :is(h2, h3, h4) + p': { textIndent: '0' },
        '& .katex': { fontSize: '[1em]' },
        '& .display-math .katex-display': {
          display: 'flex',
          justifyContent: '[safe center]',
          overflow: '[auto hidden]',
          my: '0',
          py: '[1em]',
        },
        '& .display-math :is(.katex, .katex-html)': { position: 'static' },
      },
    },
  },
  defaultVariants: { layout: 'article' },
});

export function Prose({ lang, layout = 'article', className, children }: Prose.Props) {
  const ref = useCodeCopy<HTMLDivElement>();

  return (
    <div ref={ref} lang={lang} className={cx(prose({ layout }), className)}>
      {children}
    </div>
  );
}

export declare namespace Prose {
  export type Props = {
    lang?: Language;
    layout?: 'article' | 'paper';
    className?: string;
    children: React.ReactNode;
  };
}

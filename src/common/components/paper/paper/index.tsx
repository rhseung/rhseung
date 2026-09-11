import { css, cx } from 'styled-system/css';

import type { Language } from '@/common/lib';

import { useCodeCopy } from '../../mdx/code-block/use-code-copy';

export function Paper({ lang, className, children }: Paper.Props) {
  const ref = useCodeCopy<HTMLDivElement>();

  return (
    <div
      ref={ref}
      lang={lang}
      className={cx(
        css({
          color: 'text.body',
          textStyle: 'prose',
          wordBreak: 'keep-all',
          fontFamily: 'serif',
          lineHeight: '[1.5]',
          textAlign: 'justify',
          hyphens: 'auto',
          counterReset: 'section',
          '& > :first-child, & > astro-slot > :first-child': { mt: '0' },

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
          '& .citation': {
            fontWeight: 'normal',
            textDecoration: 'underline',
            textDecorationColor: 'text.muted/40',
            textUnderlineOffset: '2px',
            _hover: { textDecorationColor: 'current' },
          },

          '& .katex': { fontSize: '[1em]' },
          '& .display-math': { position: 'relative', my: '6', pr: '10', textAlign: 'center' },
          '& .display-math .katex-display': {
            display: 'flex',
            justifyContent: '[safe center]',
            overflow: '[auto hidden]',
            my: '0',
            py: '[1em]',
          },
          '& .display-math :is(.katex, .katex-html)': { position: 'static' },
        }),
        className,
      )}
    >
      {children}
    </div>
  );
}

export declare namespace Paper {
  export type Props = {
    lang?: Language;
    className?: string;
    children: React.ReactNode;
  };
}

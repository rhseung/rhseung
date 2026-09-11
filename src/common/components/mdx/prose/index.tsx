import { css, cx } from 'styled-system/css';

import type { Language } from '@/common/lib';

import { useCodeCopy } from '../code-block/use-code-copy';

const prose = css({
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
});

export function Prose({ lang, className, children }: Prose.Props) {
  const ref = useCodeCopy<HTMLDivElement>();

  return (
    <div ref={ref} lang={lang} className={cx(prose, className)}>
      {children}
    </div>
  );
}

export declare namespace Prose {
  export type Props = {
    lang?: Language;
    className?: string;
    children: React.ReactNode;
  };
}

import { cx } from 'styled-system/css';

import type { Language } from '@/common/lib';
import { prose } from '@/common/styles';

import { useCodeCopy } from '../code-block/use-code-copy';

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

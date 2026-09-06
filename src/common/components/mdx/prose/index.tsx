import { cx } from 'styled-system/css';

import type { Language } from '@/common/lib';
import { prose } from '@/common/styles';

export function Prose({ lang, layout = 'article', className, children }: Prose.Props) {
  return (
    <div lang={lang} className={cx(prose({ layout }), className)}>
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

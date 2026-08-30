import { useEffect, useRef } from 'react';

import { useTranslation } from 'react-i18next';

import { cn } from '@/common/utils';

import { useActiveHeading, type PostHeading } from '../../../viewmodels';

export function PostToc({ headings, className }: PostToc.Props) {
  const { t } = useTranslation('blog');
  const active = useActiveHeading(headings.map(({ slug }) => slug));
  const activeRef = useRef<HTMLAnchorElement>(null);

  // `nearest` 라야 페이지 스크롤까지 같이 끌고 가지 않는다.
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (headings.length === 0) return null;

  const label = t(($) => $.detail.toc);

  return (
    <nav aria-label={label} className={cn('flex flex-col gap-3', className)}>
      <p className="text-muted-foreground shrink-0 text-xs font-medium">{label}</p>

      <ul className="flex min-h-0 flex-col gap-1 overflow-y-auto text-sm">
        {headings.map(({ depth, slug, text }) => (
          <li key={slug}>
            <a
              ref={slug === active ? activeRef : undefined}
              href={`#${slug}`}
              aria-current={slug === active ? 'location' : undefined}
              className={cn(
                'block py-0.5 leading-snug transition-colors',
                depth > 2 && 'pl-3',
                slug === active
                  ? 'text-foreground font-medium'
                  : 'text-muted-foreground/70 hover:text-foreground',
              )}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export declare namespace PostToc {
  export type Props = {
    headings: readonly PostHeading[];
    className?: string;
  };
}

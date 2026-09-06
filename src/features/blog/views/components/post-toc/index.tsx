import { useEffect, useRef } from 'react';

import { useTranslation } from 'react-i18next';
import { css, cx } from 'styled-system/css';

import { useActiveHeading, type PostHeading } from '../../../viewmodels';

const nav = css({ display: 'flex', flexDirection: 'column', gap: '3' });

export function PostToc({ headings, className }: PostToc.Props) {
  const { t } = useTranslation('blog');
  const active = useActiveHeading(headings.map(({ slug }) => slug));
  const activeRef = useRef<HTMLAnchorElement>(null);

  // `nearest` 라야 페이지 스크롤까지 같이 끌고 가지 않는다.
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (headings.length === 0) return null;

  const heading = t(($) => $.detail.toc);

  return (
    <nav aria-label={heading} className={cx(nav, className)}>
      <p
        className={css({
          flexShrink: 0,
          color: 'text.muted',
          textStyle: 'caption',
          fontWeight: 'medium',
        })}
      >
        {heading}
      </p>

      <ul
        className={css({
          display: 'flex',
          minH: '0',
          flexDirection: 'column',
          gap: '1',
          overflowY: 'auto',
          textStyle: 'sm',
        })}
      >
        {headings.map(({ depth, slug, text }) => (
          <li key={slug}>
            <a
              ref={slug === active ? activeRef : undefined}
              href={`#${slug}`}
              aria-current={slug === active ? 'location' : undefined}
              style={{ paddingLeft: `${(depth - 2) * 0.75}rem` }}
              className={css({
                display: 'block',
                py: '0.5',
                lineHeight: 'snug',
                color: 'text.muted/70',
                transition: 'colors',
                _hover: { color: 'text' },
                '&[aria-current=location]': { color: 'text', fontWeight: 'medium' },
              })}
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

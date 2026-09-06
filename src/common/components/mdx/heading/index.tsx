import { LinkIcon } from '@heroicons/react/24/outline';
import { css, cx } from 'styled-system/css';

/**
 * `@astrojs/mdx` 가 사용자 rehype 플러그인을 `rehypeHeadingIds` 앞에 밀어넣어서
 * `rehype-autolink-headings` 는 id 가 없는 채로 돌다 조용히 아무것도 안 한다.
 *
 * 제목을 통째로 감싸지 않는 건 제목 안에 링크가 있으면 `<a>` 가 중첩돼 파서가 바깥
 * 앵커를 먼저 닫기 때문이다.
 */
export function MdxHeading({ level, id, permalinkLabel, children }: MdxHeading.Props) {
  const Tag = `h${level}` as const;

  if (id === undefined) return <Tag>{children}</Tag>;

  return (
    <Tag id={id} className={cx('group', css({ position: 'relative' }))}>
      <a
        href={`#${id}`}
        aria-label={permalinkLabel}
        className={css({
          position: 'absolute',
          left: '-7',
          display: 'none',
          h: '[1lh]',
          alignItems: 'center',
          textDecoration: 'none',
          opacity: 0,
          transition: 'opacity',
          color: 'text.muted/60',
          _hover: { color: 'text.muted' },
          _focusVisible: { opacity: 1 },
          _groupHover: { opacity: 1 },
          lg: { display: 'flex' },
        })}
      >
        <LinkIcon aria-hidden className={css({ boxSize: '[0.8em]' })} />
      </a>
      {children}
    </Tag>
  );
}

export declare namespace MdxHeading {
  export type Level = 1 | 2 | 3 | 4 | 5 | 6;

  export type SlotProps = {
    id?: string;
    children: React.ReactNode;
  };

  export type Props = SlotProps & { level: Level; permalinkLabel: string };
}

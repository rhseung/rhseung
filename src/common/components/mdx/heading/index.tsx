import { LinkIcon } from '@heroicons/react/24/outline';

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
    <Tag id={id} className="group relative">
      <a
        href={`#${id}`}
        aria-label={permalinkLabel}
        className="text-muted-foreground/60! hover:text-muted-foreground! absolute -left-7 hidden h-[1lh] items-center no-underline opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 lg:flex"
      >
        <LinkIcon aria-hidden className="size-[0.8em]" />
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

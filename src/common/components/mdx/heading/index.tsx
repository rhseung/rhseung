import { useTranslation } from 'react-i18next';

/**
 * 앵커를 rehype 플러그인이 아니라 컴포넌트로 붙이는 이유 — `@astrojs/mdx` 는 사용자
 * rehype 플러그인을 `rehypeHeadingIds` **앞**에 밀어넣는다(`plugins.js` 의 `getRehypePlugins`).
 * 그래서 `rehype-autolink-headings` 를 config 에 걸면 아직 `id` 가 없어 조용히 아무것도 안 한다.
 * 컴포넌트는 id 가 붙은 뒤의 props 를 받으므로 순서 문제가 없다.
 *
 * 제목 전체를 링크로 감싸지 않는다 — 제목에 링크가 들어간 경우(`## [무엇](/)을 쓸까`)
 * `<a>` 가 중첩되고, 파서가 바깥 앵커를 먼저 닫아 제목 앞부분만 링크로 남는다.
 */
export function MdxHeading({ level, id, children }: MdxHeading.Props) {
  const { t } = useTranslation('common');
  const Tag = `h${level}` as const;

  if (id === undefined) return <Tag>{children}</Tag>;

  return (
    <Tag id={id} className="group">
      {children}
      <a
        href={`#${id}`}
        aria-label={t(($) => $.actions.permalink)}
        className="text-muted-foreground ml-2 no-underline opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
      >
        #
      </a>
    </Tag>
  );
}

export declare namespace MdxHeading {
  export type Level = 2 | 3 | 4;

  export type SlotProps = {
    id?: string;
    children: React.ReactNode;
  };

  export type Props = SlotProps & { level: Level };
}

// h5·h6 은 본문에서 안 쓴다. 쓰게 되면 여기에 한 줄씩 는다.
export const MdxH2 = (props: MdxHeading.SlotProps) => <MdxHeading level={2} {...props} />;
export const MdxH3 = (props: MdxHeading.SlotProps) => <MdxHeading level={3} {...props} />;
export const MdxH4 = (props: MdxHeading.SlotProps) => <MdxHeading level={4} {...props} />;

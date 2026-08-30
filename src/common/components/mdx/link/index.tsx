import { ExternalLink } from '../../layout/external-link';

/**
 * 마크다운의 `[텍스트](url)` 은 날 `<a>` 로 나온다 — 여기서 갈라놓지 않으면 본문 링크만
 * `rel="noreferrer noopener"` 와 ↗ 아이콘이 빠진 채로 사이트 밖으로 나간다.
 *
 * 프로토콜로 판정한다. `/ko/blog/` 같은 내부 경로와 `#footnote` 앵커는 그대로 둔다.
 */
export function MdxLink({ href, children }: MdxLink.Props) {
  if (href !== undefined && /^https?:\/\//.test(href)) {
    return <ExternalLink href={href}>{children}</ExternalLink>;
  }

  return <a href={href}>{children}</a>;
}

export declare namespace MdxLink {
  export type Props = {
    href?: string;
    children: React.ReactNode;
  };
}

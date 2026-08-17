import { ArrowUpRightIcon } from '@phosphor-icons/react';

import { cn } from '@/common/utils';

/**
 * 사이트 밖으로 나가는 링크. **항상 ↗ 아이콘이 붙는다.**
 *
 * 손으로 `<a target="_blank">`를 쓰지 않는 이유는 둘이다. `rel="noreferrer noopener"`를
 * 빠뜨릴 수 없게 하고, "여기 누르면 이 사이트를 떠난다"는 신호가 링크마다 갈리지 않게
 * 한다. 아이콘은 장식이 아니라 그 신호다 — `aria-hidden`이라 스크린리더는 건너뛴다.
 */
export function ExternalLink({ href, className, children }: ExternalLink.Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn('inline-flex items-center gap-1', className)}
    >
      {children}
      <ArrowUpRightIcon aria-hidden className="size-3.5 shrink-0 opacity-60" />
    </a>
  );
}

export declare namespace ExternalLink {
  export type Props = {
    href: string;
    className?: string;
    children: React.ReactNode;
  };
}

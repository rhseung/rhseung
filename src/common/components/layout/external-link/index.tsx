import { ArrowUpRightIcon } from '@phosphor-icons/react';

import { cn } from '@/common/utils';

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

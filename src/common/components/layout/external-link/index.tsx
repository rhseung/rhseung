import { ArrowSquareOutIcon } from '@phosphor-icons/react';

import { cn } from '@/common/utils';

export function ExternalLink({ href, className, children }: ExternalLink.Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        'inline-flex items-center gap-0.5 underline decoration-current/40 decoration-[0.0625em] underline-offset-2',
        className,
      )}
    >
      {children}
      <ArrowSquareOutIcon aria-hidden className="size-[1em] shrink-0 opacity-40" />
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

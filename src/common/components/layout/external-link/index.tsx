import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

import { FAVICON_HOSTS } from '@/common/lib';
import { cn } from '@/common/utils';

export function ExternalLink({
  href,
  showFavicon = false,
  className,
  children,
}: ExternalLink.Props) {
  const host = URL.parse(href)?.host;
  const canShowFavicon = showFavicon && host !== undefined && FAVICON_HOSTS.has(host);

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
      {canShowFavicon ? (
        <img
          src={`/favicons/${host}.png`}
          alt=""
          aria-hidden
          width={16}
          height={16}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className="size-[1em] shrink-0 rounded-full"
        />
      ) : (
        <ArrowTopRightOnSquareIcon aria-hidden className="size-[1em] shrink-0 opacity-40" />
      )}
    </a>
  );
}

export declare namespace ExternalLink {
  export type Props = {
    href: string;
    showFavicon?: boolean;
    className?: string;
    children: React.ReactNode;
  };
}

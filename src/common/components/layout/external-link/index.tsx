import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { css, cx } from 'styled-system/css';

import { FAVICON_HOSTS } from '@/common/lib';

export function ExternalLink({
  href,
  showFavicon = false,
  plain = false,
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
      className={cx(
        css({ display: 'inline-flex', alignItems: 'center' }),
        !plain &&
          css({
            gap: '0.5',
            textDecoration: 'underline',
            textDecorationColor: 'current/40',
            textDecorationThickness: '[0.0625em]',
            textUnderlineOffset: '2px',
          }),
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
          className={css({ boxSize: '[1em]', flexShrink: 0, rounded: 'full' })}
        />
      ) : (
        <ArrowTopRightOnSquareIcon
          aria-hidden
          className={css({ boxSize: '[1em]', flexShrink: 0, opacity: 0.4 })}
        />
      )}
    </a>
  );
}

export declare namespace ExternalLink {
  export type Props = {
    href: string;
    showFavicon?: boolean;
    plain?: boolean;
    className?: string;
    children: React.ReactNode;
  };
}

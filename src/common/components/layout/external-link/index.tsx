import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { css, cx } from 'styled-system/css';

import { FAVICON_HOSTS } from '@/common/lib';

const link = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5',
});

const underlined = css({
  textDecoration: 'underline',
  textDecorationColor: 'current/40',
  textDecorationThickness: '[0.0625em]',
  textUnderlineOffset: '2px',
});

const favicon = css({ boxSize: '[1em]', flexShrink: 0, rounded: 'full' });
const arrow = css({ boxSize: '[1em]', flexShrink: 0, opacity: 0.4 });

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
      className={cx(link, !plain && underlined, className)}
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
          className={favicon}
        />
      ) : (
        <ArrowTopRightOnSquareIcon aria-hidden className={arrow} />
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

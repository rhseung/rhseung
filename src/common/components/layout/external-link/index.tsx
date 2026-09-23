import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { css, cx } from 'styled-system/css';

const icon = css({ boxSize: '[1em]', flexShrink: 0 });

function Arrow() {
  return <ArrowTopRightOnSquareIcon aria-hidden className={cx(icon, css({ opacity: 0.4 }))} />;
}

export function ExternalLink({
  href,
  showFavicon = false,
  plain = false,
  className,
  children,
}: ExternalLink.Props) {
  const host = URL.parse(href)?.host;

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
      {showFavicon && host !== undefined ? (
        <object
          data={`/api/favicon/${host}`}
          type="image/png"
          aria-hidden
          tabIndex={-1}
          className={cx(icon, css({ rounded: 'full', pointerEvents: 'none' }))}
        >
          <Arrow />
        </object>
      ) : (
        <Arrow />
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

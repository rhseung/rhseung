import { cx } from 'styled-system/css';

import { proseLink } from '@/common/styles';

import { ExternalLink } from '../../layout/external-link';

export function MdxLink({ href, className, children }: MdxLink.Props) {
  if (href !== undefined && /^https?:\/\//.test(href)) {
    return (
      <ExternalLink href={href} showFavicon className={className}>
        {children}
      </ExternalLink>
    );
  }

  return (
    <a href={href} className={cx(proseLink, className)}>
      {children}
    </a>
  );
}

export declare namespace MdxLink {
  export type Props = {
    href?: string;
    className?: string;
    children: React.ReactNode;
  };
}

import { css } from 'styled-system/css';

import type { IconComponent } from '@/common/lib';

import { buttonVariants } from '../../ui/button';
import { ExternalLink } from '../external-link';

const buttons = css({ display: 'flex', flexWrap: 'wrap', gap: '2' });

const list = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  columnGap: '3',
  rowGap: '1',
});

const inlineLink = css({
  color: 'text.muted',
  textStyle: 'xs',
  _hover: { color: 'text', textDecoration: 'underline' },
  '& > svg:first-child': { boxSize: '3.5', flexShrink: 0 },
});

export function LinkRow({ links, variant = 'inline', children }: LinkRow.Props) {
  if (links.length === 0 && !children) return null;

  if (variant === 'button') {
    return (
      <div className={buttons}>
        {links.map(({ key, href, label, Icon }) => (
          <ExternalLink
            key={key}
            href={href}
            plain
            className={buttonVariants({ variant: 'outline', size: 'sm' })}
          >
            <Icon data-icon="inline-start" />
            {label}
          </ExternalLink>
        ))}
        {children}
      </div>
    );
  }

  return (
    <ul className={list}>
      {links.map(({ key, href, label, Icon }) => (
        <li key={key}>
          <ExternalLink href={href} plain className={inlineLink}>
            <Icon aria-hidden />
            {label}
          </ExternalLink>
        </li>
      ))}
      {children && <li>{children}</li>}
    </ul>
  );
}

export declare namespace LinkRow {
  export type Link = { key: string; href: string; label: string; Icon: IconComponent };

  export type Props = {
    links: readonly Link[];
    variant?: 'inline' | 'button';
    children?: React.ReactNode;
  };
}

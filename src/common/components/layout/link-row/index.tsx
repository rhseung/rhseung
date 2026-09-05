import type { IconComponent } from '@/common/lib';
import { cn } from '@/common/utils';

import { buttonVariants } from '../../ui/button';
import { ExternalLink } from '../external-link';

export function LinkRow({ links, variant = 'inline', children }: LinkRow.Props) {
  if (links.length === 0 && !children) return null;

  if (variant === 'button') {
    return (
      <div className="flex flex-wrap gap-2">
        {links.map(({ key, href, label, Icon }) => (
          <ExternalLink
            key={key}
            href={href}
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
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
    <ul className="flex flex-wrap items-center gap-x-3 gap-y-1">
      {links.map(({ key, href, label, Icon }) => (
        <li key={key}>
          <ExternalLink
            href={href}
            className="text-muted-foreground hover:text-foreground text-xs hover:underline"
          >
            <Icon aria-hidden className="size-3.5 shrink-0" />
            {label}
          </ExternalLink>
        </li>
      ))}
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

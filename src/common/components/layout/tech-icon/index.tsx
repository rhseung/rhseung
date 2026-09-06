import { css } from 'styled-system/css';

import type { TechSpec } from '@/content/skills';

const svg = css({ boxSize: '3', flexShrink: 0 });

export function TechIcon({ icon }: TechIcon.Props) {
  return (
    <svg
      aria-hidden
      data-icon="inline-start"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={svg}
    >
      <path d={icon.path} />
    </svg>
  );
}

export declare namespace TechIcon {
  export type Props = {
    icon: NonNullable<TechSpec['icon']>;
  };
}

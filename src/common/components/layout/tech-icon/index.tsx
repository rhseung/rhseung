import { css } from 'styled-system/css';

import type { TechSpec } from '@/content/skills';

// 크기 클래스를 직접 단다. 토글이 클래스 없는 svg 만 4 로 키운다.
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

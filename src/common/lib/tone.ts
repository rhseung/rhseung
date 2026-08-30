import type { CSSProperties } from 'react';

import { tv } from 'tailwind-variants';

export const TONES = ['blue', 'teal', 'green', 'amber', 'purple', 'rose'] as const;

export type Tone = (typeof TONES)[number];

/** 뱃지 `cva` 가 생성물이라 덮는다. modifier 가 다르면 tw-merge 가 안 지워서 되받는다. */
export const tone = tv({
  base: 'bg-muted border-transparent text-(--tone) hover:text-(--tone)',
  variants: {
    tone: {
      blue: '[--tone:var(--color-tone-blue-foreground)]',
      teal: '[--tone:var(--color-tone-teal-foreground)]',
      green: '[--tone:var(--color-tone-green-foreground)]',
      amber: '[--tone:var(--color-tone-amber-foreground)]',
      purple: '[--tone:var(--color-tone-purple-foreground)]',
      rose: '[--tone:var(--color-tone-rose-foreground)]',
      /** 토글이 자기 배경을 여러 modifier 로 깔아서 배경까지 되받아야 한다. */
      brand:
        'tech-tone border-(--tone-border) bg-(--tone-bg) hover:bg-(--tone-bg) aria-pressed:bg-(--tone-bg) data-[state=on]:bg-(--tone-bg)',
    },
  },
});

/** 커스텀 프로퍼티가 `CSSProperties` 에 없어서 캐스팅이 필요하다. */
export const brand = (hex: string) => ({ '--brand': hex }) as CSSProperties;

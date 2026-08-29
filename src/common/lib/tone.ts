import type { CSSProperties } from 'react';

import { tv } from 'tailwind-variants';

export const TONES = ['blue', 'teal', 'green', 'amber', 'purple', 'rose'] as const;

export type Tone = (typeof TONES)[number];

/**
 * 뱃지 `variant` 를 늘리는 대신 클래스를 덮는 이유: 그 `cva` 가 생성물이다.
 * `hover:text-foreground` 를 되받는 이유: modifier 가 달라 tw-merge 가 안 지운다.
 */
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
      /**
       * 6색 팔레트가 아니라 뱃지가 넘긴 `--brand` 에서 파생한다. `styles.css` 참고.
       * `bg-muted` 를 배경까지 되받는 이유: 토글이 `hover:`·`aria-pressed:`·
       * `data-[state=on]:` 로 자기 배경을 깔아서, modifier 가 다르면 tw-merge 가 안 지운다.
       */
      brand:
        'tech-tone border-(--tone-border) bg-(--tone-bg) hover:bg-(--tone-bg) aria-pressed:bg-(--tone-bg) data-[state=on]:bg-(--tone-bg)',
    },
  },
});

/** 커스텀 프로퍼티가 `CSSProperties` 에 없어서 캐스팅이 필요하다. */
export const brand = (hex: string) => ({ '--brand': hex }) as CSSProperties;

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
    },
  },
});

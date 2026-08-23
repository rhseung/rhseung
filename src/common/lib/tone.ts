import { tv } from 'tailwind-variants';

export const TONES = ['blue', 'teal', 'green', 'amber', 'purple', 'rose'] as const;

export type Tone = (typeof TONES)[number];

/**
 * 분류축(연구 종류, 기술 그룹)을 색으로 가른다. 뱃지의 `variant` 를 늘리지 않는 건 그
 * `cva` 가 생성물이라서다 - 여기서 클래스만 얹고 `variant="secondary"` 위에 덮는다.
 *
 * 배경은 색을 안 쓴다. 색 배경을 깔면 칩이 몇 개만 모여도 판 전체가 무지개가 된다.
 * 글자에만 색을 두면 같은 정보를 나르면서 면적이 줄어든다.
 *
 * 토글의 `hover:text-foreground` 를 되받는 이유: modifier 가 달라 tw-merge 가 안 지운다.
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

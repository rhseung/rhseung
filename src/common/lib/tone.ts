import { tv } from 'tailwind-variants';

export const TONES = ['blue', 'teal', 'green', 'amber', 'purple', 'rose'] as const;

export type Tone = (typeof TONES)[number];

/**
 * 분류축(도메인, 연구 종류, 기술 그룹)을 색으로 가른다. 뱃지의 `variant` 를 늘리지 않는
 * 건 그 `cva` 가 생성물이라서다 - 여기서 클래스만 얹고 `variant="secondary"` 위에 덮는다.
 */
export const tone = tv({
  base: 'border-transparent',
  variants: {
    tone: {
      blue: 'bg-tone-blue text-tone-blue-foreground',
      teal: 'bg-tone-teal text-tone-teal-foreground',
      green: 'bg-tone-green text-tone-green-foreground',
      amber: 'bg-tone-amber text-tone-amber-foreground',
      purple: 'bg-tone-purple text-tone-purple-foreground',
      rose: 'bg-tone-rose text-tone-rose-foreground',
    },
  },
});

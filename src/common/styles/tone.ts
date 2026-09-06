import type { CSSProperties } from 'react';

import { css } from 'styled-system/css';

export const TONES = ['blue', 'teal', 'green', 'amber', 'purple', 'rose'] as const;

export type Tone = (typeof TONES)[number];

// 기술마다 브랜드 색이 달라 정적 토큰이 될 수 없다. `--brand` 를 받아 그 자리에서 톤을 만든다.
// `--brand` 가 무채색(`000000`)이면 `h` 가 없어 회색으로 떨어진다.
export const techTone = css.raw({
  '--tone': 'oklch(from var(--brand) 0.45 min(c, 0.07) h)',
  '--tone-bg': 'oklch(from var(--brand) 0.97 min(c, 0.03) h / 55%)',
  '--tone-border': 'oklch(from var(--brand) 0.82 min(c, 0.05) h / 40%)',
  _dark: {
    '--tone': 'oklch(from var(--brand) 0.82 min(c, 0.06) h)',
    '--tone-bg': 'oklch(from var(--brand) 0.28 min(c, 0.035) h / 45%)',
    '--tone-border': 'oklch(from var(--brand) 0.6 min(c, 0.05) h / 30%)',
  },
  color: 'var(--tone)',
  bg: 'var(--tone-bg)',
  borderColor: 'var(--tone-border)',
  backdropFilter: '[blur(8px) saturate(180%)]',
  _hover: { color: 'var(--tone)', bg: 'var(--tone-bg)' },
  _pressed: { bg: 'var(--tone-bg)', boxShadow: 'selected' },
});

export const brand = (hex: string) => ({ '--brand': hex }) as CSSProperties;

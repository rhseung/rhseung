import { defineConfig, defineSemanticTokens } from '@pandacss/dev';
import { preset } from '@pandacss/preset-panda';

import { DEFAULT_THEME, THEME_MODES } from './src/common/lib/theme';
import { globalCss } from './src/common/styles/global';
import { PALETTES, type ColorRole } from './src/common/styles/palette';
import { letterSpacings, textStyles } from './src/common/styles/text-styles';

import type { SemanticTokens } from '@pandacss/dev';

const otherThemes = THEME_MODES.filter((mode) => mode !== DEFAULT_THEME);

// `surface.raised` 같은 점 경로를 Panda 의 중첩 객체로 편다. 값이 자기 자신인 노드는 `DEFAULT` 다.
type ColorTree = NonNullable<SemanticTokens['colors']>;

function colorTokens(): ColorTree {
  const tree: Record<string, unknown> = {};

  for (const role of Object.keys(PALETTES[DEFAULT_THEME]) as ColorRole[]) {
    const value = {
      base: PALETTES[DEFAULT_THEME][role],
      ...Object.fromEntries(otherThemes.map((mode) => [`_${mode}`, PALETTES[mode][role]])),
    };

    const path = role.split('.');
    let node = tree;
    for (const key of path.slice(0, -1)) {
      const child = node[key] as Record<string, unknown> | undefined;
      node[key] = child === undefined ? {} : 'value' in child ? { DEFAULT: child } : child;
      node = node[key] as Record<string, unknown>;
    }
    const leaf = path.at(-1) as string;
    const existing = node[leaf] as Record<string, unknown> | undefined;
    node[leaf] = existing === undefined ? { value } : { ...existing, DEFAULT: { value } };
  }

  return tree as ColorTree;
}

export default defineConfig({
  presets: [
    { ...preset, theme: { ...preset.theme, tokens: { ...preset.theme.tokens, colors: {} } } },
  ],
  include: ['./src/**/*.{ts,tsx,astro}'],
  outdir: 'styled-system',
  jsxFramework: 'react',
  preflight: true,
  strictTokens: true,
  strictPropertyValues: true,

  globalCss,

  conditions: {
    extend: Object.fromEntries(THEME_MODES.map((mode) => [mode, `[data-theme=${mode}] &`])),
  },

  theme: {
    extend: {
      tokens: {
        colors: {
          transparent: { value: 'transparent' },
          current: { value: 'currentColor' },
        },
        letterSpacings,
        fonts: {
          display: { value: "'Pretendard GOV Variable', sans-serif" },
          body: { value: "'Pretendard GOV Variable', sans-serif" },
          mono: { value: "'Monaspace Neon Var', ui-monospace, monospace" },
          // 한글은 CM 에 없어 시스템 명조로 떨어진다.
          serif: { value: 'KaTeX_Main, serif' },
        },
        zIndex: {
          blur: { value: 10 },
          dock: { value: 20 },
          fab: { value: 30 },
          popover: { value: 50 },
        },
        animations: {
          popIn: { value: 'popIn {durations.faster} {easings.out}' },
          popOut: { value: 'popOut {durations.faster} {easings.in}' },
        },
        shadows: {
          none: { value: 'none' },
          focus: { value: '0 0 0 3px {colors.focus/50}' },
          danger: { value: '0 0 0 3px {colors.danger/20}' },
          ring: { value: '0 0 0 1px {colors.text/10}' },
          selected: { value: '0 0 0 2px {colors.text/40}' },
          halo: { value: '0 0 0 4px {colors.surface}' },
        },
        borders: {
          line: { value: { width: '1px', style: 'solid', color: '{colors.line}' } },
          input: { value: { width: '1px', style: 'solid', color: '{colors.line.input}' } },
          transparent: { value: { width: '1px', style: 'solid', color: '{colors.transparent}' } },
        },
        radii: {
          none: { value: '0' },
          sm: { value: '0.375rem' },
          md: { value: '0.5rem' },
          lg: { value: '0.625rem' },
          xl: { value: '0.875rem' },
          '2xl': { value: '1rem' },
        },
      },
      semanticTokens: {
        colors: defineSemanticTokens.colors(colorTokens()),
      },
      textStyles,
      keyframes: {
        vtExitLeft: { to: { opacity: 0, transform: 'translateX(-1.5rem)' } },
        vtEnterLeft: { from: { opacity: 0, transform: 'translateX(-3rem)' } },
        vtExitRight: { to: { opacity: 0, transform: 'translateX(1.5rem)' } },
        vtEnterRight: { from: { opacity: 0, transform: 'translateX(3rem)' } },
        popIn: {
          from: {
            opacity: 0,
            transform: 'translate(var(--enter-x, 0), var(--enter-y, 0)) scale(0.95)',
          },
          to: { opacity: 1, transform: 'translate(0, 0) scale(1)' },
        },
        popOut: {
          from: { opacity: 1, transform: 'translate(0, 0) scale(1)' },
          to: {
            opacity: 0,
            transform: 'translate(var(--enter-x, 0), var(--enter-y, 0)) scale(0.95)',
          },
        },
      },
    },
  },
});

import { defineConfig, defineSemanticTokens } from '@pandacss/dev';
import { preset } from '@pandacss/preset-panda';

import { DEFAULT_THEME, THEME_MODES } from './src/common/lib/theme';
import { PALETTES, type ColorRole } from './src/common/styles/palette';
import { textStyles } from './src/common/styles/text-styles';

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
      node[key] ??= {};
      node = node[key] as Record<string, unknown>;
    }
    const leaf = path.at(-1) as string;
    node[leaf] = typeof node[leaf] === 'object' ? { ...node[leaf], DEFAULT: { value } } : { value };
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
  preflight: false,
  strictTokens: true,
  strictPropertyValues: true,

  conditions: {
    extend: Object.fromEntries(THEME_MODES.map((mode) => [mode, `[data-theme=${mode}] &`])),
  },

  theme: {
    extend: {
      tokens: {
        fonts: {
          display: { value: "'Pretendard GOV Variable', sans-serif" },
          body: { value: "'Pretendard GOV Variable', sans-serif" },
          mono: { value: "'Monaspace Neon Var', ui-monospace, monospace" },
        },
        radii: {
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
    },
  },
});

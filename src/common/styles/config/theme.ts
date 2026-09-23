export const THEME_MODES = ['light', 'dark'] as const;

export type ThemeMode = (typeof THEME_MODES)[number];

export const DEFAULT_THEME = 'light' satisfies ThemeMode;

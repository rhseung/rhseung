export const THEME_MODES = ['light', 'dark', 'system'] as const;

export type ThemeMode = (typeof THEME_MODES)[number];

export const DEFAULT_THEME_MODE: ThemeMode = 'system';

export const THEME_STORAGE_KEY = 'theme';

// `attribute="class"` 라 next-themes 가 모드 이름을 그대로 클래스로 쓴다.
export const DARK_CLASS = 'dark' satisfies ThemeMode;

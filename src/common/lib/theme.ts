export const THEME_MODES = ['light', 'dark'] as const;

export type ThemeMode = (typeof THEME_MODES)[number];

export const DARK_CLASS = 'dark' satisfies ThemeMode;

export const SYSTEM_DARK_QUERY = '(prefers-color-scheme: dark)';

// 첫 페인트 전 스크립트가 번들 밖이라 모듈 스코프로는 못 닿는다.
declare global {
  var __theme: ThemeMode | undefined;
}

const listeners = new Set<() => void>();

export function resolveTheme(): ThemeMode {
  if (globalThis.__theme !== undefined) return globalThis.__theme;
  return matchMedia(SYSTEM_DARK_QUERY).matches ? 'dark' : 'light';
}

export function applyTheme() {
  document.documentElement.classList.toggle(DARK_CLASS, resolveTheme() === DARK_CLASS);
}

export function setTheme(mode: ThemeMode) {
  globalThis.__theme = mode;
  applyTheme();

  for (const listener of listeners) listener();
}

export function subscribeTheme(listener: () => void) {
  listeners.add(listener);

  const media = matchMedia(SYSTEM_DARK_QUERY);
  const onSystemChange = () => {
    applyTheme();
    listener();
  };

  media.addEventListener('change', onSystemChange);

  return () => {
    listeners.delete(listener);
    media.removeEventListener('change', onSystemChange);
  };
}

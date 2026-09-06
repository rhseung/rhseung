export const THEME_MODES = ['light', 'dark'] as const;

export type ThemeMode = (typeof THEME_MODES)[number];

export const SYSTEM_DARK_QUERY = '(prefers-color-scheme: dark)';

// 첫 페인트 전 스크립트가 번들 밖이라 모듈 스코프로는 못 닿는다. undefined 는 "시스템을 따른다".
declare global {
  var __theme: ThemeMode | undefined;
}

const listeners = new Set<() => void>();

export function resolveTheme(): ThemeMode {
  if (globalThis.__theme !== undefined) return globalThis.__theme;
  return matchMedia(SYSTEM_DARK_QUERY).matches ? 'dark' : 'light';
}

export function nextTheme(mode: ThemeMode): ThemeMode {
  return THEME_MODES[(THEME_MODES.indexOf(mode) + 1) % THEME_MODES.length];
}

export function applyTheme() {
  document.documentElement.dataset.theme = resolveTheme();
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

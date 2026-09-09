import { afterEach, describe, expect, it } from 'vitest';

import { applyTheme, type ThemeMode } from '@/common/lib';

import source from './theme.js?raw';

const CASES: { override?: ThemeMode; systemDark: boolean; dark: boolean }[] = [
  { systemDark: true, dark: true },
  { systemDark: false, dark: false },
  { override: 'dark', systemDark: false, dark: true },
  { override: 'light', systemDark: true, dark: false },
];

function stubMatchMedia(systemDark: boolean) {
  window.matchMedia = ((query: string) => ({
    matches: query.includes('dark') && systemDark,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })) as unknown as typeof window.matchMedia;
}

function prepare({ override, systemDark }: { override?: ThemeMode; systemDark: boolean }) {
  delete document.documentElement.dataset.theme;
  globalThis.__theme = override;
  stubMatchMedia(systemDark);
}

function isDark() {
  return document.documentElement.dataset.theme === 'dark';
}

afterEach(() => {
  globalThis.__theme = undefined;
});

describe('페인트 전 테마 스크립트', () => {
  it.each(CASES)('override=$override system=$systemDark 이면 dark=$dark', (testCase) => {
    prepare(testCase);
    new Function(source)();

    expect(isDark()).toBe(testCase.dark);
  });

  it.each(CASES)('override=$override system=$systemDark 에서 applyTheme 과 같다', (testCase) => {
    prepare(testCase);
    new Function(source)();
    const fromScript = isDark();

    prepare(testCase);
    applyTheme();

    expect(isDark()).toBe(fromScript);
  });

  it('astro:after-swap 에 다시 적용한다', () => {
    prepare({ override: 'dark', systemDark: false });
    new Function(source)();

    delete document.documentElement.dataset.theme;
    document.dispatchEvent(new Event('astro:after-swap'));

    expect(isDark()).toBe(true);
  });
});

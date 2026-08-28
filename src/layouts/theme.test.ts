import { describe, expect, it } from 'vitest';

import { DARK_CLASS, DEFAULT_THEME_MODE, THEME_STORAGE_KEY } from '@/common/lib';

import source from './theme.js?raw';

/*
 * `theme.js` 는 번들을 안 타서 타입도 린트도 이 파일과 `@/common/lib` 를 못 묶는다. 실제로
 * 돌려보는 것만이 둘이 어긋난 걸 잡는다 - 어긋나면 첫 페인트에서만 틀린 테마가 나와서
 * 브라우저로도 알아채기 어렵다.
 */

// Node 가 자체 `localStorage` 를 실험 기능으로 잡고 있어 jsdom 것이 전역에서 가려진다.
function stubStorage(stored: string | undefined) {
  const entries = new Map<string, string>();
  if (stored !== undefined) entries.set(THEME_STORAGE_KEY, stored);

  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem: (key: string) => entries.get(key) ?? null,
      setItem: (key: string, value: string) => entries.set(key, value),
    },
  });
}

function stubMatchMedia(systemDark: boolean) {
  window.matchMedia = ((query: string) => ({
    matches: query.includes('dark') && systemDark,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })) as unknown as typeof window.matchMedia;
}

function run({ stored, systemDark = false }: { stored?: string; systemDark?: boolean }) {
  document.documentElement.className = '';
  stubStorage(stored);
  stubMatchMedia(systemDark);

  new Function(source)();

  return document.documentElement.classList.contains(DARK_CLASS);
}

describe('페인트 전 테마 스크립트', () => {
  it('저장된 값이 dark 면 시스템과 무관하게 어둡다', () => {
    expect(run({ stored: 'dark', systemDark: false })).toBe(true);
  });

  it('저장된 값이 light 면 시스템이 어두워도 밝다', () => {
    expect(run({ stored: 'light', systemDark: true })).toBe(false);
  });

  it('system 이면 OS 설정을 따른다', () => {
    expect(run({ stored: 'system', systemDark: true })).toBe(true);
    expect(run({ stored: 'system', systemDark: false })).toBe(false);
  });

  it('저장된 값이 없으면 기본 모드로 떨어진다', () => {
    expect(run({ systemDark: true })).toBe(DEFAULT_THEME_MODE === 'system');
  });

  it('astro:after-swap 에 다시 적용한다', () => {
    run({ stored: 'dark' });

    // 스왑이 <html> 의 속성을 전부 지운다. 그래서 다시 붙이는 리스너가 필요하다.
    document.documentElement.className = '';
    document.dispatchEvent(new Event('astro:after-swap'));

    expect(document.documentElement.classList.contains(DARK_CLASS)).toBe(true);
  });
});

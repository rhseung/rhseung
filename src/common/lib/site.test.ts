import { describe, expect, it } from 'vitest';

import { LANGUAGE_PATHS, localeHref } from './site';

describe('localeHref', () => {
  it('기본 언어에는 접두사를 붙이지 않는다', () => {
    expect(localeHref('ko', '/')).toBe('/');
    expect(localeHref('ko', '/projects')).toBe('/projects/');
  });

  it('보조 언어에는 접두사를 붙인다', () => {
    expect(localeHref('en', '/')).toBe('/en/');
    expect(localeHref('en', '/projects')).toBe('/en/projects/');
  });

  // canonical(`Astro.url.pathname`)이 항상 슬래시로 끝나므로 hreflang도 맞아야 한다.
  it('항상 슬래시로 끝난다', () => {
    expect(localeHref('en', 'projects')).toBe('/en/projects/');
    expect(localeHref('ko', '/blog/')).toBe('/blog/');
  });
});

describe('LANGUAGE_PATHS', () => {
  it('기본 언어는 params가 비어 있어 접두사 없는 라우트가 된다', () => {
    expect(LANGUAGE_PATHS).toEqual([
      { params: { lang: undefined }, props: { lang: 'ko' } },
      { params: { lang: 'en' }, props: { lang: 'en' } },
    ]);
  });
});

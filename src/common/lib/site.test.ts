import { describe, expect, it } from 'vitest';

import { languagePaths, localeHref } from './site';

describe('localeHref', () => {
  it('모든 언어에 접두사를 붙인다', () => {
    expect(localeHref('ko', '/')).toBe('/ko/');
    expect(localeHref('en', '/')).toBe('/en/');
    expect(localeHref('ko', '/projects')).toBe('/ko/projects/');
    expect(localeHref('en', '/projects')).toBe('/en/projects/');
  });

  // canonical(`Astro.url.pathname`)이 항상 슬래시로 끝나므로 hreflang도 맞아야 한다.
  it('항상 슬래시로 끝난다', () => {
    expect(localeHref('en', 'projects')).toBe('/en/projects/');
    expect(localeHref('ko', '/blog/')).toBe('/ko/blog/');
  });
});

describe('languagePaths', () => {
  it('언어마다 라우트 하나', () => {
    expect(languagePaths()).toEqual([
      { params: { lang: 'ko' }, props: { lang: 'ko' } },
      { params: { lang: 'en' }, props: { lang: 'en' } },
    ]);
  });

  // Astro가 라우트별로 이 객체에 내부 상태를 붙인다. 같은 인스턴스를 여러 라우트가
  // 공유하면 두 번째 라우트부터 NoMatchingStaticPathFound로 빌드가 깨진다.
  it('호출마다 새 객체를 준다', () => {
    const [first] = languagePaths();
    const [second] = languagePaths();

    expect(first).not.toBe(second);
    expect(first?.params).not.toBe(second?.params);
  });
});

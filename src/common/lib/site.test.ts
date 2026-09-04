import { describe, expect, it } from 'vitest';

import { isNoindex, languagePaths, localeHref } from './site';

describe('localeHref', () => {
  it('모든 언어에 접두사를 붙인다', () => {
    expect(localeHref('ko', '/')).toBe('/ko/');
    expect(localeHref('en', '/')).toBe('/en/');
    expect(localeHref('ko', '/projects')).toBe('/ko/projects/');
    expect(localeHref('en', '/projects')).toBe('/en/projects/');
  });

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

  // Astro 가 이 객체에 라우트별 내부 상태를 붙인다. 공유하면 빌드가 깨진다.
  it('호출마다 새 객체를 준다', () => {
    const [first] = languagePaths();
    const [second] = languagePaths();

    expect(first).not.toBe(second);
    expect(first?.params).not.toBe(second?.params);
  });
});

describe('isNoindex', () => {
  it('pathname 과 절대 URL 을 같이 받는다', () => {
    expect(isNoindex('/ko/resume/')).toBe(true);
    expect(isNoindex('https://www.rhseung.me/en/resume/')).toBe(true);
  });

  it('색인 대상 라우트는 그대로 둔다', () => {
    expect(isNoindex('/ko/')).toBe(false);
    expect(isNoindex('/en/blog/hello-world/')).toBe(false);
  });
});

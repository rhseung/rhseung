import { describe, expect, it } from 'vitest';

import { localeHref } from './href';

describe('localeHref', () => {
  it('언어를 [lang] 자리에 넣는다', () => {
    expect(localeHref('ko', '/[lang]')).toBe('/ko/');
    expect(localeHref('en', '/[lang]')).toBe('/en/');
    expect(localeHref('ko', '/[lang]/projects')).toBe('/ko/projects/');
  });

  it('나머지 파라미터도 채운다', () => {
    expect(localeHref('en', '/[lang]/blog/[slug]', { slug: 'hello-world' })).toBe(
      '/en/blog/hello-world/',
    );
  });

  it('canonical 이 슬래시로 끝나므로 hreflang 도 슬래시로 끝나야 자기를 딴 URL 로 안 가리킨다', () => {
    expect(localeHref('ko', '/[lang]/blog')).toBe('/ko/blog/');
  });

  it('없는 라우트와 빠진 파라미터는 컴파일이 막는다', () => {
    // @ts-expect-error src/pages 에 없는 라우트
    expect(() => localeHref('ko', '/[lang]/blogg')).not.toThrow();
    // @ts-expect-error [slug] 가 있는 라우트는 params 가 필수다
    expect(() => localeHref('ko', '/[lang]/blog/[slug]')).not.toThrow();
  });
});

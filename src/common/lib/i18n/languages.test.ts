import { describe, expect, it } from 'vitest';

import { languageName, LANGUAGES, languageTag } from './languages';

describe('languageTag', () => {
  it('CLDR likely subtags 로 지역을 채운다 - BCP 47 태그를 손으로 적지 않는다', () => {
    expect(languageTag('ko')).toBe('ko-KR');
    expect(languageTag('en')).toBe('en-US');
  });

  it('og:locale 과 hreflang 이 쓸 수 있게 언어와 지역이 다 있다', () => {
    for (const lang of LANGUAGES) expect(languageTag(lang)).toMatch(/^[a-z]{2}-[A-Z]{2}$/);
  });
});

describe('languageName', () => {
  it('기본값이 그 언어 자신의 이름이다 - 전환 UI 는 읽을 수 없는 언어로 적으면 소용이 없다', () => {
    expect(languageName('ko')).toBe('한국어');
    expect(languageName('en')).toBe('English');
  });

  it('읽는 언어를 주면 그 언어로 부른 이름이 나온다', () => {
    expect(languageName('en', 'ko')).toBe('영어');
    expect(languageName('ko', 'en')).toBe('Korean');
  });
});

import { describe, expect, it } from 'vitest';

import { acceptedLanguages, preferredLanguage } from './preferred-language';

describe('acceptedLanguages', () => {
  it('q 값이 큰 순서로 낸다 - 헤더에 적힌 순서가 곧 선호 순서는 아니다', () => {
    expect(acceptedLanguages('en;q=0.5,ko;q=0.9')).toEqual(['ko', 'en']);
  });

  it('q 가 없으면 1 이다 - 명시된 q 보다 앞선다', () => {
    expect(acceptedLanguages('en-US,ko;q=0.9')).toEqual(['en-US', 'ko']);
  });

  it('q=0 은 거절이라 버린다', () => {
    expect(acceptedLanguages('ko;q=0,en')).toEqual(['en']);
  });

  it('헤더가 없으면 빈 목록이다 - 크롤러는 이 헤더를 보내지 않는다', () => {
    expect(acceptedLanguages(null)).toEqual([]);
  });
});

describe('preferredLanguage', () => {
  it('지역 코드를 떼고 맞춘다', () => {
    expect(preferredLanguage(['en-US'])).toBe('en');
  });

  it('지원하지 않는 언어는 건너뛰고 다음을 본다 - 첫 항목만 보면 fr 사용자가 기본 언어로 떨어진다', () => {
    expect(preferredLanguage(['fr-FR', 'en-US', 'ko'])).toBe('en');
  });

  it('맞는 것이 없으면 null 이다 - 부르는 쪽이 기본 언어를 정한다', () => {
    expect(preferredLanguage(['fr', '*'])).toBeNull();
  });

  it('태그 파싱은 Intl.Locale 이 한다 - 대소문자와 문자 서브태그를 우리가 안 따진다', () => {
    expect(preferredLanguage(['EN-us'])).toBe('en');
    expect(preferredLanguage(['zh-Hant-TW', 'ko-KR'])).toBe('ko');
  });

  it('BCP 47 이 아닌 값에서 터지지 않는다 - 헤더는 아무나 보낸다', () => {
    expect(preferredLanguage(['en_US', 'i-klingon', '', 'ko'])).toBe('ko');
  });
});

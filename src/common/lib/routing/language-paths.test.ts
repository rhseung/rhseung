import { describe, expect, it } from 'vitest';

import { languagePaths } from './language-paths';

describe('languagePaths', () => {
  it('언어마다 라우트 하나', () => {
    expect(languagePaths()).toEqual([
      { params: { lang: 'ko' }, props: { lang: 'ko' } },
      { params: { lang: 'en' }, props: { lang: 'en' } },
    ]);
  });

  it('호출마다 새 객체를 준다', () => {
    const [first] = languagePaths();
    const [second] = languagePaths();

    expect(first).not.toBe(second);
    expect(first?.params).not.toBe(second?.params);
  });
});

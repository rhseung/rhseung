import { describe, expect, it } from 'vitest';

import { isNoindex } from './noindex';

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

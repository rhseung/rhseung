import { describe, expect, it } from 'vitest';

import { PROJECTS } from './data';
import { projectsTextEN } from './text.en';
import { projectsTextKO } from './text.ko';

/** 카드 본문이자 meta description이라 길면 셋 다 깨진다. 타입은 길이를 모른다. */
const SUMMARY_MAX = 160;

describe.each([
  ['ko', projectsTextKO],
  ['en', projectsTextEN],
])('%s 번역문', (_lang, text) => {
  it.each(PROJECTS.map((p) => p.slug))('%s 가 비어 있지 않다', (slug) => {
    expect(text[slug].title.trim()).not.toBe('');
    expect(text[slug].summary.trim()).not.toBe('');
  });

  it('요약이 상한을 넘지 않는다', () => {
    for (const { slug } of PROJECTS) {
      expect(text[slug].summary.length, slug).toBeLessThanOrEqual(SUMMARY_MAX);
    }
  });
});

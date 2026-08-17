import { describe, expect, it } from 'vitest';

import { AWARDS, EDUCATION, EXPERIENCE, SKILL_GROUPS } from './data';
import { careerTextEN } from './text.en';
import { careerTextKO } from './text.ko';

const SUMMARY_MAX = 200;

describe.each([
  ['ko', careerTextKO],
  ['en', careerTextEN],
])('%s 번역문', (_lang, text) => {
  it('경력·학력이 비어 있지 않다', () => {
    const entries = [
      ...EXPERIENCE.map(({ slug }) => [slug, text.experience[slug]] as const),
      ...EDUCATION.map(({ slug }) => [slug, text.education[slug]] as const),
    ];

    for (const [slug, entry] of entries) {
      expect(entry.org.trim(), slug).not.toBe('');
      expect(entry.role.trim(), slug).not.toBe('');
      if (entry.summary) expect(entry.summary.length, slug).toBeLessThanOrEqual(SUMMARY_MAX);
    }
  });

  it('대회 제목이 비어 있지 않다', () => {
    for (const { slug } of AWARDS) expect(text.awards[slug].title.trim(), slug).not.toBe('');
  });

  it('기술 그룹 라벨이 비어 있지 않다', () => {
    for (const { slug } of SKILL_GROUPS) {
      expect(text.skillGroups[slug].group.trim(), slug).not.toBe('');
    }
  });
});

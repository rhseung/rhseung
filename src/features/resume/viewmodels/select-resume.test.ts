import { describe, expect, it } from 'vitest';

import {
  parseEntryId,
  sortAwards,
  sortCareer,
  sortSkillGroups,
  toCareerSummary,
} from './select-resume';

import type { AwardSummary, CareerSummary, SkillGroup } from '../models';

function career(slug: string, start: string): CareerSummary {
  return { slug, role: '역할', org: '소속', start, hasDetail: false, draft: false };
}

describe('parseEntryId', () => {
  it('`<lang>/<slug>`를 가른다', () => {
    expect(parseEntryId('ko/first-job')).toEqual({ lang: 'ko', slug: 'first-job' });
  });

  it.each(['first-job', 'misc/first-job', 'ko/', 'ko/a/b'])(
    '잘못 놓인 파일에서 터진다: %s',
    (id) => {
      expect(() => parseEntryId(id)).toThrow();
    },
  );
});

describe('toCareerSummary', () => {
  it('본문이 있으면 hasDetail', () => {
    const data = career('x', '2024-01');
    expect(toCareerSummary({ id: 'ko/x', data, body: '## 한 일' }).hasDetail).toBe(true);
    expect(toCareerSummary({ id: 'ko/x', data, body: ' \n' }).hasDetail).toBe(false);
  });
});

describe('sortCareer', () => {
  it('최신순', () => {
    const entries = [career('old', '2022-01'), career('new', '2025-06'), career('mid', '2024-03')];

    expect(sortCareer(entries).map((e) => e.slug)).toEqual(['new', 'mid', 'old']);
  });
});

describe('sortAwards', () => {
  it('최신순', () => {
    const awards: AwardSummary[] = [
      { slug: 'a', title: 'A', date: '2023-05', hasDetail: false, draft: false },
      { slug: 'b', title: 'B', date: '2025-01', hasDetail: false, draft: false },
    ];

    expect(sortAwards(awards).map((a) => a.slug)).toEqual(['b', 'a']);
  });
});

describe('sortSkillGroups', () => {
  it('order 먼저, 같으면 이름순', () => {
    const groups: SkillGroup[] = [
      { group: '웹', items: ['astro'], order: 1, draft: false },
      { group: '언어', items: ['rust'], order: 0, draft: false },
      { group: '인프라', items: ['docker'], order: 1, draft: false },
    ];

    expect(sortSkillGroups(groups).map((g) => g.group)).toEqual(['언어', '웹', '인프라']);
  });
});

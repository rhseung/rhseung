import { describe, expect, it } from 'vitest';

import { groupAwardsByYear, sortAwards, sortCareer, sortSkillGroups } from './select-career';

import type { Award, CareerEntry, SkillGroup } from '../models';

function career(slug: string, start: `${number}-${number}`): CareerEntry {
  return { slug, org: '소속', role: '역할', start };
}

function award(slug: string, date: Award['date'], order = 0): Award {
  return { slug, title: slug, date, order };
}

describe('sortCareer', () => {
  it('최신순', () => {
    const entries = [career('old', '2022-01'), career('new', '2025-06'), career('mid', '2024-03')];

    expect(sortCareer(entries).map((e) => e.slug)).toEqual(['new', 'mid', 'old']);
  });
});

describe('sortAwards', () => {
  it('최신순', () => {
    expect(sortAwards([award('a', '2023-05'), award('b', '2025-01')]).map((a) => a.slug)).toEqual([
      'b',
      'a',
    ]);
  });

  // 안 주면 선언 순서로 서서 참가한 대회가 수상보다 위에 온다.
  it('같은 해 안에서는 order 가 작은 것이 먼저', () => {
    const awards = [award('join', '2025', 5), award('win', '2025', 0)];

    expect(sortAwards(awards).map((a) => a.slug)).toEqual(['win', 'join']);
  });
});

describe('groupAwardsByYear', () => {
  it('연도로 묶고 최신 연도가 먼저', () => {
    const awards = [award('a', '2023-05'), award('b', '2025-01'), award('c', '2025')];

    expect(groupAwardsByYear(awards).map(([year, list]) => [year, list.length])).toEqual([
      ['2025', 2],
      ['2023', 1],
    ]);
  });
});

describe('sortSkillGroups', () => {
  it('order 먼저, 같으면 이름순', () => {
    const groups: SkillGroup[] = [
      { slug: 'web', group: '웹', items: ['Astro'], order: 1 },
      { slug: 'lang', group: '언어', items: ['Rust'], order: 0 },
      { slug: 'infra', group: '인프라', items: ['Bun'], order: 1 },
    ];

    expect(sortSkillGroups(groups).map((g) => g.group)).toEqual(['언어', '웹', '인프라']);
  });
});

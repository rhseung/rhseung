import { describe, expect, it } from 'vitest';

import { groupAwardsByYear, sortAwards, sortCareer, sortSkillGroups } from './select-career';

import type { Award, CareerEntry, SkillGroup } from '../models';

function career(slug: string, start: CareerEntry['start']): CareerEntry {
  return { slug, org: '소속', role: '역할', start };
}

function award(slug: string, date: Award['date']): Award {
  return { slug, title: slug, date };
}

describe('sortCareer', () => {
  it('최신순', () => {
    const entries = [
      career('old', { year: 2022, month: 1 }),
      career('new', { year: 2025, month: 6 }),
      career('mid', { year: 2024, month: 3 }),
    ];

    expect(sortCareer(entries).map((e) => e.slug)).toEqual(['new', 'mid', 'old']);
  });
});

describe('sortAwards', () => {
  it('최신순', () => {
    expect(
      sortAwards([award('a', { year: 2023, month: 5 }), award('b', { year: 2025, month: 1 })]).map(
        (a) => a.slug,
      ),
    ).toEqual(['b', 'a']);
  });

  it('같은 날짜면 제목순', () => {
    const awards = [award('나', { year: 2025 }), award('가', { year: 2025 })];

    expect(sortAwards(awards).map((a) => a.slug)).toEqual(['가', '나']);
  });
});

describe('groupAwardsByYear', () => {
  it('연도로 묶고 최신 연도가 먼저', () => {
    const awards = [
      award('a', { year: 2023, month: 5 }),
      award('b', { year: 2025, month: 1 }),
      award('c', { year: 2025 }),
    ];

    expect(groupAwardsByYear(awards).map(([year, list]) => [year, list.length])).toEqual([
      [2025, 2],
      [2023, 1],
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

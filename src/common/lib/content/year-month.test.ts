import { describe, expect, it } from 'vitest';

import { byStartDesc, formatPeriod, formatYearMonth, yearMonthKey } from './year-month';

describe('yearMonthKey', () => {
  it('월이 없으면 그 해 1월로 정렬된다', () => {
    expect(yearMonthKey({ year: 2026 })).toBe(yearMonthKey({ year: 2026, month: 1 }));
    expect(yearMonthKey({ year: 2026 })).toBeLessThan(yearMonthKey({ year: 2026, month: 2 }));
  });
});

describe('formatYearMonth', () => {
  it('월이 없으면 연도만 쓴다', () => {
    expect(formatYearMonth({ year: 2026 })).toBe('2026');
    expect(formatYearMonth({ year: 2026, month: 8 })).toBe('2026.08');
  });
});

describe('formatPeriod', () => {
  it('끝이 없으면 진행 중 라벨을 붙인다', () => {
    expect(formatPeriod({ year: 2026, month: 3 }, undefined, '현재')).toBe('2026.03 – 현재');
    expect(formatPeriod({ year: 2026, month: 3 }, { year: 2026, month: 8 }, '현재')).toBe(
      '2026.03 – 2026.08',
    );
  });
});

describe('byStartDesc', () => {
  it('최근 시작이 앞에 온다', () => {
    const items = [{ start: { year: 2024 } }, { start: { year: 2026, month: 3 } }];
    expect([...items].sort(byStartDesc)[0]).toBe(items[1]);
  });
});

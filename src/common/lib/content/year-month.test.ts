import { describe, expect, it } from 'vitest';

import {
  byStartDesc,
  formatMonths,
  formatPeriod,
  formatYearMonth,
  periodMonths,
  yearMonthKey,
} from './year-month';

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

describe('periodMonths', () => {
  it('끝까지의 개월 수를 센다', () => {
    expect(periodMonths({ year: 2025, month: 3 }, { year: 2026, month: 8 })).toBe(17);
  });

  it('끝이 없으면 지금까지 센다', () => {
    expect(periodMonths({ year: 2026, month: 1 }, undefined, new Date(2026, 6, 15))).toBe(5);
  });
});

describe('formatMonths', () => {
  it('12개월을 넘으면 연 단위로 묶는다', () => {
    expect(formatMonths(17)).toBe('1년 5개월');
    expect(formatMonths(5)).toBe('5개월');
  });
});

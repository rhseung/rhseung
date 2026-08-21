import { describe, expect, it } from 'vitest';

import { toContributions } from './use-contributions';

describe('toContributions', () => {
  it('총계는 지난 1년치를 쓴다', () => {
    const { total, days } = toContributions({
      total: { lastYear: 2980 },
      contributions: [
        { date: '2026-08-20', count: 0, level: 0 },
        { date: '2026-08-21', count: 42, level: 3 },
      ],
    });

    expect(total).toBe(2980);
    expect(days).toHaveLength(2);
  });

  it('빈 응답은 빈 배열이다', () => {
    expect(toContributions({ total: { lastYear: 0 }, contributions: [] }).days).toEqual([]);
  });
});

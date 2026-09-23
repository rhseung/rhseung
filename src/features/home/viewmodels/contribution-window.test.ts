import { describe, expect, it } from 'vitest';

import { contributionWindow } from './contribution-window';

describe('contributionWindow', () => {
  it('1년 전 그 주의 일요일에서 시작해 받은 날짜로 끝난다', () => {
    const days = contributionWindow('2026-09-22');

    expect(days.at(0)?.date).toBe('2025-09-21');
    expect(days.at(-1)?.date).toBe('2026-09-22');
  });

  it('upstream 과 같은 길이를 낸다', () => {
    expect(contributionWindow('2026-09-22')).toHaveLength(367);
  });

  it.each(['2026-09-20', '2026-09-22', '2026-01-01', '2026-02-28'])(
    '%s 기준으로도 일요일에서 시작한다 - 월 label 정렬이 이걸 전제한다',
    (endDate) => {
      const [first] = contributionWindow(endDate);

      expect(new Date(`${first?.date}T00:00:00Z`).getUTCDay()).toBe(0);
    },
  );

  it('칸은 전부 빈 값이다', () => {
    const [first] = contributionWindow('2026-09-22');

    expect(first).toEqual({ date: '2025-09-21', count: 0, level: 0 });
  });

  it.each(['UTC', 'Asia/Seoul', 'Pacific/Midway', 'Pacific/Kiritimati'])(
    'TZ 가 %s 여도 받은 날짜로 끝난다 - SSR 과 hydration 이 다른 기계에서 돈다',
    (timeZone) => {
      const before = process.env.TZ;
      process.env.TZ = timeZone;

      try {
        const days = contributionWindow('2026-09-22');

        expect(days.at(-1)?.date).toBe('2026-09-22');
        expect(days.at(0)?.date).toBe('2025-09-21');
        expect(days).toHaveLength(367);
      } finally {
        process.env.TZ = before;
      }
    },
  );
});

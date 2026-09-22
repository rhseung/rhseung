import { describe, expect, it } from 'vitest';

import { contributionWindow } from './contribution-window';

describe('contributionWindow', () => {
  it('1년 전 그 주의 일요일에서 시작해 오늘로 끝난다', () => {
    const days = contributionWindow(new Date('2026-09-22T12:00:00Z'));

    expect(days.at(0)?.date).toBe('2025-09-21');
    expect(days.at(-1)?.date).toBe('2026-09-22');
  });

  it('upstream 과 같은 길이를 낸다', () => {
    expect(contributionWindow(new Date('2026-09-22T12:00:00Z'))).toHaveLength(367);
  });

  it.each(['2026-09-20', '2026-09-22', '2026-01-01', '2026-02-28'])(
    '%s 기준으로도 일요일에서 시작한다 - 월 label 정렬이 이걸 전제한다',
    (today) => {
      const [first] = contributionWindow(new Date(`${today}T12:00:00Z`));

      expect(new Date(`${first?.date}T00:00:00Z`).getUTCDay()).toBe(0);
    },
  );

  it('칸은 전부 빈 값이다', () => {
    const [first] = contributionWindow(new Date('2026-09-22T12:00:00Z'));

    expect(first).toEqual({ date: '2025-09-21', count: 0, level: 0 });
  });
});

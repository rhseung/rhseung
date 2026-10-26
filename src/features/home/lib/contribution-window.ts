import { dayjs } from '@/common/lib';

import type { ContributionDay } from '../model';

const DAYS_IN_WEEK = 7;

export function contributionWindow(endDate: string): ContributionDay[] {
  const end = dayjs(endDate);
  const yearAgo = end.subtract(1, 'year');
  const start = yearAgo.subtract(yearAgo.day(), 'day');
  const length = end.diff(start, 'day') + 1;

  return Array.from({ length }, (_, index) => ({
    date: start.add(index, 'day').format('YYYY-MM-DD'),
    count: 0,
    level: 0,
  }));
}

export { DAYS_IN_WEEK };

import { z } from 'zod';

import { yearMonthKey, type YearOrMonth } from './year-month';

const year = z.number().int().min(1900).max(2100);

export const validDate = z.object({ year, month: z.number().int().min(1).max(12) });

export const yearOrMonth = z.object({ year, month: z.number().int().min(1).max(12).optional() });

export function endsAfterStart(entry: { start: YearOrMonth; end?: YearOrMonth }): boolean {
  return entry.end === undefined || yearMonthKey(entry.end) >= yearMonthKey(entry.start);
}

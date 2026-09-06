import { z } from 'zod';

import { yearMonthKey, type YearOrMonth } from './year-month';

import type { Url } from './scalars';

export const SUMMARY_MAX = 200;

export const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'kebab-case 여야 합니다');

export const filled = z.string().trim().min(1);

export const url = z.custom<Url>(
  (value) =>
    typeof value === 'string' && URL.canParse(value) && new URL(value).protocol === 'https:',
);

const year = z.number().int().min(1900).max(2100);

export const validDate = z.strictObject({ year, month: z.number().int().min(1).max(12) });

export const yearOrMonth = z.strictObject({
  year,
  month: z.number().int().min(1).max(12).optional(),
});

export function endsAfterStart(entry: { start: YearOrMonth; end?: YearOrMonth }): boolean {
  return entry.end === undefined || yearMonthKey(entry.end) >= yearMonthKey(entry.start);
}

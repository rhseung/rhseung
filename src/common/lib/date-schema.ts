import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { z } from 'zod';

dayjs.extend(customParseFormat);

const parse = (value: string, format: string) => dayjs(value, format, true);

export const monthly = z
  .string()
  .refine((value) => parse(value, 'YYYY-MM').isValid(), 'YYYY-MM 이어야 합니다');

export const yearOrMonth = z
  .string()
  .refine(
    (value) => parse(value, 'YYYY').isValid() || parse(value, 'YYYY-MM').isValid(),
    'YYYY 또는 YYYY-MM 이어야 합니다',
  );

export function endsAfterStart(entry: { start: string; end?: string }): boolean {
  return (
    entry.end === undefined || !parse(entry.end, 'YYYY-MM').isBefore(parse(entry.start, 'YYYY-MM'))
  );
}

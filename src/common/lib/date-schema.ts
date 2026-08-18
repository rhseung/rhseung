import dayjs, { type Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { z } from 'zod';

dayjs.extend(customParseFormat);

const parse = (value: string, format: string) => dayjs(value, format, true);

export const yearMonth = z.custom<Dayjs>(
  (value) => dayjs.isDayjs(value) && value.isValid(),
  'dayjs 로 만든 유효한 날짜여야 합니다',
);

export const yearOrMonth = z
  .string()
  .refine(
    (value) => parse(value, 'YYYY').isValid() || parse(value, 'YYYY-MM').isValid(),
    'YYYY 또는 YYYY-MM 이어야 합니다',
  );

export function endsAfterStart(entry: { start: Dayjs; end?: Dayjs }): boolean {
  return entry.end === undefined || !entry.end.isBefore(entry.start);
}

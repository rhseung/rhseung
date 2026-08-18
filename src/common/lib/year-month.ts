export type YearMonth = { year: number; month: number };

/** 대회처럼 월을 모르는 항목이 있다. */
export type YearOrMonth = { year: number; month?: number };

export function formatYearMonth(value: YearOrMonth): string {
  return value.month === undefined
    ? String(value.year)
    : `${value.year}.${String(value.month).padStart(2, '0')}`;
}

/** 정렬·비교용. 월을 모르면 그 해 첫 달로 본다. */
export function yearMonthKey(value: YearOrMonth): number {
  return value.year * 12 + ((value.month ?? 1) - 1);
}

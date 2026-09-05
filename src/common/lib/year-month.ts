export type YearMonth = { year: number; month: number };

export type YearOrMonth = { year: number; month?: number };

export function formatYearMonth(value: YearOrMonth): string {
  return value.month === undefined
    ? String(value.year)
    : `${value.year}.${String(value.month).padStart(2, '0')}`;
}

/** 월을 모르면 그 해 첫 달로 본다. */
export function formatPeriod(
  start: YearOrMonth,
  end: YearOrMonth | undefined,
  ongoing: string,
): string {
  return `${formatYearMonth(start)} – ${end === undefined ? ongoing : formatYearMonth(end)}`;
}

export function yearMonthKey(value: YearOrMonth): number {
  return value.year * 12 + ((value.month ?? 1) - 1);
}

export function byStartDesc(a: { start: YearOrMonth }, b: { start: YearOrMonth }): number {
  return yearMonthKey(b.start) - yearMonthKey(a.start);
}

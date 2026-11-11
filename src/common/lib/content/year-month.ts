export type YearMonth = { year: number; month: number };

export type YearOrMonth = { year: number; month?: number };

export function formatYearMonth(value: YearOrMonth): string {
  return value.month === undefined
    ? String(value.year)
    : `${value.year}.${String(value.month).padStart(2, '0')}`;
}

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

export function endsAfterStart(entry: { start: YearOrMonth; end?: YearOrMonth }): boolean {
  return entry.end === undefined || yearMonthKey(entry.end) >= yearMonthKey(entry.start);
}

export function periodMonths(
  start: YearOrMonth,
  end: YearOrMonth | undefined,
  now: Date = new Date(),
): number {
  const last = end ?? { year: now.getFullYear(), month: now.getMonth() };
  return yearMonthKey(last) - yearMonthKey(start);
}

export function formatMonths(months: number): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return years > 0 ? `${years}년 ${rest}개월` : `${rest}개월`;
}

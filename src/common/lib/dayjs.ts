import dayjs, { type Dayjs } from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/ko';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

import { i18n } from './i18n';

import type { YearMonth } from './scalars';

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

dayjs.locale(i18n.language);

// dayjs가 i18next를 따라가게 한다. 여기서 `i18n.changeLanguage`를 호출하면 안 된다 —
// 이 리스너가 막으려는 바로 그 루프가 생긴다.
i18n.on('languageChanged', (language) => {
  dayjs.locale(language);
});

/** `month` 는 1 부터다. dayjs 의 객체 파싱은 0 부터라 그대로 쓰면 한 달씩 밀린다. */
export function yearMonth({ year, month }: { year: number; month: number }): Dayjs {
  return dayjs(new Date(year, month - 1, 1));
}

/** 아일랜드 props 는 JSON 으로 직렬화된다 - Dayjs 객체는 그 경계를 못 넘는다. */
export function toYearMonth(value: Dayjs): YearMonth {
  return value.format('YYYY-MM') as YearMonth;
}

/** `2024-03` → `2024.03`. 연도만 아는 항목은 그대로 둔다. */
export function formatYearMonth(value: string): string {
  return value.includes('-') ? dayjs(value).format('YYYY.MM') : value;
}

export { dayjs };

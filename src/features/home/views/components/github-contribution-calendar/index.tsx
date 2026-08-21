import { chunk, range } from 'es-toolkit';
import { useTranslation } from 'react-i18next';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/common/components';
import { dayjs } from '@/common/lib';

import type { ContributionDay, Contributions } from '../../../viewmodels';
import type { Dayjs } from 'dayjs';

const DAYS_IN_WEEK = 7;
const MIN_CELL = 10;
const MIN_LABEL_WEEKS = 3;
const LEVEL_COLORS = range(5).map((level) => `var(--contribution-${level})`);

const TOOLTIP_DELAY = 200;

type MonthCol = { month: Dayjs; span: number };

/**
 * 각 월이 몇 열을 차지하는 지 세는 함수
 * 입력: [ [8/17..8/23], [8/24..8/30], [8/31..9/6], [9/7..9/13], ... ]
 * 출력: [ { month: 2025-08, span: 3 }, { month: 2025-09, span: 4 }, ... ]
 */
function getMonthCols(weeks: ContributionDay[][]): MonthCol[] {
  const cols: MonthCol[] = [];

  for (const [sunday] of weeks) {
    const month = dayjs(sunday.date);
    const last = cols.at(-1);

    if (last !== undefined && month.isSame(last.month, 'month')) last.span += 1;
    else cols.push({ month, span: 1 });
  }

  return cols;
}

export function GithubContributionCalendar({ total, days }: GithubContributionCalendar.Props) {
  const { t } = useTranslation('home');

  if (days.length === 0) return null;

  const weeks = chunk(days, DAYS_IN_WEEK);
  const columns = { gridTemplateColumns: `repeat(${weeks.length}, minmax(${MIN_CELL}px, 1fr))` };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1 overflow-x-auto">
        <div className="text-muted-foreground grid gap-0.75 text-xs" style={columns}>
          {getMonthCols(weeks).map(({ month, span }) => (
            <span key={month.format('YYYY-MM')} style={{ gridColumn: `span ${span}` }}>
              {span >= MIN_LABEL_WEEKS ? month.format('MMM') : ''}
            </span>
          ))}
        </div>

        <TooltipProvider delay={TOOLTIP_DELAY}>
          <div
            className="grid grid-flow-col gap-0.75"
            style={{ ...columns, gridTemplateRows: `repeat(${DAYS_IN_WEEK}, auto)` }}
          >
            {days.map(({ date, count, level }) => (
              <Tooltip key={date}>
                <TooltipTrigger
                  render={
                    <div
                      className="aspect-square rounded-[3px]"
                      style={{ backgroundColor: LEVEL_COLORS[level] }}
                    />
                  }
                />
                <TooltipContent>
                  {t(($) => $.contributions.day, { date: dayjs(date).format('ll'), count })}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </div>

      <p className="text-muted-foreground flex items-center gap-1 text-xs">
        <span>{t(($) => $.contributions.total, { value: total })}</span>

        <span className="ml-auto">{t(($) => $.contributions.less)}</span>
        {LEVEL_COLORS.map((color) => (
          <span key={color} className="size-2.5 rounded-[3px]" style={{ backgroundColor: color }} />
        ))}
        <span>{t(($) => $.contributions.more)}</span>
      </p>
    </div>
  );
}

export declare namespace GithubContributionCalendar {
  export type Props = Contributions;
}

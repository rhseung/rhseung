import { chunk } from 'es-toolkit';
import { useTranslation } from 'react-i18next';
import { css } from 'styled-system/css';
import { token } from 'styled-system/tokens';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/common/components';
import { dayjs } from '@/common/lib';

import type { ContributionDay, Contributions } from '../../../viewmodels';
import type { Dayjs } from 'dayjs';

const DAYS_IN_WEEK = 7;
const MIN_CELL = 10;
const MIN_LABEL_WEEKS = 3;
const LEVEL_COLORS = [
  token.var('colors.contribution.0'),
  token.var('colors.contribution.1'),
  token.var('colors.contribution.2'),
  token.var('colors.contribution.3'),
  token.var('colors.contribution.4'),
];

const TOOLTIP_DELAY = 200;

type MonthCol = { month: Dayjs; span: number };

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
    <div className={css({ display: 'flex', flexDirection: 'column', gap: '2' })}>
      <div
        className={css({ display: 'flex', flexDirection: 'column', gap: '1', overflowX: 'auto' })}
      >
        <div
          className={css({
            display: 'grid',
            gap: '[3px]',
            color: 'text.muted',
            textStyle: 'caption',
          })}
          style={columns}
        >
          {getMonthCols(weeks).map(({ month, span }) => (
            <span key={month.format('YYYY-MM')} style={{ gridColumn: `span ${span}` }}>
              {span >= MIN_LABEL_WEEKS ? month.format('MMM') : ''}
            </span>
          ))}
        </div>

        <TooltipProvider delay={TOOLTIP_DELAY}>
          <div
            className={css({ display: 'grid', gridAutoFlow: 'column', gap: '[3px]' })}
            style={{ ...columns, gridTemplateRows: `repeat(${DAYS_IN_WEEK}, auto)` }}
          >
            {days.map(({ date, count, level }) => (
              <Tooltip key={date}>
                <TooltipTrigger
                  render={
                    <div
                      className={css({ aspectRatio: 'square', rounded: '[3px]' })}
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

      <p
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '1',
          color: 'text.muted',
          textStyle: 'caption',
        })}
      >
        <span>{t(($) => $.contributions.total, { value: total })}</span>

        <span className={css({ ml: 'auto' })}>{t(($) => $.contributions.less)}</span>
        {LEVEL_COLORS.map((color) => (
          <span
            key={color}
            className={css({ boxSize: '2.5', rounded: '[3px]' })}
            style={{ backgroundColor: color }}
          />
        ))}
        <span>{t(($) => $.contributions.more)}</span>
      </p>
    </div>
  );
}

export declare namespace GithubContributionCalendar {
  export type Props = Contributions;
}

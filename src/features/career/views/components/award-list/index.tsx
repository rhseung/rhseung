import { css, cx } from 'styled-system/css';
import { stack } from 'styled-system/patterns';

import { formatYearMonth } from '@/common/lib';
import { metaText } from '@/common/styles';

import type { Award } from '../../../viewmodels';

export function AwardList({ awards, headingLevel = 3, showDate = true }: AwardList.Props) {
  const Heading = `h${headingLevel}` as const;
  return (
    <ul className={stack({ gap: '4' })}>
      {awards.map((award) => (
        <li
          key={award.slug}
          className={css({
            display: 'flex',
            breakInside: 'avoid',
            flexDirection: 'column',
            gap: '0.5',
          })}
        >
          <div
            className={css({
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'baseline',
              columnGap: '2',
            })}
          >
            <Heading className={css({ fontWeight: 'medium' })}>{award.title}</Heading>
            {showDate && (
              <span className={cx(metaText, css({ ml: 'auto' }))}>
                {formatYearMonth(award.date)}
              </span>
            )}
          </div>

          {award.issuer && (
            <p className={css({ color: 'accent', textStyle: 'sm' })}>{award.issuer}</p>
          )}
          {award.summary && (
            <p className={css({ color: 'text.muted', textStyle: 'sm' })}>{award.summary}</p>
          )}
        </li>
      ))}
    </ul>
  );
}

export declare namespace AwardList {
  export type Props = {
    awards: Award[];
    headingLevel?: 2 | 3;
    showDate?: boolean;
  };
}

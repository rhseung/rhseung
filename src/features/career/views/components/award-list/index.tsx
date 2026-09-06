import { css, cx } from 'styled-system/css';
import { stack } from 'styled-system/patterns';

import { formatYearMonth } from '@/common/lib';
import { metaText } from '@/common/styles';

import type { Award } from '../../../viewmodels';

const list = stack({ gap: '4' });
const item = css({ display: 'flex', breakInside: 'avoid', flexDirection: 'column', gap: '0.5' });
const row = css({ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', columnGap: '2' });
const title = css({ fontWeight: 'medium' });
const date = css({ ml: 'auto' });
const issuer = css({ color: 'accent', textStyle: 'sm' });
const summary = css({ color: 'text.muted', textStyle: 'sm' });

export function AwardList({ awards, headingLevel = 3, showDate = true }: AwardList.Props) {
  const Heading = `h${headingLevel}` as const;
  return (
    <ul className={list}>
      {awards.map((award) => (
        <li key={award.slug} className={item}>
          <div className={row}>
            <Heading className={title}>{award.title}</Heading>
            {showDate && <span className={cx(metaText, date)}>{formatYearMonth(award.date)}</span>}
          </div>

          {award.issuer && <p className={issuer}>{award.issuer}</p>}
          {award.summary && <p className={summary}>{award.summary}</p>}
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

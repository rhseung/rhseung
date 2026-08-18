import { formatYearMonth } from '@/common/lib';

import type { Award } from '../../../viewmodels';

export function AwardList({ awards, headingLevel = 3, showDate = true }: AwardList.Props) {
  const Heading = `h${headingLevel}` as const;
  return (
    <ul className="flex flex-col gap-4">
      {awards.map((award) => {
        return (
          <li key={award.slug} className="flex break-inside-avoid flex-col gap-0.5">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <Heading className="font-medium">{award.title}</Heading>
              {showDate && (
                <span className="text-muted-foreground ml-auto text-xs tabular-nums">
                  {formatYearMonth(award.date)}
                </span>
              )}
            </div>

            {award.issuer && <p className="text-primary text-sm">{award.issuer}</p>}
            {award.summary && <p className="text-muted-foreground text-sm">{award.summary}</p>}
          </li>
        );
      })}
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

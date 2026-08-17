import type { AwardSummary } from '../../../viewmodels';

export function AwardList({
  awards,
  detailHref,
  headingLevel = 3,
  showDate = true,
}: AwardList.Props) {
  const Heading = `h${headingLevel}` as const;
  return (
    <ul className="flex flex-col gap-4">
      {awards.map((award) => {
        const href = award.hasDetail ? detailHref(award) : undefined;

        return (
          <li key={award.slug} className="flex break-inside-avoid flex-col gap-0.5">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <Heading className="font-medium">
                {href ? (
                  <a href={href} className="hover:underline">
                    {award.title}
                  </a>
                ) : (
                  award.title
                )}
              </Heading>
              {showDate && (
                <span className="text-muted-foreground ml-auto text-xs tabular-nums">
                  {award.date.replace('-', '.')}
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
    awards: AwardSummary[];
    detailHref: (award: AwardSummary) => string;
    headingLevel?: 2 | 3;
    /** 연도로 묶어 보여줄 땐 항목마다 날짜를 반복하지 않는다. */
    showDate?: boolean;
  };
}

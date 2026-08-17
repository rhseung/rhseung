import { ExternalLink } from '@/common/components';
import { cn } from '@/common/utils';

import type { CareerSummary } from '../../../viewmodels';

function formatMonth(value: string) {
  return value.replace('-', '.');
}

export function CareerList({
  entries,
  ongoingLabel,
  detailHref,
  headingLevel = 3,
  timeline = false,
}: CareerList.Props) {
  const Heading = `h${headingLevel}` as const;

  return (
    <ul className={cn('flex flex-col gap-6', timeline && 'border-border ml-1.5 border-l pl-6')}>
      {entries.map((item) => {
        const period = item.end
          ? `${formatMonth(item.start)} – ${formatMonth(item.end)}`
          : `${formatMonth(item.start)} – ${ongoingLabel}`;
        const href = item.hasDetail ? detailHref(item) : undefined;

        return (
          <li
            key={item.slug}
            className={cn(
              'relative flex break-inside-avoid flex-col gap-1',
              // 점을 선 위에 얹는다. 기간이 핵심인 목록이라 시간 축이 보여야 한다.
              timeline &&
                'before:bg-border before:absolute before:top-2 before:-left-7.25 before:size-2 before:rounded-full',
            )}
          >
            <div className="flex flex-wrap items-baseline gap-x-2">
              <Heading className="font-medium">
                {href ? (
                  <a href={href} className="hover:underline">
                    {item.role}
                  </a>
                ) : (
                  item.role
                )}
              </Heading>
              <span className="text-muted-foreground ml-auto text-xs tabular-nums">{period}</span>
            </div>

            <p className="text-primary text-sm">{item.org}</p>
            {item.summary && (
              <p className="text-muted-foreground text-sm leading-relaxed">{item.summary}</p>
            )}

            {item.links?.site && (
              <ExternalLink
                href={item.links.site}
                className="text-muted-foreground hover:text-foreground w-fit text-xs hover:underline"
              >
                {item.links.site.replace('https://', '')}
              </ExternalLink>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export declare namespace CareerList {
  export type Props = {
    entries: CareerSummary[];
    ongoingLabel: string;
    detailHref: (entry: CareerSummary) => string;
    /** 제목 레벨은 건너뛰면 안 된다 — 이력서 안에서는 h2 아래라 3, 섹션 페이지에서는 2. */
    headingLevel?: 2 | 3;
    /** 기간이 핵심인 목록에 시간 축을 그린다. */
    timeline?: boolean;
  };
}

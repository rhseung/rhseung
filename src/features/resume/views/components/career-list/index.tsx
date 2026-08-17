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
    // `pl-2.5`: 점 반지름만큼 선을 들여놔야 점이 컨테이너 밖으로 안 나간다.
    <ul className={cn('flex flex-col', timeline ? 'gap-0 pl-2.5' : 'gap-6')}>
      {entries.map((item, index) => {
        const isLast = index === entries.length - 1;
        const ongoing = item.end === undefined;
        const period = ongoing
          ? `${formatMonth(item.start)} – ${ongoingLabel}`
          : `${formatMonth(item.start)} – ${formatMonth(item.end ?? '')}`;
        const href = item.hasDetail ? detailHref(item) : undefined;

        return (
          <li
            key={item.slug}
            className={cn(
              'flex break-inside-avoid flex-col gap-1',
              // 선을 항목마다 그린다. ul 하나에 그으면 마지막 항목 아래로 삐져나간다.
              timeline && 'relative border-l pl-6',
              timeline && (isLast ? 'border-transparent pb-0' : 'border-border pb-8'),
            )}
          >
            {timeline && (
              <span
                aria-hidden
                className={cn(
                  // ring이 배경색이라 점이 선을 깨끗하게 끊는다.
                  'ring-background absolute top-1.5 -left-1.25 size-2.5 rounded-full ring-4',
                  ongoing ? 'bg-primary' : 'bg-muted-foreground/40',
                )}
              />
            )}

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

            {item.achievements.length > 0 && (
              // 항목에 딸린 것이지 나란한 게 아니다 — 한 단 더 들어간 레일로 표시한다.
              <ul className="border-border/60 mt-1 flex flex-col gap-1 border-l pl-3">
                {item.achievements.map((achievement) => (
                  <li key={achievement} className="text-muted-foreground text-xs leading-relaxed">
                    {achievement}
                  </li>
                ))}
              </ul>
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
    /** 기간이 핵심인 목록에 시간 축을 그린다. 진행 중인 항목은 점이 채워진다. */
    timeline?: boolean;
  };
}

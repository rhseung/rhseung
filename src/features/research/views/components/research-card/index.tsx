import { useTranslation } from 'react-i18next';

import { Badge, ExternalLink } from '@/common/components';
import { formatYearMonth, tone } from '@/common/lib';

import {
  RESEARCH_KIND_TONE,
  RESEARCH_LINK_KINDS,
  useResearchLabels,
  type Research,
} from '../../../viewmodels';
import { RESEARCH_LINK_ICON } from '../link-icon';

export function ResearchCard({ item, detailHref }: ResearchCard.Props) {
  const { t } = useTranslation('research');
  const label = useResearchLabels();

  const period = item.end
    ? `${formatYearMonth(item.start)} – ${formatYearMonth(item.end)}`
    : `${formatYearMonth(item.start)} – ${t(($) => $.period.ongoing)}`;

  const links = RESEARCH_LINK_KINDS.flatMap((kind) => {
    const href = item.links?.[kind];
    return href ? [{ kind, href }] : [];
  });

  return (
    <article className="border-border bg-card/40 flex flex-col gap-2 rounded-xl border p-4">
      <div className="flex flex-wrap items-center gap-2">
        <h2 data-vt-title={item.slug} className="text-sm font-semibold">
          {detailHref === undefined ? (
            item.title
          ) : (
            <a href={detailHref} className="hover:underline">
              {item.title}
            </a>
          )}
        </h2>
        <Badge variant="secondary" className={tone({ tone: RESEARCH_KIND_TONE[item.kind] })}>
          {label.kind[item.kind]}
        </Badge>
        <span className="text-muted-foreground ml-auto text-xs tabular-nums">{period}</span>
      </div>

      <p className="text-muted-foreground text-xs">
        {item.org}
        {item.role && ` · ${item.role}`}
      </p>

      <p className="text-muted-foreground text-sm leading-relaxed">{item.summary}</p>

      {links.length > 0 && (
        <ul className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {links.map(({ kind, href }) => {
            const Icon = RESEARCH_LINK_ICON[kind];

            return (
              <li key={kind}>
                <ExternalLink
                  href={href}
                  className="text-muted-foreground hover:text-foreground text-xs hover:underline"
                >
                  <Icon aria-hidden className="size-3.5 shrink-0" />
                  {label.link[kind]}
                </ExternalLink>
              </li>
            );
          })}
        </ul>
      )}
    </article>
  );
}

export declare namespace ResearchCard {
  export type Props = { item: Research; detailHref?: string };
}

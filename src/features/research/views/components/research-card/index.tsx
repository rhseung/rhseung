import { useTranslation } from 'react-i18next';

import { Badge, LinkRow } from '@/common/components';
import { formatPeriod, tone } from '@/common/lib';

import {
  RESEARCH_KIND_TONE,
  researchLinks,
  useResearchLabels,
  type Research,
} from '../../../viewmodels';
import { RESEARCH_LINK_ICON } from '../link-icon';

export function ResearchCard({ item, detailHref }: ResearchCard.Props) {
  const { t } = useTranslation('research');
  const label = useResearchLabels();

  const period = formatPeriod(
    item.start,
    item.end,
    t(($) => $.period.ongoing),
  );

  const links = researchLinks(item).map(({ kind, href }) => ({
    key: kind,
    href,
    label: label.link[kind],
    Icon: RESEARCH_LINK_ICON[kind],
  }));

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

      <LinkRow links={links} />
    </article>
  );
}

export declare namespace ResearchCard {
  export type Props = { item: Research; detailHref?: string };
}

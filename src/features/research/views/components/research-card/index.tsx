import { useTranslation } from 'react-i18next';
import { css, cx } from 'styled-system/css';

import { Badge, LinkRow } from '@/common/components';
import { formatPeriod } from '@/common/lib';
import { metaText } from '@/common/styles';

import {
  RESEARCH_KIND_TONE,
  researchLinks,
  useResearchLabels,
  type Research,
} from '../../../viewmodels';
import { RESEARCH_LINK_ICON } from '../link-icon';

const article = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '2',
  rounded: 'xl',
  border: 'line',
  bg: 'surface.raised/40',
  p: '4',
});
const title = css({
  textStyle: 'sm',
  fontWeight: 'semibold',
  '& a:hover': { textDecoration: 'underline' },
});
const period = css({ ml: 'auto' });
const org = css({ color: 'text.muted', textStyle: 'caption' });
const summary = css({ color: 'text.muted', textStyle: 'body' });

export function ResearchCard({ item, detailHref }: ResearchCard.Props) {
  const { t } = useTranslation('research');
  const label = useResearchLabels();

  const periodText = formatPeriod(
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
    <article className={article}>
      <div className={css({ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '2' })}>
        <h2 data-vt-title={item.slug} className={title}>
          {detailHref === undefined ? item.title : <a href={detailHref}>{item.title}</a>}
        </h2>
        <Badge variant="secondary" tone={RESEARCH_KIND_TONE[item.kind]}>
          {label.kind[item.kind]}
        </Badge>
        <span className={cx(metaText, period)}>{periodText}</span>
      </div>

      <p className={org}>
        {item.org}
        {item.role && ` · ${item.role}`}
      </p>

      <p className={summary}>{item.summary}</p>

      <LinkRow links={links} />
    </article>
  );
}

export declare namespace ResearchCard {
  export type Props = { item: Research; detailHref?: string };
}

import { useTranslation } from 'react-i18next';

import { Empty, EmptyHeader, EmptyTitle } from '@/common/components';
import { localeHref, type Language } from '@/common/lib';

import { sortAwards, type AwardSummary } from '../../viewmodels';
import { AwardList } from '../components';
import { SectionPage } from './section-page';

export function AwardsPage({ lang, awards }: AwardsPage.Props) {
  const { t } = useTranslation('resume');

  return (
    <SectionPage lang={lang} section="awards" title={t(($) => $.awards.title)}>
      {awards.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>{t(($) => $.awards.empty)}</EmptyTitle>
          </EmptyHeader>
        </Empty>
      ) : (
        <AwardList
          awards={sortAwards(awards)}
          detailHref={(award) => localeHref(lang, `/awards/${award.slug}`)}
          headingLevel={2}
        />
      )}
    </SectionPage>
  );
}

export declare namespace AwardsPage {
  export type Props = {
    lang: Language;
    awards: AwardSummary[];
  };
}

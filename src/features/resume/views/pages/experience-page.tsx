import { useTranslation } from 'react-i18next';

import { Empty, EmptyHeader, EmptyTitle } from '@/common/components';
import { localeHref, type Language } from '@/common/lib';

import { sortCareer, type CareerSummary } from '../../viewmodels';
import { CareerList } from '../components';
import { SectionPage } from './section-page';

export function ExperiencePage({ lang, section, entries }: ExperiencePage.Props) {
  const { t } = useTranslation('resume');

  const title =
    section === 'experience' ? t(($) => $.experience.title) : t(($) => $.education.title);
  const empty =
    section === 'experience' ? t(($) => $.experience.empty) : t(($) => $.education.empty);

  return (
    <SectionPage lang={lang} section={section} title={title}>
      {entries.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>{empty}</EmptyTitle>
          </EmptyHeader>
        </Empty>
      ) : (
        <CareerList
          entries={sortCareer(entries)}
          ongoingLabel={t(($) => $.period.ongoing)}
          detailHref={(entry) => localeHref(lang, `/${section}/${entry.slug}`)}
          headingLevel={2}
        />
      )}
    </SectionPage>
  );
}

export declare namespace ExperiencePage {
  export type Props = {
    lang: Language;
    /** 경력과 학력은 같은 화면이다 — 제목과 라우트만 다르다. */
    section: 'experience' | 'education';
    entries: CareerSummary[];
  };
}

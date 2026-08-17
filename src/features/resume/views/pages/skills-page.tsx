import { useTranslation } from 'react-i18next';

import { Empty, EmptyHeader, EmptyTitle } from '@/common/components';
import type { Language } from '@/common/lib';

import { sortSkillGroups, type SkillGroup } from '../../viewmodels';
import { SkillGroups } from '../components';
import { SectionPage } from './section-page';

export function SkillsPage({ lang, groups }: SkillsPage.Props) {
  const { t } = useTranslation('resume');

  return (
    <SectionPage lang={lang} section="skills" title={t(($) => $.skills.title)}>
      {groups.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>{t(($) => $.skills.empty)}</EmptyTitle>
          </EmptyHeader>
        </Empty>
      ) : (
        <SkillGroups groups={sortSkillGroups(groups)} />
      )}
    </SectionPage>
  );
}

export declare namespace SkillsPage {
  export type Props = {
    lang: Language;
    groups: SkillGroup[];
  };
}

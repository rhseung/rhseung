import { useTranslation } from 'react-i18next';

import { Empty, EmptyHeader, EmptyTitle, Separator, SiteDock } from '@/common/components';
import { type Language } from '@/common/lib';

import {
  groupAwardsByYear,
  sortCareer,
  sortSkillGroups,
  type Award,
  type CareerEntry,
  type SkillGroup,
} from '../../viewmodels';
import { AwardList, CareerList, SkillGroups } from '../components';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-sm font-medium">{title}</h2>
        <Separator />
      </div>
      {children}
    </section>
  );
}

export function CareerPage({ lang, experience, education, awards, skills }: CareerPage.Props) {
  const { t } = useTranslation('resume');

  const isEmpty =
    experience.length === 0 && education.length === 0 && awards.length === 0 && skills.length === 0;

  return (
    <div className="bg-background min-h-dvh">
      <main className="mx-auto flex max-w-3xl flex-col gap-12 p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl font-semibold">{t(($) => $.career.title)}</h1>

        {isEmpty && (
          <Empty>
            <EmptyHeader>
              <EmptyTitle>{t(($) => $.career.empty)}</EmptyTitle>
            </EmptyHeader>
          </Empty>
        )}

        {experience.length > 0 && (
          <Section title={t(($) => $.experience.title)}>
            <CareerList
              entries={sortCareer(experience)}
              ongoingLabel={t(($) => $.period.ongoing)}
              timeline
            />
          </Section>
        )}

        {education.length > 0 && (
          <Section title={t(($) => $.education.title)}>
            <CareerList
              entries={sortCareer(education)}
              ongoingLabel={t(($) => $.period.ongoing)}
              timeline
            />
          </Section>
        )}

        {awards.length > 0 && (
          <Section title={t(($) => $.awards.title)}>
            <div className="flex flex-col gap-6">
              {groupAwardsByYear(awards).map(([year, yearAwards]) => (
                <div key={year} className="flex gap-4">
                  <span className="text-muted-foreground w-10 shrink-0 pt-0.5 text-xs tabular-nums">
                    {year}
                  </span>
                  <div className="flex-1">
                    <AwardList awards={yearAwards} showDate={false} />
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {skills.length > 0 && (
          <Section title={t(($) => $.skills.title)}>
            <SkillGroups groups={sortSkillGroups(skills)} layout="grid" />
          </Section>
        )}
      </main>

      <SiteDock lang={lang} current="career" route={{ to: '/[lang]/career' }} />
    </div>
  );
}

export declare namespace CareerPage {
  export type Props = {
    lang: Language;
    experience: CareerEntry[];
    education: CareerEntry[];
    awards: Award[];
    skills: SkillGroup[];
  };
}

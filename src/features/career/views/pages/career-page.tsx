import { useTranslation } from 'react-i18next';
import { css, cx } from 'styled-system/css';
import { stack } from 'styled-system/patterns';

import { Empty, EmptyHeader, EmptyTitle, Separator, SiteDock } from '@/common/components';
import { type Language } from '@/common/lib';
import { metaText, page } from '@/common/styles';

import {
  groupAwardsByYear,
  sortCareer,
  sortSkillGroups,
  type Award,
  type CareerEntry,
  type SkillGroup,
} from '../../viewmodels';
import { AwardList, CareerList, SkillGroups } from '../components';

const title = css({ textStyle: 'heading.page' });
const section = stack({ gap: '5' });

function Section({ title: heading, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={section}>
      <div className={stack({ gap: '1' })}>
        <h2 className={css({ textStyle: 'sm', fontWeight: 'medium' })}>{heading}</h2>
        <Separator />
      </div>
      {children}
    </section>
  );
}

export function CareerPage({ lang, experience, education, awards, skills }: CareerPage.Props) {
  const { t } = useTranslation('resume');
  const shell = page({ spacing: 'loose' });

  const isEmpty =
    experience.length === 0 && education.length === 0 && awards.length === 0 && skills.length === 0;

  return (
    <div className={shell.root}>
      <main className={shell.main}>
        <h1 className={title}>{t(($) => $.career.title)}</h1>

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
            <div className={stack({ gap: '6' })}>
              {groupAwardsByYear(awards).map(([label, yearAwards]) => (
                <div key={label} className={css({ display: 'flex', gap: '4' })}>
                  <span className={cx(metaText, css({ w: '10', flexShrink: 0, pt: '0.5' }))}>
                    {label}
                  </span>
                  <div className={css({ flex: '1' })}>
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

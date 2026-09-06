import { useTranslation } from 'react-i18next';
import { css, cx } from 'styled-system/css';
import { stack } from 'styled-system/patterns';

import { formatYearMonth, SITE } from '@/common/lib';
import { metaText } from '@/common/styles';
import {
  AwardList,
  CareerList,
  SkillGroups,
  sortAwards,
  sortCareer,
  sortSkillGroups,
  type Award,
  type CareerEntry,
  type SkillGroup,
} from '@/features/career';
import type { Project } from '@/features/projects';

const section = stack({ gap: '3' });
const sectionTitle = css({
  borderBottom: 'line',
  pb: '1',
  textStyle: 'sm',
  fontWeight: 'medium',
  color: 'accent',
});
const article = stack({ gap: '8' });
const header = stack({ gap: '3' });
const name = css({ textStyle: 'heading.page' });
const contacts = css({
  display: 'flex',
  flexWrap: 'wrap',
  columnGap: '4',
  rowGap: '1',
  color: 'text.muted',
  textStyle: 'caption',
});
const projectList = stack({ gap: '3' });
const project = css({ display: 'flex', breakInside: 'avoid', flexDirection: 'column', gap: '0.5' });
const row = css({ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', columnGap: '2' });
const strong = css({ fontWeight: 'medium' });
const period = css({ ml: 'auto' });
const summary = css({ color: 'text.muted', textStyle: 'body' });
const highlight = css({ textStyle: 'sm' });

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={section}>
      <h2 className={sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

export function ResumeDocument({
  experience,
  education,
  projects,
  awards,
  skills,
}: ResumeDocument.Props) {
  const { t } = useTranslation('resume');

  return (
    <article className={article}>
      <header className={header}>
        <h1 className={name}>{t(($) => $.site.name, { ns: 'common' })}</h1>

        <ul className={contacts}>
          <li>{t(($) => $.site.location, { ns: 'common' })}</li>
          <li>{SITE.email}</li>
          <li>{SITE.github.replace('https://', '')}</li>
          <li>{SITE.url.replace('https://', '')}</li>
        </ul>
      </header>

      {experience.length > 0 && (
        <Section title={t(($) => $.experience.title)}>
          <CareerList entries={sortCareer(experience)} ongoingLabel={t(($) => $.period.ongoing)} />
        </Section>
      )}

      {education.length > 0 && (
        <Section title={t(($) => $.education.title)}>
          <CareerList entries={sortCareer(education)} ongoingLabel={t(($) => $.period.ongoing)} />
        </Section>
      )}

      {projects.length > 0 && (
        <Section title={t(($) => $.projects.title)}>
          <ul className={projectList}>
            {projects.map((item) => (
              <li key={item.slug} className={project}>
                <div className={row}>
                  <span className={strong}>{item.title}</span>
                  <span className={cx(metaText, period)}>
                    {formatYearMonth(item.start)}
                    {item.end ? ` – ${formatYearMonth(item.end)}` : ''}
                  </span>
                </div>
                <p className={summary}>{item.summary}</p>
                {item.highlight && <p className={highlight}>{item.highlight}</p>}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {awards.length > 0 && (
        <Section title={t(($) => $.awards.title)}>
          <AwardList awards={sortAwards(awards)} />
        </Section>
      )}

      {skills.length > 0 && (
        <Section title={t(($) => $.skills.title)}>
          <SkillGroups groups={sortSkillGroups(skills)} />
        </Section>
      )}
    </article>
  );
}

export declare namespace ResumeDocument {
  export type Props = {
    experience: CareerEntry[];
    education: CareerEntry[];
    projects: Project[];
    awards: Award[];
    skills: SkillGroup[];
  };
}

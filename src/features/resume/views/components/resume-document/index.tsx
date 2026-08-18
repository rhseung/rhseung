import { useTranslation } from 'react-i18next';

import { formatYearMonth, SITE, type Profile } from '@/common/lib';
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="border-border text-primary border-b pb-1 text-sm font-medium tracking-tight">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function ResumeDocument({
  name,
  profile,
  experience,
  education,
  projects,
  awards,
  skills,
}: ResumeDocument.Props) {
  const { t } = useTranslation('resume');

  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">{name}</h1>
        <p className="text-sm leading-relaxed">{profile.headline}</p>
        {profile.intro && (
          <p className="text-muted-foreground text-sm leading-relaxed">{profile.intro}</p>
        )}

        <ul className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 text-xs">
          {profile.location && <li>{profile.location}</li>}
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
          <ul className="flex flex-col gap-3">
            {projects.map((project) => (
              <li key={project.slug} className="flex break-inside-avoid flex-col gap-0.5">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="font-medium">{project.title}</span>
                  <span className="text-muted-foreground ml-auto text-xs tabular-nums">
                    {formatYearMonth(project.start)}
                    {project.end ? ` – ${formatYearMonth(project.end)}` : ''}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{project.summary}</p>
                {project.highlight && <p className="text-sm">{project.highlight}</p>}
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
    name: string;
    profile: Profile;
    experience: CareerEntry[];
    education: CareerEntry[];
    projects: Project[];
    awards: Award[];
    skills: SkillGroup[];
  };
}

import { useTranslation } from 'react-i18next';

import type { ProjectSummary } from '@/features/projects';

import {
  sortAwards,
  sortCareer,
  sortSkillGroups,
  type AwardSummary,
  type CareerSummary,
  type Resume,
  type SkillGroup,
} from '../../../viewmodels';
import { AwardList } from '../award-list';
import { CareerList } from '../career-list';
import { SkillGroups } from '../skill-groups';

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

/**
 * `/about`이 화면에 그리고 `gen:resume`이 같은 페이지를 PDF로 굽는다.
 *
 * 섹션 내용은 이 문서가 소유하지 않는다 — 각 컬렉션에서 와서 여기로 모인다.
 */
export function ResumeDocument({
  name,
  resume,
  experience,
  education,
  projects,
  awards,
  skills,
  detailHref,
}: ResumeDocument.Props) {
  const { t } = useTranslation('resume');

  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">{name}</h1>
        <p className="text-sm leading-relaxed">{resume.headline}</p>
        {resume.intro && (
          <p className="text-muted-foreground text-sm leading-relaxed">{resume.intro}</p>
        )}

        <ul className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 text-xs">
          {resume.location && <li>{resume.location}</li>}
          <li>{resume.contact.email}</li>
          <li>{resume.contact.github.replace('https://', '')}</li>
          {resume.contact.linkedin && <li>{resume.contact.linkedin.replace('https://', '')}</li>}
          {resume.contact.site && <li>{resume.contact.site.replace('https://', '')}</li>}
        </ul>
      </header>

      {experience.length > 0 && (
        <Section title={t(($) => $.experience.title)}>
          <CareerList
            entries={sortCareer(experience)}
            ongoingLabel={t(($) => $.period.ongoing)}
            detailHref={(entry) => detailHref('experience', entry.slug)}
          />
        </Section>
      )}

      {education.length > 0 && (
        <Section title={t(($) => $.education.title)}>
          <CareerList
            entries={sortCareer(education)}
            ongoingLabel={t(($) => $.period.ongoing)}
            detailHref={(entry) => detailHref('education', entry.slug)}
          />
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
                    {project.start.replace('-', '.')}
                    {project.end ? ` – ${project.end.replace('-', '.')}` : ''}
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
          <AwardList
            awards={sortAwards(awards)}
            detailHref={(award) => detailHref('awards', award.slug)}
          />
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
    resume: Resume;
    experience: CareerSummary[];
    education: CareerSummary[];
    projects: ProjectSummary[];
    awards: AwardSummary[];
    skills: SkillGroup[];
    detailHref: (section: 'experience' | 'education' | 'awards', slug: string) => string;
  };
}

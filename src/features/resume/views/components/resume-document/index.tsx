import { useTranslation } from 'react-i18next';

import { SITE } from '@/common/lib';
import type { Project } from '@/features/projects';

import {
  sortAwards,
  sortCareer,
  sortSkillGroups,
  type Award,
  type CareerEntry,
  type Profile,
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
 * `/{lang}/resume/`가 화면에 그리고 빌드가 같은 페이지를 PDF로 굽는다.
 *
 * 섹션 내용은 이 문서가 소유하지 않는다 — 각 데이터 모듈에서 와서 여기로 모인다.
 */
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

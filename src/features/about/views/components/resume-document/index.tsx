import { useTranslation } from 'react-i18next';

import { Badge } from '@/common/components';
import type { ProjectSummary } from '@/features/projects';

import type { Resume, ResumeEntry } from '../../../viewmodels';

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

function EntryList({ entries }: { entries: readonly ResumeEntry[] }) {
  return (
    <ul className="flex flex-col gap-4">
      {entries.map((item) => (
        // 인쇄에서 한 항목이 두 쪽에 걸쳐 잘리지 않게.
        <li key={`${item.period}-${item.org}`} className="flex break-inside-avoid flex-col gap-0.5">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="font-medium">{item.role}</span>
            <span className="text-muted-foreground ml-auto text-xs tabular-nums">
              {item.period}
            </span>
          </div>
          <p className="text-primary text-sm">{item.org}</p>
          {item.description && (
            <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
          )}
        </li>
      ))}
    </ul>
  );
}

/**
 * 이력서 본문. `/about`이 화면에 그리고, `bun run gen:resume`이 같은 페이지를 Chromium
 * 인쇄 엔진으로 구워 PDF를 만든다 — 그래서 화면과 PDF가 어긋날 수가 없다.
 *
 * 프로젝트 섹션은 yaml이 아니라 `projects` 컬렉션에서 온다. 이력서용으로 다시 쓰지 않는다.
 */
export function ResumeDocument({ name, resume, projects }: ResumeDocument.Props) {
  const { t } = useTranslation('about');

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

      {resume.experience.length > 0 && (
        <Section title={t(($) => $.experience.title)}>
          <EntryList entries={resume.experience} />
        </Section>
      )}

      {resume.education.length > 0 && (
        <Section title={t(($) => $.education.title)}>
          <EntryList entries={resume.education} />
        </Section>
      )}

      {projects.length > 0 && (
        <Section title={t(($) => $.projects.title)}>
          <ul className="flex flex-col gap-3">
            {projects.map((project) => (
              <li key={project.slug} className="flex break-inside-avoid flex-col gap-0.5">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="font-medium">{project.title}</span>
                  <span className="text-muted-foreground text-sm">{project.summary}</span>
                  <span className="text-muted-foreground ml-auto text-xs tabular-nums">
                    {project.start.replace('-', '.')}
                    {project.end ? ` – ${project.end.replace('-', '.')}` : ''}
                  </span>
                </div>
                {project.highlight && (
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.highlight}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {resume.awards.length > 0 && (
        <Section title={t(($) => $.awards.title)}>
          <ul className="flex flex-col gap-3">
            {resume.awards.map((award) => (
              <li key={`${award.year}-${award.title}`} className="flex break-inside-avoid flex-col">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="font-medium">{award.title}</span>
                  <span className="text-muted-foreground ml-auto text-xs tabular-nums">
                    {award.year}
                  </span>
                </div>
                {award.issuer && <p className="text-primary text-sm">{award.issuer}</p>}
                {award.note && <p className="text-muted-foreground text-sm">{award.note}</p>}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {resume.skills.length > 0 && (
        <Section title={t(($) => $.skills.title)}>
          <ul className="flex flex-wrap gap-1">
            {resume.skills.map((skill) => (
              <li key={skill}>
                <Badge variant="outline">{skill}</Badge>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </article>
  );
}

export declare namespace ResumeDocument {
  export type Props = {
    name: string;
    resume: Resume;
    /** `projects` 컬렉션에서 온다 — 이력서용으로 다시 쓰지 않는다. */
    projects: ProjectSummary[];
  };
}

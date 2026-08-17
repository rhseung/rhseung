import { AppProviders } from '@/common/components';
import type { Language } from '@/common/lib';
import { AboutPage, type Resume } from '@/features/about';
import type { ProjectSummary } from '@/features/projects';

export function AboutIsland({ lang, name, resume, projects, resumeHref }: AboutIsland.Props) {
  return (
    <AppProviders lang={lang}>
      <AboutPage
        lang={lang}
        name={name}
        resume={resume}
        projects={projects}
        resumeHref={resumeHref}
      />
    </AppProviders>
  );
}

export declare namespace AboutIsland {
  export type Props = {
    lang: Language;
    name: string;
    resume: Resume;
    projects: ProjectSummary[];
    resumeHref: string;
  };
}

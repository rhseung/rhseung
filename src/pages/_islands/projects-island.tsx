import { AppProviders } from '@/common/components';
import type { Language } from '@/common/lib';
import type { Award } from '@/features/career';
import { ProjectsPage, type Project } from '@/features/projects';

export function ProjectsIsland({ lang, projects, awards }: ProjectsIsland.Props) {
  return (
    <AppProviders lang={lang}>
      <ProjectsPage lang={lang} projects={projects} awards={awards} />
    </AppProviders>
  );
}

export declare namespace ProjectsIsland {
  export type Props = {
    lang: Language;
    projects: Project[];
    awards?: Award[];
  };
}

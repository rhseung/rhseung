import { AppProviders } from '@/common/components';
import type { Language } from '@/common/lib';
import { ProjectsPage, type Project } from '@/features/projects';

export function ProjectsIsland({ lang, projects }: ProjectsIsland.Props) {
  return (
    <AppProviders lang={lang}>
      <ProjectsPage lang={lang} projects={projects} />
    </AppProviders>
  );
}

export declare namespace ProjectsIsland {
  export type Props = {
    lang: Language;
    projects: Project[];
  };
}

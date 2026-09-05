import { AppProviders } from '@/common/components';
import { ProjectsPage } from '@/features/projects';

export function ProjectsIsland({ lang, projects, awards }: ProjectsIsland.Props) {
  return (
    <AppProviders lang={lang}>
      <ProjectsPage lang={lang} projects={projects} awards={awards} />
    </AppProviders>
  );
}

export declare namespace ProjectsIsland {
  export type Props = ProjectsPage.Props;
}

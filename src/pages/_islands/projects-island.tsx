import { AppProviders } from '@/common/components';
import type { Language } from '@/common/lib';
import { ProjectsPage } from '@/features/projects';

export function ProjectsIsland({ lang, ...props }: ProjectsIsland.Props) {
  return (
    <AppProviders lang={lang}>
      <ProjectsPage {...props} />
    </AppProviders>
  );
}

export declare namespace ProjectsIsland {
  export type Props = ProjectsPage.Props & { lang: Language };
}

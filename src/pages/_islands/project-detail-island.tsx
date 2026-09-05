import { AppProviders } from '@/common/components';
import { ProjectDetailPage } from '@/features/projects';

export function ProjectDetailIsland({
  lang,
  project,
  awards,
  available,
  children,
}: ProjectDetailIsland.Props) {
  return (
    <AppProviders lang={lang}>
      <ProjectDetailPage lang={lang} project={project} awards={awards} available={available}>
        {children}
      </ProjectDetailPage>
    </AppProviders>
  );
}

export declare namespace ProjectDetailIsland {
  export type Props = ProjectDetailPage.Props;
}

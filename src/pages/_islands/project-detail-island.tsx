import { AppProviders } from '@/common/components';
import type { Language } from '@/common/lib';
import type { Award } from '@/features/career';
import { ProjectDetailPage, type Project } from '@/features/projects';

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
  export type Props = {
    lang: Language;
    project: Project;
    awards?: Award[];
    available?: readonly Language[];
    children: React.ReactNode;
  };
}

import { AppProviders } from '@/common/components';
import type { Language } from '@/common/lib';
import type { Award } from '@/features/career';
import { ProjectDetailPage, type Project } from '@/features/projects';

export function ProjectDetailIsland({
  lang,
  project,
  awards,
  altHref,
  children,
}: ProjectDetailIsland.Props) {
  return (
    <AppProviders lang={lang}>
      <ProjectDetailPage lang={lang} project={project} awards={awards} altHref={altHref}>
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
    altHref?: string;
    children: React.ReactNode;
  };
}

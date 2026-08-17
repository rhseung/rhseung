import { AppProviders } from '@/common/components';
import type { Language } from '@/common/lib';
import { ProjectDetailPage, type Project } from '@/features/projects';

/** children은 Astro가 렌더한 MDX 정적 HTML이다. */
export function ProjectDetailIsland({
  lang,
  project,
  altHref,
  children,
}: ProjectDetailIsland.Props) {
  return (
    <AppProviders lang={lang}>
      <ProjectDetailPage lang={lang} project={project} altHref={altHref}>
        {children}
      </ProjectDetailPage>
    </AppProviders>
  );
}

export declare namespace ProjectDetailIsland {
  export type Props = {
    lang: Language;
    project: Project;
    altHref?: string;
    children: React.ReactNode;
  };
}

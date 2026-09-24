import { AppProviders } from '@/common/components';
import type { Language } from '@/common/lib';
import { ProjectDetailPage } from '@/features/projects';

export function ProjectDetailIsland({ lang, ...props }: ProjectDetailIsland.Props) {
  return (
    <AppProviders lang={lang}>
      <ProjectDetailPage {...props} />
    </AppProviders>
  );
}

export declare namespace ProjectDetailIsland {
  export type Props = ProjectDetailPage.Props & { lang: Language };
}

import { AppProviders } from '@/common/components';
import type { Language } from '@/common/lib';

import { ProjectsPage } from '../components';

export function ProjectsView({ lang, ...props }: ProjectsView.Props) {
  return (
    <AppProviders lang={lang}>
      <ProjectsPage {...props} />
    </AppProviders>
  );
}

export declare namespace ProjectsView {
  export type Props = ProjectsPage.Props & { lang: Language };
}

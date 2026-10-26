import { AppProviders } from '@/common/components';
import type { Language } from '@/common/lib';

import { ProjectDetailPage } from '../components';

export function ProjectDetailView({ lang, ...props }: ProjectDetailView.Props) {
  return (
    <AppProviders lang={lang}>
      <ProjectDetailPage {...props} />
    </AppProviders>
  );
}

export declare namespace ProjectDetailView {
  export type Props = ProjectDetailPage.Props & { lang: Language };
}

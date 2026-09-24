import { AppProviders } from '@/common/components';
import type { Language } from '@/common/lib';
import { ResearchPage } from '@/features/research';

export function ResearchIsland({ lang, ...props }: ResearchIsland.Props) {
  return (
    <AppProviders lang={lang}>
      <ResearchPage {...props} />
    </AppProviders>
  );
}

export declare namespace ResearchIsland {
  export type Props = ResearchPage.Props & { lang: Language };
}

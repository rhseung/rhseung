import { AppProviders } from '@/common/components';
import { ResearchPage } from '@/features/research';

export function ResearchIsland({ lang, items, papers }: ResearchIsland.Props) {
  return (
    <AppProviders lang={lang}>
      <ResearchPage lang={lang} items={items} papers={papers} />
    </AppProviders>
  );
}

export declare namespace ResearchIsland {
  export type Props = ResearchPage.Props;
}

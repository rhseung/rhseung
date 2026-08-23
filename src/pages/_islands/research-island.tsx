import { AppProviders } from '@/common/components';
import type { Language } from '@/common/lib';
import { ResearchPage, type Research } from '@/features/research';

export function ResearchIsland({ lang, items, papers }: ResearchIsland.Props) {
  return (
    <AppProviders lang={lang}>
      <ResearchPage lang={lang} items={items} papers={papers} />
    </AppProviders>
  );
}

export declare namespace ResearchIsland {
  export type Props = {
    lang: Language;
    items: Research[];
    papers?: string[];
  };
}

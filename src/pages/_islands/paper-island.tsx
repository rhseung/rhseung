import { AppProviders } from '@/common/components';
import { PaperPage } from '@/features/research';

export function PaperIsland({
  lang,
  item,
  authors,
  bibtex,
  children,
  bibliography,
}: PaperIsland.Props) {
  return (
    <AppProviders lang={lang}>
      <PaperPage
        lang={lang}
        item={item}
        authors={authors}
        bibtex={bibtex}
        bibliography={bibliography}
      >
        {children}
      </PaperPage>
    </AppProviders>
  );
}

export declare namespace PaperIsland {
  export type Props = PaperPage.Props;
}

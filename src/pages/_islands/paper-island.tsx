import { AppProviders } from '@/common/components';
import type { Language } from '@/common/lib';
import { PaperPage, type Research } from '@/features/research';

export function PaperIsland({
  lang,
  item,
  authors,
  bibtex,
  altHref,
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
        altHref={altHref}
        bibliography={bibliography}
      >
        {children}
      </PaperPage>
    </AppProviders>
  );
}

export declare namespace PaperIsland {
  export type Props = {
    lang: Language;
    item: Research;
    authors?: string;
    bibtex?: string;
    altHref?: string;
    children: React.ReactNode;
    bibliography?: React.ReactNode;
  };
}

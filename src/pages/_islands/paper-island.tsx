import { AppProviders } from '@/common/components';
import type { Language } from '@/common/lib';
import { PaperPage } from '@/features/research';

export function PaperIsland({ lang, ...props }: PaperIsland.Props) {
  return (
    <AppProviders lang={lang}>
      <PaperPage {...props} />
    </AppProviders>
  );
}

export declare namespace PaperIsland {
  export type Props = PaperPage.Props & { lang: Language };
}

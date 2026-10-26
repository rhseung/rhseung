import { AppProviders } from '@/common/components';
import type { Language } from '@/common/lib';

import { PaperPage } from '../components';

export function PaperView({ lang, ...props }: PaperView.Props) {
  return (
    <AppProviders lang={lang}>
      <PaperPage {...props} />
    </AppProviders>
  );
}

export declare namespace PaperView {
  export type Props = PaperPage.Props & { lang: Language };
}

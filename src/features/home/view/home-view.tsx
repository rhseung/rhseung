import { AppProviders } from '@/common/components';
import type { Language } from '@/common/lib';

import { HomePage } from '../components';

export function HomeView({ lang, ...props }: HomeView.Props) {
  return (
    <AppProviders lang={lang}>
      <HomePage {...props} />
    </AppProviders>
  );
}

export declare namespace HomeView {
  export type Props = HomePage.Props & { lang: Language };
}

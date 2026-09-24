import { AppProviders } from '@/common/components';
import type { Language } from '@/common/lib';
import { HomePage } from '@/features/home';

export function HomeIsland({ lang, ...props }: HomeIsland.Props) {
  return (
    <AppProviders lang={lang}>
      <HomePage {...props} />
    </AppProviders>
  );
}

export declare namespace HomeIsland {
  export type Props = HomePage.Props & { lang: Language };
}

import { AppProviders } from '@/common/components';
import { HomePage } from '@/features/home';

export function HomeIsland({ lang, updatedOn }: HomeIsland.Props) {
  return (
    <AppProviders lang={lang}>
      <HomePage lang={lang} updatedOn={updatedOn} />
    </AppProviders>
  );
}

export declare namespace HomeIsland {
  export type Props = HomePage.Props;
}

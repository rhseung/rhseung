import { AppProviders } from '@/common/components';
import { HomePage } from '@/features/home';

export function HomeIsland({ lang, updatedAt, contributions, fetchedAt }: HomeIsland.Props) {
  return (
    <AppProviders lang={lang}>
      <HomePage
        lang={lang}
        updatedAt={updatedAt}
        contributions={contributions}
        fetchedAt={fetchedAt}
      />
    </AppProviders>
  );
}

export declare namespace HomeIsland {
  export type Props = HomePage.Props;
}

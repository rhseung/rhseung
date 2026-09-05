import { AppProviders } from '@/common/components';
import { HomePage } from '@/features/home';

/** `.astro` 에서 중첩하면 렌더 패스가 갈려 React context 가 안 이어진다("No QueryClient set"). */
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

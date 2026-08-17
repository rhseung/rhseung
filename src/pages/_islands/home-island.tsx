import { AppProviders } from '@/common/components';
import type { Language } from '@/common/lib';
import type { PostSummary } from '@/features/blog';
import { HomePage } from '@/features/home';
import type { Project } from '@/features/projects';

/**
 * `.astro`에서 프레임워크 컴포넌트를 직접 중첩하면 Astro가 자식을 별도 렌더 패스로 처리해서
 * React context가 안 이어진다("No QueryClient set"). 여기서 트리 하나로 미리 합쳐둔다.
 */
export function HomeIsland({ lang, headline, intro, pinned, recent }: HomeIsland.Props) {
  return (
    <AppProviders lang={lang}>
      <HomePage lang={lang} headline={headline} intro={intro} pinned={pinned} recent={recent} />
    </AppProviders>
  );
}

export declare namespace HomeIsland {
  export type Props = {
    lang: Language;
    headline: string;
    intro?: string;
    pinned: Project[];
    recent: PostSummary[];
  };
}

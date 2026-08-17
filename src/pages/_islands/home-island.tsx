import { AppProviders, SiteHeader } from '@/common/components';
import { localeHref, type Language } from '@/common/lib';

/**
 * `.astro`에서 `<AppProviders client:load><HomePage /></AppProviders>`처럼 프레임워크
 * 컴포넌트 두 개를 직접 중첩하면 Astro가 자식을 별도 렌더 패스로 처리해버려서
 * `QueryClientProvider` 컨텍스트가 안 이어진다("No QueryClient set" 빌드 에러). 그래서
 * 여기서 순수 React 트리 하나로 미리 합쳐두고 `.astro`는 이 컴포넌트에만 지시자를 건다.
 */
export function HomeIsland({ lang }: HomeIsland.Props) {
  return (
    <AppProviders lang={lang}>
      <div className="bg-background min-h-dvh">
        <SiteHeader lang={lang} altHref={localeHref(lang === 'ko' ? 'en' : 'ko', '/')} />
        <main className="mx-auto max-w-2xl px-4 py-12"></main>
      </div>
    </AppProviders>
  );
}

export declare namespace HomeIsland {
  export type Props = {
    lang: Language;
  };
}

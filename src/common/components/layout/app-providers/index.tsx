import { useEffect, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ThemeProvider } from 'next-themes';
import { I18nextProvider } from 'react-i18next';

import { i18n, type Language } from '@/common/lib';

// `import.meta.env`는 빌드 타임에 인라인된다 — devtools는 런타임 플래그가 아니라
// 프로덕션 번들에선 아예 안 들어간다.
const showDevtools = import.meta.env.PUBLIC_DEVTOOLS === '1';

// MSW가 켜져 있으면 목이 뜨기 전엔 자식을 렌더하지 않는다.
// 먼저 그려지면 워커가 준비되기 전에 진짜 fetch가 나가버린다.
let mockingReady: Promise<void> | null = null;

function ensureMocking(): Promise<void> {
  if (import.meta.env.PUBLIC_ENABLE_MSW !== 'true') return Promise.resolve();
  mockingReady ??= import('@/mocks/browser').then(({ startMocks }) => startMocks());
  return mockingReady;
}

export function AppProviders({ lang, children }: AppProviders.Props) {
  const [ready, setReady] = useState(import.meta.env.PUBLIC_ENABLE_MSW !== 'true');
  // 아일랜드마다 새 React 루트라서 클라이언트도 마운트마다 새로 만든다.
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { retry: 1, staleTime: 30_000 } } }),
  );

  // 언어는 라우트가 정한다. 리소스가 정적 import라 `changeLanguage`가 동기로 끝나므로
  // 첫 렌더 전에 반영된다 — SSG HTML과 하이드레이션 결과가 갈리지 않는다.
  if (i18n.language !== lang) void i18n.changeLanguage(lang);

  useEffect(() => {
    if (ready) return;
    void ensureMocking().then(() => setReady(true));
  }, [ready]);

  if (!ready) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        {showDevtools && <ReactQueryDevtools buttonPosition="bottom-left" />}
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export declare namespace AppProviders {
  export type Props = {
    lang: Language;
    children: React.ReactNode;
  };
}

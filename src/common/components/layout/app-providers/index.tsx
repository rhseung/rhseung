import { useEffect, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ThemeProvider } from 'next-themes';
import { I18nextProvider } from 'react-i18next';

import { i18n, type Language } from '@/common/lib';

const showDevtools = import.meta.env.PUBLIC_DEVTOOLS === '1';

let mockingReady: Promise<void> | null = null;

function ensureMocking(): Promise<void> {
  if (import.meta.env.PUBLIC_ENABLE_MSW !== 'true') {
    mockingReady ??= import('@/mocks/browser').then(({ unregisterStaleWorker }) =>
      unregisterStaleWorker(),
    );
    return mockingReady;
  }

  mockingReady ??= import('@/mocks/browser').then(({ startMocks }) => startMocks());
  return mockingReady;
}

export function AppProviders({ lang, children }: AppProviders.Props) {
  // 아일랜드마다 새 React 루트라서 클라이언트도 마운트마다 새로 만든다.
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { retry: 1, staleTime: 30_000 } } }),
  );

  if (i18n.language !== lang) void i18n.changeLanguage(lang);

  // 워커를 띄우되 렌더를 막지 않는다. 여기서 자식을 가리면 그 null이 SSR 결과가 되어
  // 본문이 하이드레이션용 <template>에 갇힌다 — JS가 꺼지면 백지다.
  //
  // ponytail: 지금은 런타임 쿼리가 0개라 경합이 없다. 실제 fetch가 생기면 렌더를 막는
  // 대신 그 쿼리에 `enabled: mocksReady`를 건다.
  useEffect(() => {
    void ensureMocking();
  }, []);

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

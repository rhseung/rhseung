import { useEffect, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { I18nextProvider } from 'react-i18next';

import { i18n, type Language } from '@/common/lib';

const showDevtools = import.meta.env.PUBLIC_DEVTOOLS === '1';

let mockingReady: Promise<void> | null = null;

function ensureMocking(): Promise<void> {
  if (import.meta.env.PUBLIC_ENABLE_MSW !== 'true') {
    mockingReady ??= import('@/mocks/unregister').then(({ unregisterStaleWorker }) =>
      unregisterStaleWorker(),
    );
    return mockingReady;
  }

  mockingReady ??= import('@/mocks/browser').then(({ startMocks }) => startMocks());
  return mockingReady;
}

export function AppProviders({ lang, children }: AppProviders.Props) {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { retry: 1, staleTime: 30_000 } } }),
  );

  if (i18n.language !== lang) void i18n.changeLanguage(lang);

  useEffect(() => {
    void ensureMocking();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      {showDevtools && <ReactQueryDevtools buttonPosition="bottom-left" />}
    </QueryClientProvider>
  );
}

export declare namespace AppProviders {
  export type Props = {
    lang: Language;
    children: React.ReactNode;
  };
}

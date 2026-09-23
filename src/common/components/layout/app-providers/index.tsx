import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { NuqsAdapter } from 'nuqs/adapters/react';
import { I18nextProvider } from 'react-i18next';

import { i18n, SHOW_DEVTOOLS, type Language } from '@/common/lib';

import '@/common/lib/i18n/dayjs';

export function AppProviders({ lang, children }: AppProviders.Props) {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { retry: 1, staleTime: 30_000 } } }),
  );

  if (i18n.language !== lang) void i18n.changeLanguage(lang);

  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <NuqsAdapter>{children}</NuqsAdapter>
      </I18nextProvider>
      {SHOW_DEVTOOLS && <ReactQueryDevtools buttonPosition="bottom-left" />}
    </QueryClientProvider>
  );
}

export declare namespace AppProviders {
  export type Props = {
    lang: Language;
    children: React.ReactNode;
  };
}

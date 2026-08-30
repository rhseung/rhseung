import { useEffect, useState, type ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { I18nextProvider } from 'react-i18next';

import { i18n } from '@/common/lib';

import type { Decorator } from '@storybook/react-vite';

/** 데코레이터 안에서 훅을 직접 부르면 안 된다. 렌더 중에 호출된다는 보장이 없다. */

function WithQueryClient({ children }: { children: ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
      }),
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export const withQueryClient: Decorator = (Story) => (
  <WithQueryClient>
    <Story />
  </WithQueryClient>
);

function WithLocale({ locale, children }: { locale: string; children: ReactNode }) {
  useEffect(() => {
    void i18n.changeLanguage(locale);
  }, [locale]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

export const withLocale: Decorator = (Story, context) => (
  <WithLocale locale={(context.globals.locale as string) ?? 'ko'}>
    <Story />
  </WithLocale>
);

import { useEffect, useState, type ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { NuqsTestingAdapter } from 'nuqs/adapters/testing';
import { I18nextProvider } from 'react-i18next';

import { DEFAULT_LANGUAGE, i18n } from '@/common/lib';

import type { Decorator } from '@storybook/react-vite';

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
  <WithLocale locale={(context.globals.locale as string) ?? DEFAULT_LANGUAGE}>
    <Story />
  </WithLocale>
);

export const withUrlState: Decorator = (Story) => (
  <NuqsTestingAdapter>
    <Story />
  </NuqsTestingAdapter>
);

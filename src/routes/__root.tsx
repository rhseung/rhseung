import type { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from '@tanstack/react-router';

import { I18nextProvider } from 'react-i18next';

import '@/common/lib/dayjs';
import { i18n } from '@/common/lib/i18n';
import { ErrorPage, NotFoundPage } from '@/common/pages';
import '../styles.css';

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  notFoundComponent: NotFoundPage,
  errorComponent: ({ error, reset }) => <ErrorPage error={error} reset={reset} />,
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#000000' },
      { name: 'description', content: 'Template SSR FE' },
      { title: 'Template SSR FE' },
    ],
    links: [{ rel: 'icon', href: '/favicon.svg' }],
  }),
  component: RootComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n}>
            <Outlet />
          </I18nextProvider>
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  );
}

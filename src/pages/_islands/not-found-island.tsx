import { AppProviders, NotFound } from '@/common/components';
import { DEFAULT_LANGUAGE } from '@/common/lib';

export function NotFoundIsland() {
  return (
    <AppProviders lang={DEFAULT_LANGUAGE}>
      <NotFound />
    </AppProviders>
  );
}

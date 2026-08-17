import { AppProviders, NotFound } from '@/common/components';
import { DEFAULT_LANGUAGE } from '@/common/lib';

/** 404는 언어 미러가 없다. */
export function NotFoundIsland() {
  return (
    <AppProviders lang={DEFAULT_LANGUAGE}>
      <NotFound />
    </AppProviders>
  );
}

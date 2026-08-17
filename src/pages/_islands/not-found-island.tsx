import { AppProviders, NotFound } from '@/common/components';
import { DEFAULT_LANGUAGE } from '@/common/lib';

/** `home-island.tsx` 참고 — 이유는 같다. 404는 언어 미러가 없다. */
export function NotFoundIsland() {
  return (
    <AppProviders lang={DEFAULT_LANGUAGE}>
      <NotFound />
    </AppProviders>
  );
}

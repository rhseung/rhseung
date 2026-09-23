import { AppProviders, NotFound } from '@/common/components';
import type { Language } from '@/common/lib';

export function NotFoundIsland({ lang }: NotFoundIsland.Props) {
  return (
    <AppProviders lang={lang}>
      <NotFound />
    </AppProviders>
  );
}

export declare namespace NotFoundIsland {
  export type Props = { lang: Language };
}

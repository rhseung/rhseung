import { type Language } from '@/common/lib';

import { AppProviders } from '../app-providers';
import { NotFound } from '../not-found';

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

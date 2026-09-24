import { AppProviders } from '@/common/components';
import type { Language } from '@/common/lib';
import { CareerPage } from '@/features/career';

export function CareerIsland({ lang, ...props }: CareerIsland.Props) {
  return (
    <AppProviders lang={lang}>
      <CareerPage {...props} />
    </AppProviders>
  );
}

export declare namespace CareerIsland {
  export type Props = CareerPage.Props & { lang: Language };
}

import { I18nextProvider } from 'react-i18next';

import { i18nFor, type Language } from '@/common/lib';
import { CareerPage } from '@/features/career';

export function CareerView({ lang, ...props }: CareerView.Props) {
  return (
    <I18nextProvider i18n={i18nFor(lang)}>
      <CareerPage {...props} />
    </I18nextProvider>
  );
}

export declare namespace CareerView {
  export type Props = CareerPage.Props & { lang: Language };
}

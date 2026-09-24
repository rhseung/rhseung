import { I18nextProvider } from 'react-i18next';

import { SiteDock } from '@/common/components';
import { i18nFor, type Language } from '@/common/lib';

export function SiteDockIsland({ lang, ...props }: SiteDockIsland.Props) {
  return (
    <I18nextProvider i18n={i18nFor(lang)}>
      <SiteDock lang={lang} {...props} />
    </I18nextProvider>
  );
}

export declare namespace SiteDockIsland {
  export type Props = SiteDock.Props & { lang: Language };
}

import { I18nextProvider } from 'react-i18next';

import { i18nFor, type Language } from '@/common/lib';

import { WipNotice } from '../wip-notice';

export function WipNoticeIsland({ lang }: WipNoticeIsland.Props) {
  return (
    <I18nextProvider i18n={i18nFor(lang)}>
      <WipNotice lang={lang} />
    </I18nextProvider>
  );
}

export declare namespace WipNoticeIsland {
  export type Props = { lang: Language };
}

import { type Language } from '@/common/lib';

import { AppProviders } from '../app-providers';
import { WipNotice } from '../wip-notice';

export function WipNoticeIsland({ lang }: WipNoticeIsland.Props) {
  return (
    <AppProviders lang={lang}>
      <WipNotice lang={lang} />
    </AppProviders>
  );
}

export declare namespace WipNoticeIsland {
  export type Props = { lang: Language };
}

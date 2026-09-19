import { AppProviders, WipNotice } from '@/common/components';
import type { Language } from '@/common/lib';

export declare namespace WipNoticeIsland {
  export type Props = {
    lang: Language;
  };
}

export function WipNoticeIsland({ lang }: WipNoticeIsland.Props) {
  return (
    <AppProviders lang={lang}>
      <WipNotice lang={lang} />
    </AppProviders>
  );
}

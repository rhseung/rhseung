import { I18nextProvider } from 'react-i18next';

import { i18nFor, type Language } from '@/common/lib';

import { PAPER_SLUGS, researchOf } from './models';
import { ResearchPage } from './views';

export function ResearchView({ lang }: ResearchView.Props) {
  return (
    <I18nextProvider i18n={i18nFor(lang)}>
      <ResearchPage items={researchOf(lang)} papers={[...PAPER_SLUGS]} />
    </I18nextProvider>
  );
}

export declare namespace ResearchView {
  export type Props = { lang: Language };
}

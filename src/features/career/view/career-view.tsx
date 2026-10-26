import { I18nextProvider } from 'react-i18next';

import { i18nFor, type Language } from '@/common/lib';

import { CareerPage } from '../components';
import { awardsOf, educationOf, experienceOf, skillGroupsOf } from '../model';

export function CareerView({ lang }: CareerView.Props) {
  return (
    <I18nextProvider i18n={i18nFor(lang)}>
      <CareerPage
        experience={experienceOf(lang)}
        education={educationOf(lang)}
        awards={awardsOf(lang)}
        skills={skillGroupsOf(lang)}
      />
    </I18nextProvider>
  );
}

export declare namespace CareerView {
  export type Props = { lang: Language };
}

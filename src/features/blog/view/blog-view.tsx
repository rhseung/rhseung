import { I18nextProvider } from 'react-i18next';

import { i18nFor, type Language } from '@/common/lib';

import { BlogPage } from '../components';

export function BlogView({ lang, ...props }: BlogView.Props) {
  return (
    <I18nextProvider i18n={i18nFor(lang)}>
      <BlogPage {...props} />
    </I18nextProvider>
  );
}

export declare namespace BlogView {
  export type Props = BlogPage.Props & { lang: Language };
}

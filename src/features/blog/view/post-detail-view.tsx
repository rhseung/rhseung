import { AppProviders } from '@/common/components';
import type { Language } from '@/common/lib';

import { PostDetailPage } from '../components';

export function PostDetailView({ lang, ...props }: PostDetailView.Props) {
  return (
    <AppProviders lang={lang}>
      <PostDetailPage {...props} />
    </AppProviders>
  );
}

export declare namespace PostDetailView {
  export type Props = PostDetailPage.Props & { lang: Language };
}

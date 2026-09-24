import { AppProviders } from '@/common/components';
import type { Language } from '@/common/lib';
import { PostDetailPage } from '@/features/blog';

export function PostDetailIsland({ lang, ...props }: PostDetailIsland.Props) {
  return (
    <AppProviders lang={lang}>
      <PostDetailPage {...props} />
    </AppProviders>
  );
}

export declare namespace PostDetailIsland {
  export type Props = PostDetailPage.Props & { lang: Language };
}

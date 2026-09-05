import { AppProviders } from '@/common/components';
import { PostDetailPage } from '@/features/blog';

export function PostDetailIsland({ lang, post, headings, children }: PostDetailIsland.Props) {
  return (
    <AppProviders lang={lang}>
      <PostDetailPage lang={lang} post={post} headings={headings}>
        {children}
      </PostDetailPage>
    </AppProviders>
  );
}

export declare namespace PostDetailIsland {
  export type Props = PostDetailPage.Props;
}

import { AppProviders } from '@/common/components';
import { PostDetailPage } from '@/features/blog';

export function PostDetailIsland({ post, headings, children }: PostDetailIsland.Props) {
  return (
    <AppProviders lang={post.lang}>
      <PostDetailPage post={post} headings={headings}>
        {children}
      </PostDetailPage>
    </AppProviders>
  );
}

export declare namespace PostDetailIsland {
  export type Props = PostDetailPage.Props;
}

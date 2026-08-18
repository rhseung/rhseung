import { AppProviders } from '@/common/components';
import { PostDetailPage, type PostSummary } from '@/features/blog';

export function PostDetailIsland({ post, children }: PostDetailIsland.Props) {
  return (
    <AppProviders lang={post.lang}>
      <PostDetailPage post={post}>{children}</PostDetailPage>
    </AppProviders>
  );
}

export declare namespace PostDetailIsland {
  export type Props = {
    post: PostSummary;
    children: React.ReactNode;
  };
}

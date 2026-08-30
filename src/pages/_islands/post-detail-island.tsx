import { AppProviders } from '@/common/components';
import { PostDetailPage, type PostHeading, type PostSummary } from '@/features/blog';

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
  export type Props = {
    post: PostSummary;
    headings: readonly PostHeading[];
    children: React.ReactNode;
  };
}

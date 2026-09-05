import { AppProviders } from '@/common/components';
import { BlogPage } from '@/features/blog';

export function BlogIsland({ lang, posts }: BlogIsland.Props) {
  return (
    <AppProviders lang={lang}>
      <BlogPage lang={lang} posts={posts} />
    </AppProviders>
  );
}

export declare namespace BlogIsland {
  export type Props = BlogPage.Props;
}

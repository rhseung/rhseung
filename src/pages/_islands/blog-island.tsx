import { AppProviders } from '@/common/components';
import type { Language } from '@/common/lib';
import { BlogPage } from '@/features/blog';

export function BlogIsland({ lang, ...props }: BlogIsland.Props) {
  return (
    <AppProviders lang={lang}>
      <BlogPage {...props} />
    </AppProviders>
  );
}

export declare namespace BlogIsland {
  export type Props = BlogPage.Props & { lang: Language };
}

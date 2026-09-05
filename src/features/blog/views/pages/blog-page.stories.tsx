import { BlogPage } from '.';

import type { PostSummary } from '../../viewmodels';
import type { Meta, StoryObj } from '@storybook/react-vite';

const posts: PostSummary[] = [
  {
    slug: 'astro-island-ssr-gap',
    title: 'Provider 하나가 페이지를 통째로 백지로 만들었다',
    summary: 'Astro 아일랜드가 SSR을 건너뛰고 본문이 하이드레이션 template에 갇힌 이야기.',
    bodyLang: 'ko',
    tags: ['astro', 'react'],
    date: '2026-08-17',
  },
  {
    slug: 'typed-content-collections',
    title: 'Schema direction matters',
    summary: 'Why the zod schema lives in the feature, not in content.config.ts.',
    bodyLang: 'en',
    tags: ['astro'],
    date: '2026-06-02',
  },
];

const meta = {
  title: 'Blog/Pages/BlogPage',
  component: BlogPage,
  parameters: { layout: 'fullscreen' },
  args: { lang: 'ko', posts },
} satisfies Meta<typeof BlogPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EmptyState: Story = {
  args: { posts: [] },
};

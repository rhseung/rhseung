import { PostListItem } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Blog/PostListItem',
  component: PostListItem,
  parameters: { layout: 'padded' },
  args: {
    href: '/blog/astro-islands/',
    showLanguage: false,
    post: {
      slug: 'astro-islands',
      title: '아일랜드가 SSR을 건너뛰던 이유',
      summary: 'Provider 하나가 null을 반환해서 페이지 본문이 통째로 template에 갇혔다.',
      bodyLang: 'ko',
      tags: ['astro', 'react'],
      date: '2026-08-17',
    },
  },
} satisfies Meta<typeof PostListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLanguageBadge: Story = {
  args: { showLanguage: true },
};

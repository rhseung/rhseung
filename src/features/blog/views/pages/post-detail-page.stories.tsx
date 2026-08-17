import { PostDetailPage } from '.';

import type { PostSummary } from '../../viewmodels';
import type { Meta, StoryObj } from '@storybook/react-vite';

const post: PostSummary = {
  slug: 'astro-island-ssr-gap',
  title: 'Provider 하나가 페이지를 통째로 백지로 만들었다',
  summary: 'Astro 아일랜드가 SSR을 건너뛰고 본문이 하이드레이션 template에 갇힌 이야기.',
  lang: 'ko',
  tags: ['astro', 'react', 'ssr'],
  draft: false,
  date: '2026-08-17T00:00:00.000Z',
};

const body = (
  <>
    <h2>원인</h2>
    <p>MSW가 준비될 때까지 자식을 렌더하지 않는 게이트가 빌드 타임에도 그대로 돌았다.</p>
  </>
);

const meta = {
  title: 'Blog/Pages/PostDetailPage',
  component: PostDetailPage,
  parameters: { layout: 'fullscreen' },
  args: { post, children: body },
} satisfies Meta<typeof PostDetailPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const English: Story = {
  args: { post: { ...post, lang: 'en', title: 'One provider blanked the whole page' } },
};

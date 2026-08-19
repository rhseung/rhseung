import type { PostSummary } from '@/features/blog';

import { HomePage } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const recent: PostSummary[] = [
  {
    slug: 'astro-island-ssr-gap',
    title: 'Provider 하나가 페이지를 통째로 백지로 만들었다',
    summary: '아일랜드가 SSR을 건너뛴 이유.',
    lang: 'ko',
    tags: ['astro'],
    draft: false,
    date: '2026-08-17T00:00:00.000Z',
  },
];

const meta = {
  title: 'Home/Pages/HomePage',
  component: HomePage,
  parameters: { layout: 'fullscreen' },
  args: {
    lang: 'ko',
    headline: '웹 앱을 만들고, 그게 도는 언어와 런타임도 만듭니다.',
    intro:
      '프론트엔드와 시스템 프로그래밍 양쪽을 오갑니다. 추상화 층 하나를 쓰는 것과 그 층을 직접 만드는 것 사이에서 배우는 게 많다고 생각합니다.',
    recent,
  },
} satisfies Meta<typeof HomePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Bare: Story = {
  args: { recent: [] },
};

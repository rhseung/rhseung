import type { PostSummary } from '@/features/blog';
import type { ProjectSummary } from '@/features/projects';

import { HomePage } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const pinned: ProjectSummary[] = [
  {
    slug: 'lumen',
    title: 'Lumen',
    summary: '타입 추론이 있는 작은 스크립트 언어.',
    domain: 'systems',
    stack: ['rust', 'llvm'],
    start: '2024-03',
    status: 'active',
    pinned: true,
    draft: false,
    hasDetail: true,
  },
  {
    slug: 'rhseung-me',
    title: 'rhseung.me',
    summary: 'Astro 아일랜드로 만든 이 사이트.',
    domain: 'web',
    stack: ['astro', 'react'],
    start: '2026-08',
    status: 'active',
    pinned: true,
    draft: false,
    hasDetail: true,
  },
  {
    slug: 'raymarch',
    title: 'raymarch',
    summary: 'WebGPU 레이마칭 실험.',
    domain: 'graphics',
    stack: ['wgpu'],
    start: '2023-05',
    end: '2023-09',
    status: 'archived',
    pinned: true,
    draft: false,
    hasDetail: true,
  },
];

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
    pinned,
    recent,
  },
} satisfies Meta<typeof HomePage>;

export default meta;

type Story = StoryObj<typeof meta>;

/** pinned 셋의 도메인이 서로 다르다 — 넓이를 말이 아니라 배치로 증명하는 자리. */
export const Default: Story = {};

/** 콘텐츠를 채우기 전. 빈 섹션은 통째로 빠진다. */
export const Bare: Story = {
  args: { pinned: [], recent: [] },
};

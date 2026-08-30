import { PostDetailPage } from '.';

import type { PostHeading, PostSummary } from '../../viewmodels';
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

const headings: PostHeading[] = [
  { depth: 2, slug: 'cause', text: '원인' },
  { depth: 3, slug: 'gate', text: '렌더 게이트' },
  { depth: 2, slug: 'fix', text: '고친 방법' },
];

const body = (
  <>
    <h2 id="cause">원인</h2>
    <p>MSW가 준비될 때까지 자식을 렌더하지 않는 게이트가 빌드 타임에도 그대로 돌았다.</p>
    <h3 id="gate">렌더 게이트</h3>
    <p>클라이언트에선 한 프레임이지만 빌드 타임에는 영원이다.</p>
    <h2 id="fix">고친 방법</h2>
    <p>
      게이트를 걷어내고 그 쿼리에 <code>enabled</code>를 걸었다.
    </p>
  </>
);

const meta = {
  title: 'Blog/Pages/PostDetailPage',
  component: PostDetailPage,
  parameters: { layout: 'fullscreen' },
  args: { post, headings, children: body },
} satisfies Meta<typeof PostDetailPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** 제목이 없는 짧은 글에서는 목차가 사라진다. */
export const WithoutHeadings: Story = { args: { headings: [] } };

export const English: Story = {
  args: { post: { ...post, lang: 'en', title: 'One provider blanked the whole page' } },
};

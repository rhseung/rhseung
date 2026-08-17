import { ProjectDetailPage } from '.';

import type { ProjectSummary } from '../../viewmodels';
import type { Meta, StoryObj } from '@storybook/react-vite';

const project: ProjectSummary = {
  slug: 'lumen',
  title: 'Lumen',
  summary: '타입 추론이 있는 작은 스크립트 언어.',
  domain: 'systems',
  stack: ['rust', 'llvm'],
  start: '2024-03',
  status: 'active',
  pinned: true,
  draft: false,
  links: { repo: 'https://github.com/rhseung/lumen' },
};

/** 실제로는 Astro가 MDX를 렌더해 슬롯으로 넣는다. */
const body = (
  <>
    <h2>왜 만들었나</h2>
    <p>
      타입 추론기를 직접 써보고 싶었다. 논문을 읽는 것과 Hindley–Milner를 굴러가게 만드는 것은 다른
      일이다.
    </p>
    <h2>어떻게 만들었나</h2>
    <p>트리워킹 인터프리터로 시작해 바이트코드 VM으로 옮겼다.</p>
  </>
);

const meta = {
  title: 'Projects/Pages/ProjectDetailPage',
  component: ProjectDetailPage,
  parameters: { layout: 'fullscreen' },
  args: { lang: 'ko', project, altHref: '/en/projects/lumen/', children: body },
} satisfies Meta<typeof ProjectDetailPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHighlight: Story = {
  args: { project: { ...project, highlight: '파싱 3.2× 빠름 (12k LOC 기준)' } },
};

/** 영어판이 없는 문서. */
export const WithoutAlternate: Story = {
  args: { altHref: undefined },
};

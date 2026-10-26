import { ProjectCard } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Projects/ProjectCard',
  component: ProjectCard,
  parameters: { layout: 'padded' },
  args: {
    detailHref: '/projects/lumen/',
    careerHref: '/career/',
    project: {
      slug: 'lumen',
      title: 'Lumen',
      summary:
        '타입 추론이 있는 작은 스크립트 언어. 트리워킹 인터프리터로 시작해 바이트코드 VM으로 옮겼고, Hindley–Milner 추론기를 직접 구현했다.',
      stack: ['Rust', 'TypeScript'],
      start: { year: 2024, month: 3 },
      status: 'active',
      category: 'lab',
      hasDetail: true,
      links: { repo: 'https://github.com/rhseung/lumen' },
    },
  },
} satisfies Meta<typeof ProjectCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithDetail: Story = {};

export const CardOnly: Story = {
  args: {
    project: {
      ...meta.args.project,
      hasDetail: false,
      links: {
        repo: 'https://github.com/rhseung/lumen',
        demo: 'https://lumen.rhseung.me',
      },
    },
  },
};

export const NoLinks: Story = {
  args: {
    project: { ...meta.args.project, hasDetail: false, links: undefined },
  },
};

export const WithCover: Story = {
  args: {
    project: {
      ...meta.args.project,
      cover: '/images/profile.png',
      coverAlt: 'Lumen 플레이그라운드 화면',
    },
  },
};

export const WithAward: Story = {
  args: {
    awards: [
      {
        slug: 'compiler-contest',
        title: '컴파일러 경진대회 대상',
        date: { year: 2024, month: 11 },
      },
    ],
  },
};

export const Archived: Story = {
  args: {
    project: {
      ...meta.args.project,
      status: 'archived',
      category: 'lab',
      end: { year: 2024, month: 11 },
    },
  },
};

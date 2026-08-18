import { ProjectCard } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Projects/ProjectCard',
  component: ProjectCard,
  parameters: { layout: 'padded' },
  args: {
    detailHref: '/projects/lumen/',
    project: {
      slug: 'lumen',
      title: 'Lumen',
      summary:
        '타입 추론이 있는 작은 스크립트 언어. 트리워킹 인터프리터로 시작해 바이트코드 VM으로 옮겼고, Hindley–Milner 추론기를 직접 구현했다.',
      domain: 'systems',
      stack: ['Rust', 'Rust', 'TypeScript'],
      start: { year: 2024, month: 3 },
      status: 'active',
      pinned: true,
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

export const WithHighlight: Story = {
  args: {
    project: { ...meta.args.project, highlight: '파싱 3.2× 빠름 (12k LOC 기준)' },
  },
};

export const Archived: Story = {
  args: {
    project: {
      ...meta.args.project,
      status: 'archived',
      end: { year: 2024, month: 11 },
      pinned: false,
    },
  },
};

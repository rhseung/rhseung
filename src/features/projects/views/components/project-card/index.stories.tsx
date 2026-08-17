import { ProjectCard } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Projects/ProjectCard',
  component: ProjectCard,
  parameters: { layout: 'padded' },
  args: {
    href: '/projects/lumen/',
    project: {
      slug: 'lumen',
      title: 'Lumen',
      summary: '타입 추론이 있는 작은 스크립트 언어. 트리워킹 인터프리터부터 시작했다.',
      domain: 'systems',
      stack: ['rust', 'llvm', 'typescript'],
      start: '2024-03',
      status: 'active',
      pinned: true,
      draft: false,
    },
  },
} satisfies Meta<typeof ProjectCard>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 종료월이 없으면 진행 중으로 읽힌다. */
export const Default: Story = {};

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
      end: '2024-11',
      pinned: false,
    },
  },
};

/** 스택 상한(6개)까지 채웠을 때 칩이 감기는 모양. */
export const FullStack: Story = {
  args: {
    project: {
      ...meta.args.project,
      domain: 'web',
      stack: ['typescript', 'astro', 'react', 'tailwindcss', 'vitest', 'playwright'],
    },
  },
};

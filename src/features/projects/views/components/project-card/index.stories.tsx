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
      stack: ['rust', 'llvm', 'typescript'],
      start: '2024-03',
      status: 'active',
      pinned: true,
      hasDetail: true,
      links: { repo: 'https://github.com/rhseung/lumen' },
    },
  },
} satisfies Meta<typeof ProjectCard>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 본문이 있는 프로젝트 — 제목이 상세 페이지로 간다. */
export const WithDetail: Story = {};

/**
 * 본문이 없는 프로젝트 — 대부분이 여기 해당한다.
 * 제목이 저장소로 바로 나가고 아이콘이 외부 링크임을 알린다.
 */
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

/** 링크도 본문도 없으면 제목은 링크가 아니다. */
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
    project: { ...meta.args.project, status: 'archived', end: '2024-11', pinned: false },
  },
};

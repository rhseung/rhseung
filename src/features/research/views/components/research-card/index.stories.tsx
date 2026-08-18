import { ResearchCard } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';


const meta = {
  title: 'Research/ResearchCard',
  component: ResearchCard,
  args: {
    item: {
      slug: 'rne-2023',
      kind: 'rne',
      start: { year: 2023, month: 3 },
      end: { year: 2023, month: 12 },
      title: '주제 이름',
      org: '어느 학교',
      role: '팀장',
      summary: '무엇을 재고 무엇을 만들었는지 한 문장.',
      links: { paper: 'https://example.com/paper.pdf', repo: 'https://github.com/rhseung' },
    },
  },
} satisfies Meta<typeof ResearchCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Ongoing: Story = {
  args: {
    item: {
      slug: 'lab',
      kind: 'lab',
      start: { year: 2025, month: 9 },
      title: '오디오 지능 연구',
      org: 'GIST AiTeR',
      summary: '진행 중인 항목은 기간이 현재로 끝난다.',
    },
  },
};

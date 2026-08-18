
import { ResearchPage } from './research-page';

import type { Research } from '../../viewmodels';
import type { Meta, StoryObj } from '@storybook/react-vite';

const items: Research[] = [
  {
    slug: 'rne-2023',
    kind: 'rne',
    start: { year: 2023, month: 3 },
    end: { year: 2023, month: 12 },
    title: '주제 이름',
    org: '어느 학교',
    role: '팀장',
    summary: '무엇을 재고 무엇을 만들었는지 한 문장.',
    links: { paper: 'https://example.com/paper.pdf' },
  },
];

const meta = {
  title: 'Research/Pages/ResearchPage',
  component: ResearchPage,
  parameters: { layout: 'fullscreen' },
  args: { lang: 'ko', items },
} satisfies Meta<typeof ResearchPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EmptyState: Story = { args: { items: [] } };

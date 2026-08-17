import { CareerList } from '.';

import type { CareerEntry } from '../../../viewmodels';
import type { Meta, StoryObj } from '@storybook/react-vite';

const entries: CareerEntry[] = [
  {
    slug: 'now',
    role: '프론트엔드 엔지니어',
    org: '어딘가',
    start: '2025-03',
    summary: '디자인 시스템을 Base UI로 옮기고 빌드 시간을 절반으로 줄였습니다.',
    achievements: [],
    links: { site: 'https://example.com' },
  },
  {
    slug: 'before',
    role: '인턴',
    org: '다른 곳',
    start: '2024-06',
    end: '2024-08',
    achievements: ['우수 인턴 선정'],
  },
];

const meta = {
  title: 'Resume/CareerList',
  component: CareerList,
  parameters: { layout: 'padded' },
  args: { entries, ongoingLabel: '현재' },
} satisfies Meta<typeof CareerList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Timeline: Story = {
  args: { timeline: true },
};

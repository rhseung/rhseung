import { AwardList } from '.';

import type { Award } from '../../../viewmodels';
import type { Meta, StoryObj } from '@storybook/react-vite';

const awards: Award[] = [
  {
    slug: 'big',
    title: '무슨 대회 대상',
    issuer: '주최기관',
    date: { year: 2025, month: 6 },
    summary: '참가 120팀 중 1위',
  },
  { slug: 'small', title: '장려상', date: { year: 2024, month: 11 } },
];

const meta = {
  title: 'Resume/AwardList',
  component: AwardList,
  parameters: { layout: 'padded' },
  args: { awards },
} satisfies Meta<typeof AwardList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

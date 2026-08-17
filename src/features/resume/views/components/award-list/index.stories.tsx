import { AwardList } from '.';

import type { AwardSummary } from '../../../viewmodels';
import type { Meta, StoryObj } from '@storybook/react-vite';

const awards: AwardSummary[] = [
  {
    slug: 'big',
    title: '무슨 대회 대상',
    issuer: '주최기관',
    date: '2025-06',
    order: 0,
    summary: '참가 120팀 중 1위',
    hasDetail: true,
    draft: false,
  },
  { slug: 'small', title: '장려상', date: '2024-11', order: 0, hasDetail: false, draft: false },
];

const meta = {
  title: 'Resume/AwardList',
  component: AwardList,
  parameters: { layout: 'padded' },
  args: { awards, detailHref: (a) => `/ko/awards/${a.slug}/` },
} satisfies Meta<typeof AwardList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

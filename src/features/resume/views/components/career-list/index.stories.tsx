import { CareerList } from '.';

import type { CareerSummary } from '../../../viewmodels';
import type { Meta, StoryObj } from '@storybook/react-vite';

const entries: CareerSummary[] = [
  {
    slug: 'now',
    role: '프론트엔드 엔지니어',
    org: '어딘가',
    start: '2025-03',
    summary: '디자인 시스템을 Base UI로 옮기고 빌드 시간을 절반으로 줄였습니다.',
    hasDetail: true,
    draft: false,
    links: { site: 'https://example.com' },
  },
  {
    slug: 'before',
    role: '인턴',
    org: '다른 곳',
    start: '2024-06',
    end: '2024-08',
    hasDetail: false,
    draft: false,
  },
];

const meta = {
  title: 'Resume/CareerList',
  component: CareerList,
  parameters: { layout: 'padded' },
  args: { entries, ongoingLabel: '현재', detailHref: (e) => `/ko/experience/${e.slug}/` },
} satisfies Meta<typeof CareerList>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 첫 항목은 본문이 있어 제목이 링크, 둘째는 아니다. */
export const Default: Story = {};

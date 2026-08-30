import { DetailHeader } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/Layout/DetailHeader',
  component: DetailHeader,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-3xl px-4">
        <Story />
      </div>
    ),
  ],
  args: { lang: 'ko', backHref: '/ko/blog', backLabel: '글 목록' },
} satisfies Meta<typeof DetailHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const English: Story = {
  args: { lang: 'en', backHref: '/en/blog', backLabel: 'All posts' },
};

/** 되돌아가기가 절대 배치라 라벨 길이가 로고 위치를 안 건드린다. */
export const LongLabel: Story = {
  args: { backLabel: '아주 긴 되돌아가기 라벨을 넣어도 로고는 가운데에 남는다' },
};

import { expect, within } from 'storybook/test';

import { WipNoticeIsland } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/Islands/WipNoticeIsland',
  component: WipNoticeIsland,
  parameters: { layout: 'fullscreen' },
  args: { lang: 'ko' },
} satisfies Meta<typeof WipNoticeIsland>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Korean: Story = {
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('개발 중입니다')).toBeVisible();
  },
};

export const English: Story = {
  args: { lang: 'en' },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('In development')).toBeVisible();
  },
};

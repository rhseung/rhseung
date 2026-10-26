import { expect, within } from 'storybook/test';

import { NotFoundIsland } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/Islands/NotFoundIsland',
  component: NotFoundIsland,
  parameters: { layout: 'fullscreen' },
  args: { lang: 'ko' },
} satisfies Meta<typeof NotFoundIsland>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Korean: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('link', { name: '홈으로' })).toHaveAttribute('href', '/ko/');
  },
};

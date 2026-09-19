import { WipNotice } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/WipNotice',
  component: WipNotice,
  parameters: { layout: 'fullscreen' },
  args: { lang: 'ko' },
} satisfies Meta<typeof WipNotice>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Korean: Story = {};

export const English: Story = { args: { lang: 'en' } };

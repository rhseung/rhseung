import { SiteFooter } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/SiteFooter',
  component: SiteFooter,
  parameters: { layout: 'fullscreen' },
  args: { lang: 'ko' },
} satisfies Meta<typeof SiteFooter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const English: Story = {
  args: { lang: 'en' },
};

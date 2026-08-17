import { SiteDock } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/SiteDock',
  component: SiteDock,
  parameters: { layout: 'fullscreen' },
  args: { lang: 'ko', altHref: '/en/' },
} satisfies Meta<typeof SiteDock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CurrentSection: Story = {
  args: { current: 'projects' },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  globals: { viewport: { value: 'mobile1' } },
};

export const WithoutAlternate: Story = {
  args: { altHref: undefined },
};

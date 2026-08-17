import { SiteHeader } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/SiteHeader',
  component: SiteHeader,
  parameters: { layout: 'fullscreen' },
  args: { lang: 'ko', altHref: '/en' },
} satisfies Meta<typeof SiteHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CurrentSection: Story = {
  args: { current: 'projects' },
};

export const English: Story = {
  args: { lang: 'en', altHref: '/' },
};

export const WithoutAlternate: Story = {
  args: { altHref: undefined },
};

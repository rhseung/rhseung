import { DocumentTextIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

import { LinkRow } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/LinkRow',
  component: LinkRow,
  parameters: { layout: 'padded' },
  args: {
    links: [
      { key: 'site', href: 'https://example.com/', label: '사이트', Icon: GlobeAltIcon },
      { key: 'paper', href: 'https://example.com/paper', label: '논문', Icon: DocumentTextIcon },
    ],
  },
} satisfies Meta<typeof LinkRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Inline: Story = {};

export const Buttons: Story = { args: { variant: 'button' } };

export const Empty: Story = { args: { links: [] } };

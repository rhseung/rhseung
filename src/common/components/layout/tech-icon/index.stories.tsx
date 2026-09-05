import { TECH_BY_NAME } from '@/content/skills';

import { TechIcon } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/TechIcon',
  component: TechIcon,
  parameters: { layout: 'centered' },
  args: { icon: TECH_BY_NAME.TypeScript.icon! },
} satisfies Meta<typeof TechIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InheritsColor: Story = {
  args: { icon: TECH_BY_NAME.Storybook.icon! },
  decorators: [
    (Story) => (
      <span className="text-[oklch(0.55_0.2_5)]">
        <Story />
      </span>
    ),
  ],
};

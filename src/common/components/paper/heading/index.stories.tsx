import { Paper } from '../paper';

import { PaperHeading } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/Paper/PaperHeading',
  component: PaperHeading,
  decorators: [
    (Story) => (
      <Paper>
        <Story />
        <p>절 번호는 CSS 카운터가 매긴다.</p>
      </Paper>
    ),
  ],
  args: { children: 'Differential calculus' },
} satisfies Meta<typeof PaperHeading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Section: Story = { args: { level: 2 } };

export const Subsection: Story = { args: { level: 3 } };

export const Minor: Story = { args: { level: 4 } };

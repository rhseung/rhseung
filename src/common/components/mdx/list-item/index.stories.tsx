import { Prose } from '../prose';

import { MdxListItem } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/MDX/MdxListItem',
  component: MdxListItem,
  decorators: [
    (Story) => (
      <Prose>
        <ul>
          <Story />
          <Story />
        </ul>
      </Prose>
    ),
  ],
  args: { children: '항목 하나' },
} satisfies Meta<typeof MdxListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

import { Prose } from '../prose';

import { MdxList } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/MDX/MdxList',
  component: MdxList,
  decorators: [
    (Story) => (
      <Prose>
        <Story />
      </Prose>
    ),
  ],
  args: {
    children: (
      <>
        <li>첫째 줄</li>
        <li>둘째 줄</li>
        <li>셋째 줄</li>
      </>
    ),
  },
} satisfies Meta<typeof MdxList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Ordered: Story = { args: { ordered: true } };

export const StartsAtThree: Story = { args: { ordered: true, start: 3 } };

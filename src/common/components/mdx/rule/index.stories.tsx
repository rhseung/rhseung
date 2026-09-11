import { Prose } from '../prose';

import { MdxRule } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/MDX/MdxRule',
  component: MdxRule,
  decorators: [
    (Story) => (
      <Prose>
        <p>위 문단.</p>
        <Story />
        <p>아래 문단.</p>
      </Prose>
    ),
  ],
} satisfies Meta<typeof MdxRule>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

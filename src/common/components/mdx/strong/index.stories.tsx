import { Prose } from '../prose';

import { MdxStrong } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/MDX/MdxStrong',
  component: MdxStrong,
  decorators: [
    (Story) => (
      <Prose>
        <p>
          커밋 하나에 <Story /> 를 담는다.
        </p>
      </Prose>
    ),
  ],
  args: { children: '변경 하나' },
} satisfies Meta<typeof MdxStrong>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

import { Prose } from '../prose';

import { MdxCode } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/MDX/MdxCode',
  component: MdxCode,
  decorators: [
    (Story) => (
      <Prose>
        <p>
          설정은 <Story /> 에 있다.
        </p>
      </Prose>
    ),
  ],
  args: { children: 'panda.config.ts' },
} satisfies Meta<typeof MdxCode>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

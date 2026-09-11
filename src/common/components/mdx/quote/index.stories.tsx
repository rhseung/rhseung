import { Prose } from '../prose';

import { MdxQuote } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/MDX/MdxQuote',
  component: MdxQuote,
  decorators: [
    (Story) => (
      <Prose>
        <Story />
      </Prose>
    ),
  ],
  args: {
    children: <p>쓸데없는 주석도 너무 많고, 인프라도 땜빵인 느낌.</p>,
  },
} satisfies Meta<typeof MdxQuote>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Multiple: Story = {
  args: {
    children: (
      <>
        <p>첫 문단.</p>
        <p>둘째 문단은 위와 좁게 붙는다.</p>
      </>
    ),
  },
};

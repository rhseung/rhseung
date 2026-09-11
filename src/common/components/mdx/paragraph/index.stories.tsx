import { Prose } from '../prose';

import { MdxParagraph } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/MDX/MdxParagraph',
  component: MdxParagraph,
  decorators: [
    (Story) => (
      <Prose>
        <Story />
      </Prose>
    ),
  ],
  args: {
    children:
      '블로그를 새로 깔면 제일 먼저 하는 일이 이거다. 글 하나를 만들어서 쓸 수 있는 걸 전부 넣어보고, 뭐가 깨지는지 본다.',
  },
} satisfies Meta<typeof MdxParagraph>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

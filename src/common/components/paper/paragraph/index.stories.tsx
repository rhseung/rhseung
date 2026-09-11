import { Paper } from '../paper';

import { PaperParagraph } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/Paper/PaperParagraph',
  component: PaperParagraph,
  decorators: [
    (Story) => (
      <Paper>
        <Story />
        <Story />
      </Paper>
    ),
  ],
  args: {
    children:
      '이어지는 문단은 첫 줄을 들여쓰고 위 문단과 붙는다. 논문 조판의 관례라 웹 본문과 다르다.',
  },
} satisfies Meta<typeof PaperParagraph>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

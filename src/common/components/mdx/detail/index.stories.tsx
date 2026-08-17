import { Detail } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/MDX/Detail',
  component: Detail,
  args: {
    summary: '왜 브라우저 인쇄 대화상자를 안 쓰나',
    children:
      '기본값이 머리말·꼬리말(URL·날짜·쪽번호)을 찍고 배경색을 끈다. 사용자가 옵션을 안 만지면 지저분한 PDF 가 나온다.',
  },
} satisfies Meta<typeof Detail>;

export default meta;

export const Default: StoryObj<typeof meta> = {};

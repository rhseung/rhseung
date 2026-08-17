import { Decision } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/MDX/Decision',
  component: Decision,
  args: {
    title: '언어를 어디에 둘 것인가',
    chose: 'URL 접두사 (/ko/, /en/)',
    insteadOf: '클라이언트 i18n.changeLanguage() 토글',
    children:
      '정적 사이트에서 런타임 전환은 사실상 단일언어다. 크롤러가 보는 HTML 이 한 벌뿐이라 hreflang 도 언어별 canonical 도 만들 수 없다.',
  },
} satisfies Meta<typeof Decision>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutAlternative: Story = { args: { insteadOf: undefined } };

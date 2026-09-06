import { fromHtml } from 'hast-util-from-html';

import { Prose } from '@/common/components';

import { PaperContent } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const hast = fromHtml(
  [
    '<div class="environment abstract">반복 횟수 하나가 재료의 강성을 바꿔 놓는다.</div>',
    '<h2>Setup</h2>',
    '<p>제약 <span class="inline-math">C(x)</span> 를 투영한다. 자세한 유도는 ',
    '<a class="citation" href="#ref-muller2007">(Müller et al., 2007)</a> 에 있다.</p>',
    '<div class="display-math">k&#39; = 1 - (1 - k)<sup>n</sup></div>',
  ].join(''),
  { fragment: true },
);

const meta = {
  title: 'Research/PaperContent',
  component: PaperContent,
  parameters: { layout: 'padded' },
  args: { hast, lang: 'ko' },
  decorators: [
    (Story) => (
      <Prose layout="paper">
        <Story />
      </Prose>
    ),
  ],
} satisfies Meta<typeof PaperContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

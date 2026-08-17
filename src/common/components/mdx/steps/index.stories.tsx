import { Step, Steps } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/MDX/Steps',
  component: Steps,
  args: {
    children: (
      <>
        <Step index={1} title="스키마를 고친다">
          `features/*/models` 의 zod 정의를 바꾼다.
        </Step>
        <Step index={2} title="콘텐츠 스토어를 지운다">
          `.astro` 와 `node_modules/.astro` 를 **둘 다** 지운다. 하나만 지우면 그대로 재현된다.
        </Step>
        <Step index={3} title="다시 띄운다">
          캐시가 파일 내용으로만 갱신 여부를 정해서, 스키마만 바꾼 엔트리는 옛 모양이 남는다.
        </Step>
      </>
    ),
  },
} satisfies Meta<typeof Steps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

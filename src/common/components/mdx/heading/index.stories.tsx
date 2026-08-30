import { MdxHeading } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/MDX/MdxHeading',
  component: MdxHeading,
  decorators: [
    (Story) => (
      <div className="prose prose-zinc dark:prose-invert">
        <Story />
        <p>제목에 마우스를 올리면 오른쪽에 앵커 표시가 나온다.</p>
      </div>
    ),
  ],
  args: { id: 'gicho-program-seolchi', children: '기초 프로그램 설치' },
} satisfies Meta<typeof MdxHeading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Level1: Story = { args: { level: 1 } };

export const Level2: Story = { args: { level: 2 } };

export const Level3: Story = { args: { level: 3 } };

export const Level4: Story = { args: { level: 4 } };

export const Level5: Story = { args: { level: 5 } };

export const Level6: Story = { args: { level: 6 } };

/** 제목 안에 링크가 있어도 앵커와 겹치지 않는다. */
export const WithInnerLink: Story = {
  args: {
    level: 2,
    children: (
      <>
        제목에 <a href="/ko/blog/">링크</a>를 넣으면
      </>
    ),
  },
};

/** 슬러그를 못 만든 제목은 앵커가 붙지 않는다. */
export const WithoutId: Story = { args: { level: 2, id: undefined } };

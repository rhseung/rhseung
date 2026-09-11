import { paperComponents } from '../components';

import { Paper } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const { h2: H2, h3: H3, a: A, p: P } = paperComponents('ko');

const meta = {
  title: 'Common/Paper/Paper',
  component: Paper,
  parameters: { layout: 'padded' },
  args: {
    children: (
      <>
        <div className="environment abstract">반복 횟수 하나가 재료의 강성을 바꿔 놓는다.</div>
        <H2>Setup</H2>
        <P>
          제약 <span className="inline-math">C(x)</span> 를 투영한다. 자세한 유도는{' '}
          <A className="citation" href="#ref-muller2007">
            (Müller et al., 2007)
          </A>{' '}
          에 있다.
        </P>
        <P>이어지는 문단은 들여쓴다.</P>
        <H3>Iteration</H3>
        <div className="display-math">k&#39; = 1 - (1 - k)^n</div>
      </>
    ),
  },
} satisfies Meta<typeof Paper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

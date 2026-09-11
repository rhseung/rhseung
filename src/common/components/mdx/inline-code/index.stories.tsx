import { mdxComponents } from '../components';
import { Prose } from '../prose';

import { MdxCode } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const { h2: H2, a: A, p: P } = mdxComponents('ko');

const meta = {
  title: 'Common/MDX/MdxCode',
  component: MdxCode,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <Prose>
        <P>
          설정은 <Story /> 에 있다.
        </P>
      </Prose>
    ),
  ],
  args: { children: 'panda.config.ts' },
} satisfies Meta<typeof MdxCode>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InHeading: Story = {
  decorators: [
    (Story) => (
      <Prose>
        <H2>
          <Story /> 를 고친다
        </H2>
        <P>제목 안에서는 제목 크기를 따라간다.</P>
      </Prose>
    ),
  ],
};

export const InLink: Story = {
  decorators: [
    (Story) => (
      <Prose>
        <P>
          <A href="/ko/blog/">
            <Story />
          </A>{' '}
          링크 안에서도 읽힌다.
        </P>
      </Prose>
    ),
  ],
};

export const Wrapping: Story = {
  args: {
    children: 'astro dev stop && rm -rf .astro node_modules/.astro dist && bun run dev',
  },
};

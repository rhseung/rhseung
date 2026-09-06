import { css } from 'styled-system/css';

import { Prose } from '../prose';

import { MdxTable } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/MDX/MdxTable',
  component: MdxTable,
  decorators: [
    (Story) => (
      <Prose className={css({ maxW: 'md' })}>
        <Story />
      </Prose>
    ),
  ],
} satisfies Meta<typeof MdxTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <thead>
          <tr>
            <th>컬렉션</th>
            <th>원본</th>
            <th>언어 처리</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>posts</td>
            <td>content/posts/*.mdx</td>
            <td>frontmatter lang</td>
          </tr>
          <tr>
            <td>projects</td>
            <td>content/projects/**</td>
            <td>디렉토리로 분리</td>
          </tr>
        </tbody>
      </>
    ),
  },
};

export const Wide: Story = {
  args: {
    children: (
      <>
        <thead>
          <tr>
            {['키', '맥', '윈도우', '리눅스', '비고', '추가', '더', '또'].map((head) => (
              <th key={head}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {['팔레트', '⌘⇧P', 'Ctrl+Shift+P', 'Ctrl+Shift+P', '전부 같다', 'a', 'b', 'c'].map(
              (cell, index) => (
                <td key={index}>{cell}</td>
              ),
            )}
          </tr>
        </tbody>
      </>
    ),
  },
};

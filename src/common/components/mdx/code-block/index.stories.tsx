import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { Prose } from '../prose';

import { CodeBlock } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const writeText = fn();

const shikiTheme = {
  '--shiki-light': '#565869',
  '--shiki-light-bg': '#fafbfc',
  '--shiki-dark': '#a9b1d6',
  '--shiki-dark-bg': '#1a1b26',
} as React.CSSProperties;

const meta = {
  title: 'Common/MDX/CodeBlock',
  component: CodeBlock,
  decorators: [
    (Story) => (
      <Prose>
        <Story />
      </Prose>
    ),
  ],
  args: {
    copyLabel: '코드 복사',
    copiedLabel: '복사함',
    style: shikiTheme,
    'data-language': 'zsh',
    children: <code>bun run dev</code>,
  },
} satisfies Meta<typeof CodeBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Multiline: Story = {
  args: {
    children: (
      <code>{'astro dev stop\nrm -rf .astro node_modules/.astro dist\nbun run dev\n'}</code>
    ),
  },
};

export const WithoutLanguage: Story = { args: { 'data-language': 'plaintext' } };

export const Copied: Story = {
  beforeEach: () => {
    const clipboard = navigator.clipboard;

    writeText.mockClear();
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });

    return () => {
      Object.defineProperty(navigator, 'clipboard', { value: clipboard, configurable: true });
    };
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: '코드 복사' }));

    await expect(writeText).toHaveBeenCalledWith('bun run dev');
    await waitFor(() => expect(canvas.getByRole('button', { name: '복사함' })).toBeVisible());
  },
};

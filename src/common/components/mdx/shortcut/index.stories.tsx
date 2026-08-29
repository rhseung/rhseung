import { Shortcut } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/MDX/Shortcut',
  component: Shortcut,
  args: { keys: ['cmd', 'shift', 'p'] },
} satisfies Meta<typeof Shortcut>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleKey: Story = { args: { keys: ['esc'] } };

export const Unmapped: Story = { args: { keys: ['ctrl', 'K'] } };

export const Windows: Story = { args: { keys: ['win', 'alt', 'pageup'] } };

export const AllSymbols: Story = {
  args: { keys: [] },
  render: () => (
    <div className="flex flex-wrap gap-3">
      {[
        'cmd',
        'opt',
        'ctrl',
        'shift',
        'caps',
        'fn',
        'enter',
        'tab',
        'backtab',
        'backspace',
        'del',
        'esc',
        'space',
        'up',
        'down',
        'left',
        'right',
        'pageup',
        'pagedown',
        'home',
        'end',
        'eject',
        'win',
      ].map((key) => (
        <span key={key} className="text-muted-foreground flex items-center gap-1.5 text-xs">
          <Shortcut keys={[key]} />
          {key}
        </span>
      ))}
    </div>
  ),
};

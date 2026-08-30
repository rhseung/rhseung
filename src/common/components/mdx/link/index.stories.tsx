import { MdxLink } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/MDX/MdxLink',
  component: MdxLink,
  decorators: [
    (Story) => (
      <div className="prose prose-zinc dark:prose-invert">
        <p>
          문단 가운데에서 <Story /> 처럼 흐른다.
        </p>
      </div>
    ),
  ],
  args: { children: 'Magnet' },
} satisfies Meta<typeof MdxLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const External: Story = { args: { href: 'https://magnet.crowdcafe.com' } };

export const Internal: Story = { args: { href: '/ko/blog/', children: '글 목록' } };

export const Anchor: Story = { args: { href: '#footnote-1', children: '각주로' } };

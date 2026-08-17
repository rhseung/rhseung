import { Figure } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/MDX/Figure',
  component: Figure,
  args: {
    caption: '빌드 결과물에서 본문이 template 안에 갇힌 모습',
    children: (
      <pre className="bg-muted rounded-md p-4 text-xs">
        <code>
          {'<astro-island ssr>\n  <template data-astro-template>…</template>\n</astro-island>'}
        </code>
      </pre>
    ),
  },
} satisfies Meta<typeof Figure>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

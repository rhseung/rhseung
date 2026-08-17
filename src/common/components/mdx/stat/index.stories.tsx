import { Stat, Stats } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/MDX/Stats',
  component: Stats,
  args: {
    children: (
      <>
        <Stat value="852KB → 400KB" label="페이지당 클라이언트 JS" />
        <Stat value="14" label="빌드되는 페이지" />
        <Stat value="0" label="런타임 네트워크 요청" />
      </>
    ),
  },
} satisfies Meta<typeof Stats>;

export default meta;

export const Default: StoryObj<typeof meta> = {};

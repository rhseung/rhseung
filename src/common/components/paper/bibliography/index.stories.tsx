import { PaperBibliography } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/Paper/PaperBibliography',
  component: PaperBibliography,
  parameters: { layout: 'padded' },
  args: {
    children: (
      <>
        <div className="csl-entry">
          Apostol, T. M. (1969). <i>Calculus, Vol. 2</i> (2nd ed.). Wiley.
        </div>
        <div className="csl-entry">
          Strang, G. (2016). <i>Introduction to Linear Algebra</i> (5th ed.). Wellesley-Cambridge
          Press.
        </div>
      </>
    ),
  },
} satisfies Meta<typeof PaperBibliography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

import { fromHtml } from 'hast-util-from-html';

import { PaperPage } from './paper-page';
import { PaperContent } from '../components';

import type { Research } from '../../viewmodels';
import type { Meta, StoryObj } from '@storybook/react-vite';

const item: Research = {
  slug: 'sample-paper',
  kind: 'paper',
  start: { year: 2026, month: 3 },
  end: { year: 2026, month: 8 },
  title: '제약 기반 물리 엔진의 수렴 특성 분석',
  org: 'GIST',
  role: '제1저자',
  summary: '반복 횟수와 강성이 어떻게 얽히는지 잰다.',
  links: { paper: 'https://example.com/paper.pdf', repo: 'https://example.com/repo' },
};

const body = (
  <PaperContent
    lang="ko"
    hast={fromHtml(
      [
        '<div class="environment abstract">반복 횟수 하나가 재료의 강성을 바꿔 놓는다.</div>',
        '<h2>Setup</h2>',
        '<p>제약 <span class="inline-math">C(x)</span> 를 투영한다. 자세한 유도는 ',
        '<a class="citation" href="#ref-muller2007">(Müller et al., 2007)</a> 에 있다.</p>',
        '<div class="display-math">k&#39; = 1 - (1 - k)<sup>n</sup></div>',
      ].join(''),
      { fragment: true },
    )}
  />
);

const bibliography = (
  <PaperContent
    lang="ko"
    hast={fromHtml(
      '<div class="csl-bib-body"><div id="ref-muller2007" class="csl-entry">' +
        'Müller, M., Heidelberger, B., Hennix, M., &amp; Ratcliff, J. (2007). Position Based ' +
        'Dynamics. <i>Journal of Visual Communication and Image Representation</i>, 109–118.' +
        '</div></div>',
      { fragment: true },
    )}
  />
);

const meta = {
  title: 'Research/Pages/PaperPage',
  component: PaperPage,
  parameters: { layout: 'fullscreen' },
  args: {
    lang: 'ko',
    item,
    authors: 'Hyunseung Ryu',
    bibtex: '@article{muller2007, title = {Position Based Dynamics}}',
    children: body,
    bibliography,
  },
} satisfies Meta<typeof PaperPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutBibliography: Story = { args: { bibliography: undefined, bibtex: undefined } };

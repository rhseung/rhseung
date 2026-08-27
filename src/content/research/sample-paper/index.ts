import { defineResearch } from '@/features/research/models/define';

export default defineResearch({
  slug: 'sample-paper',
  kind: 'paper',
  start: { year: 2026, month: 3 },
  end: { year: 2026, month: 8 },
  links: {
    paper: 'https://arxiv.org/abs/0000.00000',
    repo: 'https://github.com/rhseung',
  },
  ko: {
    title: '[예시] 다변수 미적분·선형대수 공식 모음',
    org: 'GIST',
    role: '제1저자',
    summary:
      '레이아웃 확인용 더미 항목이다. 실제 연구를 채우면 지운다. 수식·행렬·인용 렌더링을 확인하려고 기초 공식만 모아뒀다.',
  },
  en: {
    title: '[Sample] A Compendium of Elementary Multivariable Calculus and Linear Algebra',
    org: 'GIST',
    role: 'First author',
    summary:
      'Dummy entry for checking the layout. Delete it once real work lands. Packs in basic formulas just to exercise equation, matrix, and citation rendering.',
  },
});

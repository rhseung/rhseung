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
    title: '[예시] 제약 기반 물리 엔진의 수렴 특성 분석',
    org: 'GIST',
    role: '제1저자',
    summary:
      '레이아웃 확인용 더미 항목이다. 실제 연구를 채우면 지운다. 위치 기반 동역학의 반복 횟수와 강성 사이의 관계를 다룬다.',
  },
  en: {
    title: '[Sample] Convergence Behavior of Constraint-Based Physics Engines',
    org: 'GIST',
    role: 'First author',
    summary:
      'Dummy entry for checking the layout. Delete it once real work lands. Studies how iteration count trades against stiffness in position-based dynamics.',
  },
});

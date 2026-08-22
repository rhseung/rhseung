import { defineProject } from '@/features/projects/models/define';

export default defineProject({
  slug: 'siunits',
  stack: ['Python'],
  start: { year: 2023, month: 12 },
  status: 'active',
  links: {
    repo: 'https://github.com/rhseung/siunits',
    package: 'https://pypi.org/project/rhseung.units/',
  },
  ko: {
    title: 'siunits',
    summary: '물리 실험용 단위 계산 라이브러리. 차원이 맞지 않는 연산을 타입 수준에서 막는다.',
  },
  en: {
    title: 'siunits',
    summary:
      'A unit-arithmetic library for physics experiments. Dimensionally invalid operations fail at the type level.',
  },
});

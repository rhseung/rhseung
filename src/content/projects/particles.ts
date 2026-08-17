import { defineProject } from '@/features/projects/models/define';

export default defineProject({
  slug: 'particles',
  domain: 'graphics',
  stack: ['C++'],
  start: '2024-03',
  end: '2024-11',
  status: 'shipped',
  links: {
    repo: 'https://github.com/rhseung/particles',
  },
  ko: {
    title: 'Particles',
    summary:
      'Constraint 기반으로 설계한 2D 물리엔진. 위치 기반 동역학으로 강체와 연결 구조를 푼다.',
  },
  en: {
    title: 'Particles',
    summary:
      'A constraint-based 2D physics engine. Position-based dynamics solve rigid bodies and joints.',
  },
});

import { defineProject } from '@/features/projects/models/define';

export default defineProject({
  slug: 'neat',
  domain: 'systems',
  stack: ['Java', 'Swing'],
  start: { year: 2024, month: 9 },
  status: 'active',
  links: {
    repo: 'https://github.com/gsa-projects/artificial-aquarium',
  },
  ko: {
    title: 'NEAT',
    summary: 'NEAT(NeuroEvolution of Augmenting Topologies)로 신경망 구조 자체를 진화시키는 실험.',
  },
  en: {
    title: 'NEAT',
    summary:
      'Evolving network topology itself with NEAT (NeuroEvolution of Augmenting Topologies).',
  },
});

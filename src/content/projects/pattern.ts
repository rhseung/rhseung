import { defineProject } from '@/features/projects/models/define';

export default defineProject({
  slug: 'pattern',
  domain: 'systems',
  stack: ['npm', 'TypeScript'],
  start: '2024-02',
  end: '2024-05',
  status: 'shipped',
  links: {
    repo: 'https://github.com/essentialib/pattern',
    package: 'https://www.npmjs.com/package/@essentialib/pattern',
  },
  ko: {
    title: 'Pattern',
    summary:
      '정규표현식을 빌더 패턴으로 조립하는 라이브러리. 읽기 어려운 표현식 대신 메서드 체인으로 쓴다.',
  },
  en: {
    title: 'Pattern',
    summary:
      'Builds regular expressions through a builder API — method chains instead of unreadable expressions.',
  },
});

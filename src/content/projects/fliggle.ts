import { defineProject } from '@/features/projects/models/define';

export default defineProject({
  slug: 'fliggle',
  domain: 'web',
  stack: ['Dart', 'Flutter', 'Nest.js', 'Prisma', 'Figma'],
  start: { year: 2024, month: 5 },
  end: { year: 2024, month: 7 },
  status: 'shipped',
  links: {
    repo: 'https://github.com/rhseung/toonflix-fe',
  },
  ko: {
    title: 'Fliggle',
    summary: '연습으로 만든 SNS 앱. 프론트엔드와 백엔드를 모두 직접 구현했다.',
  },
  en: {
    title: 'Fliggle',
    summary:
      'A social app built for practice, with both the frontend and the backend written from scratch.',
  },
});

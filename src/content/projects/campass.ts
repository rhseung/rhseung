import { defineProject } from '@/features/projects/models/define';

export default defineProject({
  slug: 'campass',
  domain: 'web',
  stack: ['React', 'Tailwind CSS', 'TanStack Router', 'Vite', 'Bun', 'TypeScript'],
  start: { year: 2024, month: 11 },
  end: { year: 2024, month: 11 },
  status: 'shipped',
  links: {
    demo: 'https://campass-fe.vercel.app/',
  },
  ko: {
    title: 'Campass',
    summary: '학교 생활에 필요한 정보를 한곳에 모은 도우미 서비스.',
  },
  en: {
    title: 'Campass',
    summary: 'A companion service that gathers everything you need for campus life in one place.',
  },
});

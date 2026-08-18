import { yearMonth } from '@/common/lib';
import { defineProject } from '@/features/projects/models/define';

export default defineProject({
  slug: 'datetime',
  domain: 'systems',
  stack: ['npm', 'TypeScript'],
  start: yearMonth({ year: 2024, month: 1 }),
  end: yearMonth({ year: 2024, month: 4 }),
  status: 'shipped',
  links: {
    repo: 'https://github.com/essentialib/datetime',
    package: 'https://www.npmjs.com/package/@essentialib/datetime',
  },
  ko: {
    title: 'DateTime',
    summary: '다음 주 화요일" 같은 자연어 표현을 날짜로 파싱하는 라이브러리.',
  },
  en: {
    title: 'DateTime',
    summary: 'Parses natural-language expressions like "next Tuesday" into dates.',
  },
});

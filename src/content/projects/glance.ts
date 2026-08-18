import { yearMonth } from '@/common/lib';
import { defineProject } from '@/features/projects/models/define';

export default defineProject({
  slug: 'glance',
  domain: 'systems',
  stack: ['Java', 'Kotlin'],
  start: yearMonth({ year: 2024, month: 6 }),
  status: 'active',
  links: {
    repo: 'https://github.com/rhseung-mods/glance',
    package: 'https://modrinth.com/mod/glance',
  },
  ko: {
    title: 'Glance',
    summary: '마인크래프트 인터페이스 개선 모드. 여러 편의 기능을 하나로 묶었다.',
  },
  en: {
    title: 'Glance',
    summary: 'A Minecraft interface mod bundling a set of quality-of-life tweaks.',
  },
});

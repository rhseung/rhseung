import { defineProject } from '@/features/projects/models/define';

export default defineProject({
  slug: 'gsa-bot',
  domain: 'backend',
  stack: ['Node.js', 'npm', 'TypeScript', 'JavaScript'],
  start: '2023-09',
  end: '2024-02',
  status: 'active',
  links: {
    repo: 'https://github.com/GSAStudentCouncil/gsa-bot',
  },
  ko: {
    title: 'GSA 카톡봇',
    summary: '급식·시간표·학사일정을 카카오톡에서 바로 확인하는 광주과학고 전용 봇.',
  },
  en: {
    title: 'GSA KakaoTalk bot',
    summary:
      'A KakaoTalk bot for Gwangju Science Academy — meals, timetables and the academic calendar without leaving the chat.',
  },
});

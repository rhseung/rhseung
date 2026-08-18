import { defineAward } from '@/features/career/models/define';

export default defineAward({
  slug: 'ai-convergence-contest',
  date: { year: 2025 },
  order: 8,
  ko: {
    title: 'AI 창의융합경진대회 참가',
    issuer: 'GIST AI융합학과',
    summary: '탁구로봇 트랙',
  },
  en: {
    title: 'Participant, AI Creative Convergence Competition',
    issuer: 'GIST AI Graduate School',
    summary: 'Table-tennis robot track',
  },
});

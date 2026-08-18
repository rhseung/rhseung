import pingpong from '@/content/projects/pingpong';
import { defineAward } from '@/features/career/models/define';

export default defineAward({
  slug: 'ax-challenge-2026',
  date: { year: 2026, month: 8 },
  project: pingpong.slug,
  ko: {
    title: '2026 AX Challenge Track 1 3위',
    summary: '탁구로봇 트랙 · 2026.06 – 2026.08',
  },
  en: {
    title: '3rd place, 2026 AX Challenge Track 1',
    summary: 'Table-tennis robot track · Jun – Aug 2026',
  },
});

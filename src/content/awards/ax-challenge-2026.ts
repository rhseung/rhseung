import { defineAward } from '@/features/career/model/define';

export default defineAward({
  slug: 'ax-challenge-2026',
  date: { year: 2026, month: 8 },
  ko: {
    title: '제10회 GIST 창의융합 AX-Challenge 트랙1 Robot AX 우수상',
    issuer: 'GIST AI학과',
    summary: '팀 Love All · 탁구 로봇의 실시간 공 추적과 궤적 예측',
  },
  en: {
    title: 'Excellence Award, Track 1 Robot AX, 10th GIST Creative Convergence AX-Challenge',
    issuer: 'Department of AI Convergence, GIST',
    summary:
      'Team Love All · real-time ball tracking and trajectory prediction for a table-tennis robot',
  },
});

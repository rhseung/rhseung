import { yearMonth } from '@/common/lib';
import { defineProject } from '@/features/projects/models/define';

export default defineProject({
  slug: 'pingpong',
  domain: 'graphics',
  stack: ['C++'],
  start: yearMonth({ year: 2024, month: 10 }),
  end: yearMonth({ year: 2025, month: 1 }),
  status: 'shipped',
  links: {
    repo: 'https://github.com/studio-void/hinguri-pingpong',
  },
  ko: {
    title: '탁구 로봇',
    summary:
      '컴퓨터 비전으로 공의 실시간 위치를 추적하고 타격 지점을 예측해 4축 선형 탁구로봇을 제어한다.',
  },
  en: {
    title: 'Table-tennis robot',
    summary:
      'Computer vision tracks the ball in real time and predicts the strike point to drive a four-axis linear robot.',
  },
});

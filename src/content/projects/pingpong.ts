import axChallenge from '@/content/awards/ax-challenge-2026';
import { defineProject } from '@/features/projects/model/define';

export default defineProject({
  slug: 'pingpong',
  stack: ['Rust', 'OpenCV'],
  start: { year: 2026, month: 6 },
  end: { year: 2026, month: 8 },
  awards: [axChallenge.slug],
  status: 'shipped',
  category: 'graphics',
  links: {
    repo: 'https://github.com/luv-all/pingpong-bot',
  },
  ko: {
    title: '탁구 로봇',
    summary:
      '두 카메라로 공의 궤적을 예측해 받아치는 4자유도 로봇 팔. 4인 팀에서 카메라 보정, 공 검출, 궤적 예측과 Rapier 기반 디지털 트윈 시뮬레이터를 맡았고, 전체 관측 일괄 적합으로 타점 오차를 24.5cm에서 2.9cm로 줄였다.',
  },
  en: {
    title: 'Table-tennis robot',
    summary:
      'A 4-DoF arm returning balls from a two-camera trajectory prediction. On a team of four I owned calibration, detection, prediction and a Rapier digital twin, cutting strike error from 24.5 to 2.9 cm.',
  },
});

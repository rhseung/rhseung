import { defineProject } from '@/features/projects/model/define';

export default defineProject({
  slug: 'renderer',
  stack: ['C++', 'OpenGL', 'GLSL'],
  start: { year: 2026, month: 3 },
  end: { year: 2026, month: 6 },
  status: 'shipped',
  ko: {
    title: '컴퓨터 그래픽스 렌더러',
    summary:
      'OpenGL 실시간 렌더링부터 Whitted 레이 트레이싱, NEE를 갖춘 패스 트레이싱까지 원리부터 직접 구현한 C++ 렌더러. 컴퓨터 그래픽스(EC4215) 수업 이론을 직접 검증했다.',
    highlight: 'Octree로 레이 트레이싱 96.56배, 패스 트레이싱 17.54배 가속',
  },
  en: {
    title: 'Computer graphics renderer',
    summary:
      'A C++ renderer built from first principles: OpenGL real-time rendering, a Whitted ray tracer and a path tracer with next-event estimation, verifying the theory from GIST Computer Graphics (EC4215).',
    highlight: 'An octree sped up ray tracing 96.56x and path tracing 17.54x',
  },
});

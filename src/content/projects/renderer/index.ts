import { defineProject } from '@/features/projects/model/define';

import cover from './cover.webp?url';

export default defineProject({
  slug: 'renderer',
  stack: ['C++', 'OpenGL', 'GLSL'],
  start: { year: 2026, month: 3 },
  end: { year: 2026, month: 6 },
  status: 'shipped',
  category: 'graphics',
  cover,
  ko: {
    title: '컴퓨터 그래픽스 렌더러',
    coverAlt: '패스 트레이싱으로 렌더링한 코넬 박스 속 유리 구와 거울 구',
    summary:
      'OpenGL 실시간 렌더링부터 Whitted 레이 트레이싱, NEE를 갖춘 패스 트레이싱까지 원리부터 직접 구현한 C++ 렌더러. Octree로 레이 트레이싱을 96.56배, 패스 트레이싱을 17.54배 빠르게 했다.',
  },
  en: {
    title: 'Computer graphics renderer',
    coverAlt: 'A path-traced Cornell box with a glass sphere and a mirror sphere',
    summary:
      'A C++ renderer built from first principles: OpenGL real-time rendering, a Whitted ray tracer and a path tracer with next-event estimation. An octree sped up ray tracing 96.56x and path tracing 17.54x.',
  },
});

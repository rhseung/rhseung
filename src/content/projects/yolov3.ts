import { defineProject } from '@/features/projects/models/define';

export default defineProject({
  slug: 'yolov3',
  stack: ['Python', 'PyTorch'],
  start: { year: 2023, month: 3 },
  end: { year: 2023, month: 11 },
  status: 'shipped',
  links: {
    repo: 'https://github.com/gsa-projects/2023-rne',
  },
  ko: {
    title: 'YOLOv3 재구현',
    summary:
      '논문만 보고 YOLOv3를 처음부터 다시 구현했다. 앵커 박스와 다중 스케일 검출까지 직접 짰다.',
  },
  en: {
    title: 'YOLOv3 from scratch',
    summary:
      'Reimplemented YOLOv3 from the paper alone — anchor boxes and multi-scale detection included.',
  },
});

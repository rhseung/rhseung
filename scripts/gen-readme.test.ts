import { describe, expect, it } from 'vitest';

import { renderTech } from './gen-readme';

const tech = renderTech();

describe('renderTech', () => {
  it('라벨을 shields 규칙으로 이스케이프한다', () => {
    expect(tech).toContain('badge/styled--components-DB7093');
    expect(tech).toContain('badge/TanStack_Start-39AF46');
  });

  // 임계값이 흔들리면 밝은 바탕에 흰 로고가 얹혀 안 보인다. 양쪽에서 가장 가까운 둘.
  it('바탕이 밝으면 로고를 검게 둔다', () => {
    expect(tech).toContain('badge/C-A8B9CC?style=for-the-badge&logo=c&logoColor=black');
    expect(tech).toContain('logo=tailwindcss&logoColor=white');
  });

  // simple-icons 에서 빠진 기술이다. `logo=` 를 붙이면 shields 가 빈 배지를 낸다.
  it('아이콘이 없으면 logo 파라미터를 안 붙인다', () => {
    expect(tech).toContain('badge/Slack-4A154B?style=for-the-badge)');
    expect(tech).not.toContain('logo=slack');
  });

  it('그룹을 order 순으로 낸다', () => {
    const headings = [...tech.matchAll(/^\*\*(.+)\*\*$/gm)].map(([, name]) => name);

    expect(headings).toEqual([
      'Languages',
      'Web Frontend',
      'Mobile Frontend',
      'Backend',
      'Tools',
      'MLDL',
    ]);
  });
});

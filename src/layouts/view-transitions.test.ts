import { describe, expect, it } from 'vitest';

import { dockCurrent, dockTarget, relate } from './view-transitions';

function render(html: string) {
  const root = document.createElement('div');

  root.innerHTML = html;

  return root;
}

const BAR = render(`
  <div data-vt-dock data-dock-current="3">
    <a href="/ko/" data-dock-index="0"><svg></svg></a>
    <a href="/ko/projects/" data-dock-index="1"><svg></svg></a>
    <a href="/en/blog/" hreflang="en"><svg></svg></a>
  </div>
`);

describe('relate', () => {
  it('자식으로 들어가면 forward 이고 들어가는 슬러그를 짝짓는다', () => {
    expect(relate('/ko/blog/', '/ko/blog/hello/', 3)).toEqual(['forward', 'hello']);
  });

  it('부모로 나오면 back 이고 떠나는 슬러그를 짝짓는다', () => {
    expect(relate('/ko/blog/hello/', '/ko/blog/', 3, 3)).toEqual(['back', 'hello']);
  });

  it('독에서 오른쪽에 있는 자리로 가면 forward 다', () => {
    expect(relate('/ko/projects/', '/ko/career/', 1, 4)).toEqual(['forward', undefined]);
  });

  it('독에서 왼쪽에 있는 자리로 가면 back 이다', () => {
    expect(relate('/ko/career/', '/ko/projects/', 4, 1)).toEqual(['back', undefined]);
  });

  it('상세 페이지에서 떠나도 독이 알려준 현재 자리로 방향을 정한다', () => {
    expect(relate('/ko/blog/hello/', '/ko/projects/', 3, 1)).toEqual(['back', undefined]);
  });

  it('독에서 지금 있는 자리를 누르면 same 이라 슬라이드하지 않는다', () => {
    expect(relate('/ko/blog/', '/ko/blog/', 3, 3)).toEqual(['same', undefined]);
    expect(relate('/ko/', '/ko/', 0, 0)).toEqual(['same', undefined]);
  });

  it('뒤로 가기나 독 밖 링크처럼 자리를 모르면 Astro 가 history 로 정한 방향을 그대로 둔다', () => {
    expect(relate('/ko/blog/', '/ko/projects/', 3, undefined)).toEqual([undefined, undefined]);
    expect(relate('/ko/blog/', '/ko/projects/', undefined, 1)).toEqual([undefined, undefined]);
  });
});

describe('dockCurrent', () => {
  it('독이 표시한 현재 자리를 읽는다', () => {
    expect(dockCurrent(BAR)).toBe(3);
  });

  it('독이 없으면 undefined 다', () => {
    expect(dockCurrent(render('<nav></nav>'))).toBeUndefined();
  });
});

describe('dockTarget', () => {
  it('클릭된 아이콘에서 감싼 독 링크의 자리를 찾는다', () => {
    expect(dockTarget(BAR.querySelector('a[href="/ko/projects/"] svg') ?? undefined)).toBe(1);
  });

  it('자리를 안 가진 링크는 undefined 다', () => {
    expect(dockTarget(BAR.querySelector('a[hreflang="en"]') ?? undefined)).toBeUndefined();
    expect(dockTarget(undefined)).toBeUndefined();
  });
});

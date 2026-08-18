import { describe, expect, it } from 'vitest';

import {
  countByDomain,
  filterByDomain,
  pickPinned,
  projectHref,
  sortProjects,
} from './select-projects';

import type { Project } from '../models';

function project(overrides: Partial<Project> & { slug: string }): Project {
  return {
    title: overrides.slug,
    summary: '한 줄 요약',
    domain: 'web',
    stack: ['TypeScript'],
    start: { year: 2024, month: 1 },
    status: 'shipped',
    hasDetail: false,
    ...overrides,
  };
}

describe('sortProjects', () => {
  const projects = [
    project({ slug: 'old-pinned', start: { year: 2022, month: 1 }, pinned: true }),
    project({ slug: 'newest', start: { year: 2025, month: 6 } }),
    project({ slug: 'middle', start: { year: 2024, month: 3 } }),
  ];

  it('pinnedFirst면 pinned가 오래됐어도 앞에 온다', () => {
    expect(sortProjects(projects, { pinnedFirst: true }).map((p) => p.slug)).toEqual([
      'old-pinned',
      'newest',
      'middle',
    ]);
  });

  // 좁혀서 보는 사람에게 그 안에서까지 pinned를 앞세우면 순서를 설명할 방법이 없다.
  it('필터가 걸린 목록에서는 순수 최신순이다', () => {
    expect(sortProjects(projects, { pinnedFirst: false }).map((p) => p.slug)).toEqual([
      'newest',
      'middle',
      'old-pinned',
    ]);
  });

  it('입력 배열을 건드리지 않는다', () => {
    const input = [...projects];
    sortProjects(input, { pinnedFirst: true });

    expect(input.map((p) => p.slug)).toEqual(['old-pinned', 'newest', 'middle']);
  });
});

describe('filterByDomain', () => {
  const projects = [
    project({ slug: 'a', domain: 'web' }),
    project({ slug: 'b', domain: 'systems' }),
  ];

  it('null이면 전체', () => {
    expect(filterByDomain(projects, null)).toHaveLength(2);
  });

  it('도메인 하나로 좁힌다', () => {
    expect(filterByDomain(projects, 'systems').map((p) => p.slug)).toEqual(['b']);
  });
});

describe('pickPinned', () => {
  it('pinned만, 정렬된 채로, 개수만큼', () => {
    const projects = [
      project({ slug: 'p1', pinned: true, start: { year: 2023, month: 1 } }),
      project({ slug: 'not-pinned', start: { year: 2025, month: 1 } }),
      project({ slug: 'p2', pinned: true, start: { year: 2025, month: 5 } }),
    ];

    expect(pickPinned(projects, 1).map((p) => p.slug)).toEqual(['p2']);
  });
});

describe('countByDomain', () => {
  it('없는 도메인은 키가 아예 없다', () => {
    expect(
      countByDomain([project({ slug: 'a', domain: 'web' }), project({ slug: 'b', domain: 'web' })]),
    ).toEqual({ web: 2 });
  });
});

describe('projectHref', () => {
  it('본문이 있으면 상세로', () => {
    expect(projectHref(project({ slug: 'a', hasDetail: true }), '/ko/projects/a/')).toEqual({
      href: '/ko/projects/a/',
      external: false,
    });
  });

  // 프로젝트 대부분은 본문이 없다 — 카드가 바로 저장소로 보낸다.
  it('본문이 없으면 저장소로 나간다', () => {
    const target = projectHref(
      project({ slug: 'a', links: { repo: 'https://github.com/x/y' } }),
      '/ko/projects/a/',
    );

    expect(target).toEqual({ href: 'https://github.com/x/y', external: true });
  });

  it('저장소가 없으면 데모, 그다음 패키지 순서', () => {
    const target = projectHref(
      project({ slug: 'a', links: { demo: 'https://demo', package: 'https://pkg' } }),
      '/ko/projects/a/',
    );

    expect(target?.href).toBe('https://demo');
  });

  it('갈 데가 없으면 null — 제목이 링크가 아니게 된다', () => {
    expect(projectHref(project({ slug: 'a' }), '/ko/projects/a/')).toBeNull();
  });
});

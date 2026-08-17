import { describe, expect, it } from 'vitest';

import {
  countByDomain,
  filterByDomain,
  parseProjectId,
  pickPinned,
  projectHref,
  sortProjects,
  toProjectSummary,
} from './select-projects';

import type { ProjectSummary } from '../models';

function project(overrides: Partial<ProjectSummary> & { slug: string }): ProjectSummary {
  return {
    title: overrides.slug,
    summary: '한 줄 요약',
    domain: 'web',
    stack: ['typescript'],
    start: '2024-01',
    status: 'shipped',
    pinned: false,
    hasDetail: false,
    draft: false,
    ...overrides,
  };
}

describe('parseProjectId', () => {
  it('`<lang>/<slug>`를 가른다', () => {
    expect(parseProjectId('en/my-compiler')).toEqual({ lang: 'en', slug: 'my-compiler' });
  });

  // 캐스트로 넘기면 잘못 놓인 파일이 조용히 `/misc/foo` 라우트를 만든다.
  it.each(['my-compiler', 'misc/my-compiler', 'ko/', 'ko/nested/my-compiler'])(
    '잘못 놓인 파일에서 터진다: %s',
    (id) => {
      expect(() => parseProjectId(id)).toThrow(/src\/content\/projects/);
    },
  );
});

describe('toProjectSummary', () => {
  it('본문이 있으면 hasDetail', () => {
    const withBody = toProjectSummary({
      id: 'ko/a',
      data: project({ slug: 'a' }),
      body: '## 왜 만들었나\n\n내용',
    });
    const withoutBody = toProjectSummary({
      id: 'ko/b',
      data: project({ slug: 'b' }),
      body: '  \n',
    });

    expect(withBody.hasDetail).toBe(true);
    expect(withoutBody.hasDetail).toBe(false);
  });

  it('언어 디렉토리를 떼서 슬러그를 만든다', () => {
    const summary = toProjectSummary({
      id: 'en/my-compiler',
      data: project({ slug: 'ignored' }),
    });

    expect(summary.slug).toBe('my-compiler');
  });
});

describe('sortProjects', () => {
  const projects = [
    project({ slug: 'old-pinned', start: '2022-01', pinned: true }),
    project({ slug: 'newest', start: '2025-06' }),
    project({ slug: 'middle', start: '2024-03' }),
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
      project({ slug: 'p1', pinned: true, start: '2023-01' }),
      project({ slug: 'not-pinned', start: '2025-01' }),
      project({ slug: 'p2', pinned: true, start: '2025-05' }),
    ];

    expect(pickPinned(projects, 1).map((p) => p.slug)).toEqual(['p2']);
  });
});

describe('countByDomain', () => {
  it('없는 도메인은 키가 아예 없다', () => {
    const counts = countByDomain([
      project({ slug: 'a', domain: 'web' }),
      project({ slug: 'b', domain: 'web' }),
    ]);

    expect(counts).toEqual({ web: 2 });
  });
});

describe('projectHref', () => {
  it('본문이 있으면 상세로', () => {
    const target = projectHref(project({ slug: 'a', hasDetail: true }), '/projects/a/');

    expect(target).toEqual({ href: '/projects/a/', external: false });
  });

  // 프로젝트 대부분은 본문이 없다 — 카드가 바로 저장소로 보낸다.
  it('본문이 없으면 저장소로 나간다', () => {
    const target = projectHref(
      project({ slug: 'a', links: { repo: 'https://github.com/x/y' } }),
      '/projects/a/',
    );

    expect(target).toEqual({ href: 'https://github.com/x/y', external: true });
  });

  it('저장소가 없으면 데모, 그다음 글 순서', () => {
    const target = projectHref(
      project({ slug: 'a', links: { demo: 'https://demo', post: 'https://post' } }),
      '/projects/a/',
    );

    expect(target?.href).toBe('https://demo');
  });

  it('갈 데가 없으면 null — 제목이 링크가 아니게 된다', () => {
    expect(projectHref(project({ slug: 'a' }), '/projects/a/')).toBeNull();
  });
});

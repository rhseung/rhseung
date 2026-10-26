import { describe, expect, it } from 'vitest';

import {
  countByCategory,
  detailPaths,
  detailSlugs,
  filterProjects,
  groupProjectsByYear,
  projectHref,
  sortProjects,
} from './select-projects';

import type { Project } from '../model';

function project(overrides: Partial<Project> & { slug: string }): Project {
  return {
    title: overrides.slug,
    summary: '한 줄 요약',
    stack: ['TypeScript'],
    start: { year: 2024, month: 1 },
    status: 'shipped',
    category: 'lab',
    hasDetail: false,
    ...overrides,
  };
}

describe('sortProjects', () => {
  const projects = [
    project({ slug: 'oldest', start: { year: 2022, month: 1 } }),
    project({ slug: 'newest', start: { year: 2025, month: 6 } }),
    project({ slug: 'middle', start: { year: 2024, month: 3 } }),
  ];

  it('최신순이다', () => {
    expect(sortProjects(projects).map((p) => p.slug)).toEqual(['newest', 'middle', 'oldest']);
  });

  it('입력 배열을 건드리지 않는다', () => {
    const input = [...projects];
    sortProjects(input);

    expect(input.map((p) => p.slug)).toEqual(['oldest', 'newest', 'middle']);
  });
});

describe('filterProjects', () => {
  const projects = [
    project({ slug: 'site', category: 'service', summary: 'Astro 로 만든 사이트' }),
    project({ slug: 'tracer', category: 'graphics', stack: ['C++'] }),
  ];

  it('분류가 없으면 전부 남긴다', () => {
    expect(filterProjects(projects, { category: null, query: '' })).toHaveLength(2);
  });

  it('분류가 같은 것만 남긴다', () => {
    const slugs = filterProjects(projects, { category: 'graphics', query: '' }).map((p) => p.slug);
    expect(slugs).toEqual(['tracer']);
  });

  it('검색어는 설명과 기술 이름을 대소문자 없이 본다', () => {
    expect(filterProjects(projects, { category: null, query: 'astro' })[0]?.slug).toBe('site');
    expect(filterProjects(projects, { category: null, query: 'c++' })[0]?.slug).toBe('tracer');
  });
});

describe('countByCategory', () => {
  it('없는 분류도 0으로 센다', () => {
    const counts = countByCategory([project({ slug: 'a', category: 'service' })]);
    expect(counts).toEqual({ service: 1, graphics: 0, library: 0, lab: 0 });
  });
});

describe('groupProjectsByYear', () => {
  it('시작 연도로 묶고 최신 연도가 앞에 온다', () => {
    const groups = groupProjectsByYear([
      project({ slug: 'old', start: { year: 2023, month: 5 } }),
      project({ slug: 'late', start: { year: 2025, month: 11 } }),
      project({ slug: 'early', start: { year: 2025, month: 2 } }),
    ]);

    expect(groups.map(([year, items]) => [year, items.map((p) => p.slug)])).toEqual([
      [2025, ['late', 'early']],
      [2023, ['old']],
    ]);
  });
});

describe('projectHref', () => {
  it('본문이 있으면 상세로', () => {
    expect(projectHref(project({ slug: 'a', hasDetail: true }), '/ko/projects/a/')).toEqual({
      href: '/ko/projects/a/',
      external: false,
    });
  });

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

describe('detailSlugs', () => {
  const entries = [{ id: 'campass/ko' }, { id: 'campass/en' }, { id: 'rhseung-me/ko' }];

  it('그 언어로 본문이 있는 슬러그만 고른다', () => {
    expect(detailSlugs(entries, 'ko')).toEqual(new Set(['campass', 'rhseung-me']));
    expect(detailSlugs(entries, 'en')).toEqual(new Set(['campass']));
  });

  it('본문이 하나도 없으면 빈 집합이다', () => {
    expect(detailSlugs([], 'ko')).toEqual(new Set());
  });
});

describe('detailPaths', () => {
  const entries = [{ id: 'campass/ko' }, { id: 'campass/en' }, { id: 'rhseung-me/ko' }];

  it('id 를 슬러그와 언어로 가른다', () => {
    expect(detailPaths(entries).map(({ slug, lang }) => [slug, lang])).toEqual([
      ['campass', 'ko'],
      ['campass', 'en'],
      ['rhseung-me', 'ko'],
    ]);
  });

  it('같은 슬러그의 형제 언어를 LANGUAGES 순서로 모은다', () => {
    const [campass, , alone] = detailPaths(entries);

    expect(campass?.available).toEqual(['ko', 'en']);
    expect(alone?.available).toEqual(['ko']);
  });

  it('엔트리를 그대로 들려 보낸다', () => {
    expect(detailPaths(entries)[0]?.entry).toBe(entries[0]);
  });

  it('슬러그에 슬래시가 있어도 마지막 칸만 언어로 읽는다', () => {
    expect(detailPaths([{ id: 'a/b/ko' }])[0]?.slug).toBe('a/b');
  });

  it('언어 칸이 아니면 던진다', () => {
    expect(() => detailPaths([{ id: 'campass/fr' }])).toThrow('campass/fr');
  });
});

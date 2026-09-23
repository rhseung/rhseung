import { describe, expect, it } from 'vitest';

import { robotsTxt } from './robots';

describe('robotsTxt', () => {
  const production = robotsTxt(true);

  it('production 은 검색 색인을 막지 않는다', () => {
    expect(production).toContain('User-agent: *\nDisallow:\n');
    expect(production).not.toContain('User-agent: *\nDisallow: /');
  });

  it('production 은 sitemap 을 알린다', () => {
    expect(production).toContain('Sitemap: https://www.rhseung.me/sitemap-index.xml');
  });

  it.each(['GPTBot', 'ClaudeBot', 'CCBot', 'Bytespider', 'Meta-ExternalAgent'])(
    '학습용으로 긁는 %s 은 전면 차단이다',
    (agent) => {
      expect(production).toContain(`User-agent: ${agent}\nDisallow: /`);
    },
  );

  it.each(['ChatGPT-User', 'Perplexity-User', 'OAI-SearchBot', 'PerplexityBot', 'YouBot'])(
    '%s 은 막지 않는다 - Cloudflare 가 assistant 와 search 를 통과시키는 것과 어긋나면 안 된다',
    (agent) => {
      expect(production).not.toContain(`User-agent: ${agent}\n`);
    },
  );

  it.each(['Googlebot', 'Bingbot', 'facebookexternalhit'])(
    '%s 은 차단 목록에 없다 - 검색과 링크 미리보기가 죽는다',
    (agent) => {
      expect(production).not.toContain(`User-agent: ${agent}\n`);
    },
  );

  it('학습 전용 user-agent 만 막아서 검색 봇과 갈라진다', () => {
    expect(production).toContain('User-agent: Google-Extended');
    expect(production).toContain('User-agent: Applebot-Extended');
  });

  it('production 이 아니면 통째로 막는다', () => {
    expect(robotsTxt(false)).toContain('User-agent: *\nDisallow: /');
  });
});

import { describe, expect, it } from 'vitest';

import { matchRoute } from './routes';

describe('matchRoute', () => {
  it('경로마다 종류를 하나씩 낸다 - 경로 문자열이 이 파일 밖으로 새지 않는다', () => {
    expect(matchRoute('/')).toEqual({ kind: 'root' });
    expect(matchRoute('/api/contributions')).toEqual({ kind: 'contributions' });
    expect(matchRoute('/api/render-resume')).toEqual({ kind: 'renderResume' });
    expect(matchRoute('/api/favicon/github.com')).toEqual({
      kind: 'favicon',
      host: 'github.com',
    });
    expect(matchRoute('/resume-ko.pdf')).toEqual({ kind: 'resume', lang: 'ko' });
  });

  it('지원하지 않는 언어의 이력서는 자산으로 넘긴다 - lang 이 Language 로만 나온다', () => {
    expect(matchRoute('/resume-fr.pdf')).toEqual({ kind: 'asset', lang: null });
  });

  it('자산은 404 를 어느 언어로 낼지 같이 낸다', () => {
    expect(matchRoute('/ko/blog/none/')).toEqual({ kind: 'asset', lang: 'ko' });
    expect(matchRoute('/en/blog/none/')).toEqual({ kind: 'asset', lang: 'en' });
    expect(matchRoute('/images/og.png')).toEqual({ kind: 'asset', lang: null });
  });
});

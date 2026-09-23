import { describe, expect, it } from 'vitest';

import { i18n, I18N_NAMESPACES } from './i18n';
import { LANGUAGES } from './languages';

describe('i18n resources', () => {
  it('리소스가 import 시점에 동기로 실려 있다 - 첫 렌더 전에 changeLanguage 가 동기로 돈다', () => {
    expect(i18n.hasResourceBundle('ko', 'common')).toBe(true);
  });

  it('언어마다 네임스페이스가 전부 있다 - 하나라도 빠지면 t() 가 키 문자열을 그대로 렌더한다', () => {
    for (const lang of LANGUAGES) {
      for (const namespace of I18N_NAMESPACES) {
        expect(i18n.hasResourceBundle(lang, namespace), `${lang}:${namespace}`).toBe(true);
      }
    }
  });
});

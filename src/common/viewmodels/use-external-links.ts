import { EnvelopeSimpleIcon, GithubLogoIcon, RssIcon, type Icon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { SITE } from '@/common/lib';

export type ExternalLinkKey = 'github' | 'email' | 'rss';

/**
 * 독과 홈이 같은 링크 목록을 쓰게 한다 - 전에는 둘 다 GitHub를 따로 하드코딩해서
 * 링크가 두 곳에 있었다.
 */
export function useExternalLinks() {
  const { t } = useTranslation('common');

  return [
    { key: 'github', href: SITE.github, label: 'GitHub', Icon: GithubLogoIcon, blank: true },
    {
      key: 'email',
      href: `mailto:${SITE.email}`,
      label: t(($) => $.footer.email),
      Icon: EnvelopeSimpleIcon,
      blank: false,
    },
    { key: 'rss', href: '/rss.xml', label: 'RSS', Icon: RssIcon, blank: false },
  ] as const satisfies readonly {
    key: ExternalLinkKey;
    href: string;
    label: string;
    Icon: Icon;
    blank: boolean;
  }[];
}

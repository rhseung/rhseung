import { EnvelopeSimpleIcon, GithubLogoIcon, RssIcon, type Icon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { SITE } from '@/common/lib';

export type ExternalLinkKey = 'github' | 'email' | 'rss';

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

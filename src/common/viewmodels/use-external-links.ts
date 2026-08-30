import { EnvelopeIcon, RssIcon } from '@heroicons/react/24/outline';
import { GithubLogoIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { SITE, type IconComponent } from '@/common/lib';

export type ExternalLinkKey = 'github' | 'email' | 'rss';

export function useExternalLinks() {
  const { t } = useTranslation('common');

  return [
    { key: 'github', href: SITE.github, label: 'GitHub', Icon: GithubLogoIcon, blank: true },
    {
      key: 'email',
      href: `mailto:${SITE.email}`,
      label: t(($) => $.footer.email),
      Icon: EnvelopeIcon,
      blank: false,
    },
    { key: 'rss', href: '/rss.xml', label: 'RSS', Icon: RssIcon, blank: false },
  ] as const satisfies readonly {
    key: ExternalLinkKey;
    href: string;
    label: string;
    Icon: IconComponent;
    blank: boolean;
  }[];
}

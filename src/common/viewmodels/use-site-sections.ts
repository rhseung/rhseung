import {
  BriefcaseIcon,
  FlaskIcon,
  FolderIcon,
  PenNibIcon,
  ReadCvLogoIcon,
  type Icon,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { localeHref, type Language } from '@/common/lib';

const SECTIONS = [
  { key: 'projects', Icon: FolderIcon },
  { key: 'research', Icon: FlaskIcon },
  { key: 'blog', Icon: PenNibIcon },
  { key: 'career', Icon: BriefcaseIcon },
  { key: 'resume', Icon: ReadCvLogoIcon },
] as const satisfies readonly { key: string; Icon: Icon }[];

export type SiteSection = (typeof SECTIONS)[number]['key'];

export function useSiteSections(lang: Language) {
  const { t } = useTranslation('common');

  return SECTIONS.map(({ key, Icon }) => ({
    key,
    Icon,
    href: localeHref(lang, `/${key}`),
    label: t(($) => $.nav[key]),
  }));
}

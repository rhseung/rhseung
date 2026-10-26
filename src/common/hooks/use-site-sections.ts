import {
  BeakerIcon,
  BriefcaseIcon,
  FolderIcon,
  IdentificationIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';
import {
  BeakerIcon as BeakerSolidIcon,
  BriefcaseIcon as BriefcaseSolidIcon,
  FolderIcon as FolderSolidIcon,
  IdentificationIcon as IdentificationSolidIcon,
  PencilSquareIcon as PencilSquareSolidIcon,
} from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

import {
  localeHref,
  SITE_SECTIONS,
  type IconComponent,
  type Language,
  type SiteSection,
} from '@/common/lib';

const ICONS = {
  projects: [FolderIcon, FolderSolidIcon],
  research: [BeakerIcon, BeakerSolidIcon],
  blog: [PencilSquareIcon, PencilSquareSolidIcon],
  career: [BriefcaseIcon, BriefcaseSolidIcon],
  resume: [IdentificationIcon, IdentificationSolidIcon],
} satisfies Record<SiteSection, readonly [IconComponent, IconComponent]>;

export function useSiteSections(lang: Language) {
  const { t } = useTranslation('common');

  return SITE_SECTIONS.map((key) => ({
    key,
    Icon: ICONS[key][0],
    IconSolid: ICONS[key][1],
    href: localeHref(lang, `/[lang]/${key}`),
    label: t(($) => $.nav[key]),
  }));
}

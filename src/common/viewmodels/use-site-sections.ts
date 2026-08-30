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

import { localeHref, type IconComponent, type Language } from '@/common/lib';

// heroicons 는 채운 변형이 별도 import 라 쌍으로 들고 다녀야 한다.
const SECTIONS = [
  { key: 'projects', Icon: FolderIcon, IconSolid: FolderSolidIcon },
  { key: 'research', Icon: BeakerIcon, IconSolid: BeakerSolidIcon },
  { key: 'blog', Icon: PencilSquareIcon, IconSolid: PencilSquareSolidIcon },
  { key: 'career', Icon: BriefcaseIcon, IconSolid: BriefcaseSolidIcon },
  { key: 'resume', Icon: IdentificationIcon, IconSolid: IdentificationSolidIcon },
] as const satisfies readonly { key: string; Icon: IconComponent; IconSolid: IconComponent }[];

export type SiteSection = (typeof SECTIONS)[number]['key'];

export function useSiteSections(lang: Language) {
  const { t } = useTranslation('common');

  return SECTIONS.map(({ key, Icon, IconSolid }) => ({
    key,
    Icon,
    IconSolid,
    href: localeHref(lang, `/${key}`),
    label: t(($) => $.nav[key]),
  }));
}

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

import { localeHref, type IconComponent, type Language, type LocaleRoute } from '@/common/lib';

type SectionKey<R = LocaleRoute> = R extends `/[lang]/${infer K}` ? K : never;

const SECTIONS = [
  { key: 'projects', Icon: FolderIcon, IconSolid: FolderSolidIcon },
  { key: 'research', Icon: BeakerIcon, IconSolid: BeakerSolidIcon },
  { key: 'blog', Icon: PencilSquareIcon, IconSolid: PencilSquareSolidIcon },
  { key: 'career', Icon: BriefcaseIcon, IconSolid: BriefcaseSolidIcon },
  { key: 'resume', Icon: IdentificationIcon, IconSolid: IdentificationSolidIcon },
] as const satisfies readonly { key: SectionKey; Icon: IconComponent; IconSolid: IconComponent }[];

export type SiteSection = (typeof SECTIONS)[number]['key'];

export function useSiteSections(lang: Language) {
  const { t } = useTranslation('common');

  return SECTIONS.map(({ key, Icon, IconSolid }) => ({
    key,
    Icon,
    IconSolid,
    href: localeHref(lang, `/[lang]/${key}`),
    label: t(($) => $.nav[key]),
  }));
}

import type { Language, Localized } from '@/common/lib';
import type { TechSpec } from '@/content/skills';

export type SkillGroupText = {
  group: string;
};

export type SkillGroupItem = Localized<SkillGroupText> & {
  slug: string;
  order: number;
  items: readonly TechSpec[];
};

export type SkillGroup = SkillGroupText & Omit<SkillGroupItem, Language>;

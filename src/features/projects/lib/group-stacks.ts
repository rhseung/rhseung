import type { Language } from '@/common/lib';
import { skillGroupsOf, sortSkillGroups } from '@/features/career';

export type StackGroup = {
  slug: string;
  label: string;
  items: string[];
};

export function groupStacks(stacks: readonly string[], lang: Language): StackGroup[] {
  return sortSkillGroups(skillGroupsOf(lang))
    .map((group) => ({
      slug: group.slug,
      label: group.group,
      items: stacks.filter((tech) => group.items.some((item) => item.name === tech)),
    }))
    .filter((group) => group.items.length > 0);
}

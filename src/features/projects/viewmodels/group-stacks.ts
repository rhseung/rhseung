import type { Language } from '@/common/lib';
import { skillGroupsOf, sortSkillGroups } from '@/features/career';

export type StackGroup = {
  slug: string;
  label: string;
  items: string[];
};

// 어느 스킬 그룹에도 없는 기술은 조용히 빠진다 - 카드에 안 뜬다고 버그가 아니다.
export function groupStacks(stacks: readonly string[], lang: Language): StackGroup[] {
  return sortSkillGroups(skillGroupsOf(lang))
    .map((group) => ({
      slug: group.slug,
      label: group.group,
      items: stacks.filter((tech) => (group.items as readonly string[]).includes(tech)),
    }))
    .filter((group) => group.items.length > 0);
}

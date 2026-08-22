import type { Language } from '@/common/lib';
import { skillGroupsOf, sortSkillGroups } from '@/features/career';

export type StackGroup = {
  slug: string;
  label: string;
  items: string[];
};

/**
 * 기술 칩을 스킬 그룹으로 묶는다. 프로젝트가 실제로 쓴 기술만 남기고, 남은 게 없는
 * 그룹은 뺀다. 어느 그룹에도 없는 기술은 사라진다 - 이력에 안 내세우는 기술이라는 뜻이라
 * 필터에도 낼 이유가 없다.
 */
export function groupStacks(stacks: readonly string[], lang: Language): StackGroup[] {
  return sortSkillGroups(skillGroupsOf(lang))
    .map((group) => ({
      slug: group.slug,
      label: group.group,
      items: stacks.filter((tech) => (group.items as readonly string[]).includes(tech)),
    }))
    .filter((group) => group.items.length > 0);
}

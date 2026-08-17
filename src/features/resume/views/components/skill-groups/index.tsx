import { Badge } from '@/common/components';
import { cn } from '@/common/utils';

import type { SkillGroup } from '../../../viewmodels';

export function SkillGroups({ groups, layout = 'list' }: SkillGroups.Props) {
  return (
    <dl className={cn('gap-4', layout === 'grid' ? 'grid sm:grid-cols-2' : 'flex flex-col')}>
      {groups.map((group) => (
        <div key={group.group} className="flex break-inside-avoid flex-col gap-1.5">
          <dt className="text-muted-foreground text-xs">{group.group}</dt>
          <dd>
            <ul className="flex flex-wrap gap-1">
              {group.items.map((item) => (
                <li key={item}>
                  <Badge variant="outline">{item}</Badge>
                </li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export declare namespace SkillGroups {
  export type Props = {
    groups: SkillGroup[];
    /** 그룹이 여럿이면 세로로만 쌓지 않는다. */
    layout?: 'list' | 'grid';
  };
}

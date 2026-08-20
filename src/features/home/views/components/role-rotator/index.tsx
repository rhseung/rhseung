import { useEffect, useState, type CSSProperties } from 'react';

export function RoleRotator({ roles, intervalMs = 2000 }: RoleRotator.Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (roles.length < 2) return;

    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), intervalMs);
    return () => clearInterval(id);
  }, [roles.length, intervalMs]);

  return (
    <div className="h-5 overflow-hidden motion-reduce:h-auto">
      <ul
        style={{ '--shift': `-${(index * 100) / roles.length}%` } as CSSProperties}
        className="translate-y-(--shift) transition-transform duration-500 ease-out motion-reduce:translate-y-0 motion-reduce:transition-none"
      >
        {roles.map((role) => (
          <li key={role} className="text-sm leading-5">
            {role}
          </li>
        ))}
      </ul>
    </div>
  );
}

export declare namespace RoleRotator {
  export type Props = {
    roles: string[];
    intervalMs?: number;
  };
}

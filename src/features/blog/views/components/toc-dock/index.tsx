import { useState } from 'react';

import { ListBulletIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/common/components';
import { cn } from '@/common/utils';

import { PostToc } from '../post-toc';

import type { PostHeading } from '../../../viewmodels';

/**
 * 목차는 `lg` 부터 본문 옆에 붙는다. 그 아래에서는 컬럼을 만들 폭이 없어 이 버튼으로
 * 들어온다.
 *
 * 사이트 독에 끼우지 않고 따로 띄운다 - 독은 어느 페이지에나 있는 이동 수단이고 목차는
 * 이 문서 안에서만 뜻이 있어서, 한 줄에 섞으면 독의 항목 수가 페이지마다 달라진다.
 * `z-30` 인 건 독(`z-20`)이 화면 폭 전체를 덮는 띠라 그 위에 서야 눌리기 때문이다.
 */
export function TocDock({ headings }: TocDock.Props) {
  const { t } = useTranslation('blog');
  const [open, setOpen] = useState(false);

  if (headings.length === 0) return null;

  const label = t(($) => $.detail.toc);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* 껍데기를 사이트 독과 똑같이 두른다 - 안 그러면 높이가 달라 나란히 안 선다. */}
      <div
        className={cn(
          'border-border bg-background/70 fixed right-4 bottom-4 z-30 rounded-full border p-2 backdrop-blur-md lg:hidden print:hidden',
        )}
      >
        <SheetTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              aria-label={label}
              className={cn(
                'text-muted-foreground hover:text-foreground hover:bg-muted size-10 rounded-full active:translate-y-0',
              )}
            />
          }
        >
          <ListBulletIcon className="size-5" />
        </SheetTrigger>
      </div>

      {/* 항목을 누르면 같은 페이지 안에서 움직인다 - 시트가 열린 채면 간 곳이 안 보인다. */}
      {/*
       * 폭을 못 박는다. 시트 기본값이 `w-3/4` 라 목차 한 줄보다 훨씬 넓다. 변형 접두사를
       * 그대로 맞춰야 tailwind-merge 가 아니라 특이도로 이긴다 - 맨 `w-64` 는 진다.
       */}
      <SheetContent
        side="right"
        className="data-[side=right]:w-64 data-[side=right]:sm:max-w-64"
        onClick={() => {
          setOpen(false);
        }}
      >
        <SheetHeader>
          <SheetTitle className="sr-only">{label}</SheetTitle>
          <SheetDescription className="sr-only">{label}</SheetDescription>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 px-4 pb-8">
          <PostToc headings={headings} className="size-full" />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export declare namespace TocDock {
  export type Props = {
    headings: readonly PostHeading[];
  };
}

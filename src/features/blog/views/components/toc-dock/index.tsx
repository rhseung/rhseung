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

export function TocDock({ headings }: TocDock.Props) {
  const { t } = useTranslation('blog');
  const [open, setOpen] = useState(false);

  if (headings.length === 0) return null;

  const label = t(($) => $.detail.toc);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
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

      {/* 변형 접두사를 맞춰야 기본 `w-3/4` 를 이긴다. 맨 `w-64` 는 특이도에서 진다. */}
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

import { useState } from 'react';

import { ListBulletIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { css } from 'styled-system/css';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/common/components';
import { dockItem } from '@/common/styles';

import { PostToc } from '../post-toc';

import type { PostHeading } from '../../../viewmodels';

const fab = css({
  position: 'fixed',
  right: '4',
  bottom: '4',
  zIndex: 'fab',
  rounded: 'full',
  border: 'line',
  bg: 'surface/70',
  p: '2',
  backdropBlur: 'md',
  lg: { display: 'none' },
  _print: { display: 'none' },
});
const srOnly = css({ srOnly: true });
const toc = css({ boxSize: 'full' });

export function TocDock({ headings }: TocDock.Props) {
  const { t } = useTranslation('blog');
  const [open, setOpen] = useState(false);

  if (headings.length === 0) return null;

  const label = t(($) => $.detail.toc);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className={fab}>
        <SheetTrigger render={<button type="button" aria-label={label} className={dockItem} />}>
          <ListBulletIcon aria-hidden />
        </SheetTrigger>
      </div>

      <SheetContent
        side="right"
        css={{ w: '64', sm: { maxW: '64' } }}
        onClick={() => {
          setOpen(false);
        }}
      >
        <SheetHeader>
          <SheetTitle className={srOnly}>{label}</SheetTitle>
          <SheetDescription className={srOnly}>{label}</SheetDescription>
        </SheetHeader>

        <div className={css({ display: 'flex', minH: '0', flex: '1', px: '4', pb: '8' })}>
          <PostToc headings={headings} className={toc} />
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

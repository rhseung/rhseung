import { useTranslation } from 'react-i18next';

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
  SiteDock,
  buttonVariants,
} from '@/common/components';
import { DEFAULT_LANGUAGE, localeHref } from '@/common/lib';
import { cn } from '@/common/utils';

export function NotFound() {
  const { t } = useTranslation('common');

  return (
    <div className="bg-background flex min-h-dvh flex-col">
      <main className="flex flex-1 items-center justify-center p-6">
        <Empty>
          <EmptyHeader>
            {/* `EmptyTitle` 은 div 라 안을 h1 로 채운다. */}
            <EmptyTitle>
              <h1>{t(($) => $.notFound.title)}</h1>
            </EmptyTitle>
            <EmptyDescription>{t(($) => $.notFound.description)}</EmptyDescription>
          </EmptyHeader>

          <div className="flex flex-wrap justify-center gap-2">
            <a href={localeHref(DEFAULT_LANGUAGE, '/')} className={buttonVariants({ size: 'sm' })}>
              {t(($) => $.notFound.action)}
            </a>
            <a
              href={localeHref(DEFAULT_LANGUAGE, '/projects')}
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            >
              {t(($) => $.nav.projects)}
            </a>
            <a
              href={localeHref(DEFAULT_LANGUAGE, '/blog')}
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            >
              {t(($) => $.nav.blog)}
            </a>
          </div>
        </Empty>
      </main>

      <SiteDock lang={DEFAULT_LANGUAGE} />
    </div>
  );
}

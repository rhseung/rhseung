import type { LogoPath, Tech, Url, YearMonth, YearOrMonth } from '@/common/lib';

export type CareerText = {
  org: string;
  role: string;
  summary?: string;
  /** 교과우수상·석차·장학 같은 학교 안 성취. 대회 컬렉션이 아니라 여기 딸린다. */
  achievements?: readonly string[];
};

export type AwardText = {
  title: string;
  issuer?: string;
  summary?: string;
};

export type SkillGroupText = {
  group: string;
};

/**
 * 항목 하나가 파일 하나다. 언어 무관 필드는 위에 한 번, 번역문은 `ko`·`en` 블록에.
 * 두 블록이 **타입상 필수**라 한쪽을 빠뜨리면 그 파일에서 컴파일이 깨진다.
 */
type Translated<T> = { ko: T; en: T };

export type CareerItem = Translated<CareerText> & {
  slug: string;
  start: YearMonth;
  end?: YearMonth;
  logo?: LogoPath;
  links?: { site?: Url };
};

export type AwardItem = Translated<AwardText> & {
  slug: string;
  date: YearOrMonth;
  /** 같은 해 안의 순서. 작을수록 먼저. */
  order: number;
};

export type SkillGroupItem = Translated<SkillGroupText> & {
  slug: string;
  order: number;
  items: readonly Tech[];
};

export type CareerEntry = CareerText & Omit<CareerItem, 'ko' | 'en'>;
export type Award = AwardText & Omit<AwardItem, 'ko' | 'en'>;
export type SkillGroup = SkillGroupText & Omit<SkillGroupItem, 'ko' | 'en'>;

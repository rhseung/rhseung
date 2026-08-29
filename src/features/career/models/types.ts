import type { Tone, Url, YearMonth, YearOrMonth } from '@/common/lib';
import type { TechSpec } from '@/content/skills';

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

type Translated<T> = { ko: T; en: T };

export type CareerItem = Translated<CareerText> & {
  slug: string;
  start: YearMonth;
  end?: YearMonth;
  /** `?url`로 임포트한 값 - 콜로케이트된 로고 파일을 그대로 가리키는 정적 URL 문자열. */
  logo?: string;
  links?: { site?: Url };
};

export type AwardItem = Translated<AwardText> & {
  slug: string;
  date: YearOrMonth;
};

export type SkillGroupItem = Translated<SkillGroupText> & {
  slug: string;
  /** 그룹 순서는 이름순이 아니다 - 언어에 따라 가나다순이 뒤집힌다. 항목이 직접 정한다. */
  order: number;
  items: readonly TechSpec[];
};

export type CareerEntry = CareerText & Omit<CareerItem, 'ko' | 'en'>;
export type Award = AwardText & Omit<AwardItem, 'ko' | 'en'>;
export type SkillGroup = SkillGroupText & Omit<SkillGroupItem, 'ko' | 'en'>;

/** 슬러그는 유니온이 아니라 문자열이다. 새 그룹을 넣고 색을 안 정하면 무채색으로 떨어진다. */
export const SKILL_GROUP_TONE: Record<string, Tone> = {
  languages: 'purple',
  'web-frontend': 'blue',
  'mobile-frontend': 'teal',
  backend: 'green',
  mldl: 'rose',
  tooling: 'amber',
};

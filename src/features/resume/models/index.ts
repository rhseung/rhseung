import { z } from 'zod';

/**
 * 함수인 건 트리셰이킹 때문이다. 최상위에서 `z.object()`를 부르면 Rollup이 부수효과로
 * 보고 못 지워서, 스키마를 안 쓰는 아일랜드 번들에도 zod가 통째로 실린다.
 */
const yearMonth = () =>
  z.string().regex(/^\d{4}-(?:0[1-9]|1[0-2])$/, 'YYYY-MM 형식이어야 합니다 (예: 2024-03)');

const links = () =>
  z.object({
    site: z.url().optional(),
    repo: z.url().optional(),
    post: z.url().optional(),
  });

/** 경력과 학력은 같은 모양이다 — 직함/소속/기간. */
const careerEntry = () =>
  z.object({
    role: z.string().min(1),
    org: z.string().min(1),
    start: yearMonth(),
    end: yearMonth().optional(),
    summary: z.string().max(200).optional(),
    links: links().optional(),
    draft: z.boolean().default(false),
  });

export const experienceSchema = careerEntry;
export const educationSchema = careerEntry;

/** 수상·성취는 연도만 아는 경우가 많다. 월을 지어내지 않아도 되게 둘 다 받는다. */
const yearOrMonth = () =>
  z.string().regex(/^\d{4}(?:-(?:0[1-9]|1[0-2]))?$/, 'YYYY 또는 YYYY-MM 이어야 합니다');

export const awardSchema = () =>
  z.object({
    title: z.string().min(1),
    issuer: z.string().optional(),
    date: yearOrMonth(),
    /** 같은 해 안의 순서. 작을수록 먼저. */
    order: z.number().default(0),
    summary: z.string().max(200).optional(),
    links: links().optional(),
    draft: z.boolean().default(false),
  });

/** 기술은 항목 하나가 아니라 그룹 하나가 파일 하나다. 30개를 파일 30개로 두지 않는다. */
export const skillGroupSchema = () =>
  z.object({
    group: z.string().min(1),
    items: z.array(z.string()).min(1),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  });

/** 이력서에서 다른 데 출처가 없는 것만. 경력·학력·수상·기술은 각자 컬렉션에서 온다. */
export const resumeSchema = () =>
  z.object({
    headline: z.string().min(1),
    intro: z.string().optional(),
    location: z.string().optional(),
    contact: z.object({
      email: z.email(),
      github: z.url(),
      site: z.url().optional(),
      linkedin: z.url().optional(),
    }),
  });

export type Resume = z.infer<ReturnType<typeof resumeSchema>>;
export type CareerEntry = z.infer<ReturnType<typeof careerEntry>>;
export type Award = z.infer<ReturnType<typeof awardSchema>>;
export type SkillGroup = z.infer<ReturnType<typeof skillGroupSchema>>;

/** `hasDetail`이 false면 상세 페이지가 없고 목록에만 선다. */
export type CareerSummary = CareerEntry & { slug: string; hasDetail: boolean };
export type AwardSummary = Award & { slug: string; hasDetail: boolean };

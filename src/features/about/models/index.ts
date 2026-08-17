import { z } from 'zod';

const entry = () =>
  z.object({
    period: z.string().min(1),
    org: z.string().min(1),
    role: z.string().min(1),
    description: z.string().optional(),
  });

/**
 * 함수인 건 트리셰이킹 때문이다. 최상위에서 `z.object()`를 부르면 Rollup이 부수효과로
 * 보고 못 지워서, 스키마를 안 쓰는 아일랜드 번들에도 zod가 통째로 실린다.
 */
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

    experience: z.array(entry()).default([]),
    education: z.array(entry()).default([]),
    awards: z
      .array(
        z.object({
          year: z.string().min(1),
          title: z.string().min(1),
          issuer: z.string().optional(),
          note: z.string().optional(),
        }),
      )
      .default([]),
    skills: z.array(z.string()).default([]),
  });

export type Resume = z.infer<ReturnType<typeof resumeSchema>>;
export type ResumeEntry = z.infer<ReturnType<typeof entry>>;

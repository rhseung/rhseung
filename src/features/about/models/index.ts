import { z } from 'zod';

/** 화면과 PDF가 같은 파일에서 나온다. `src/content/resume/{ko,en}.yaml`. */
export const resumeSchema = z.object({
  headline: z.string().min(1),
  intro: z.string().optional(),
  contact: z.object({
    email: z.email(),
    github: z.url(),
    site: z.url().optional(),
  }),
  timeline: z
    .array(
      z.object({
        /** 자유 문자열 — `2022.03 – 현재`처럼 표시 그대로 쓴다. 정렬하지 않고 쓴 순서를 지킨다. */
        period: z.string().min(1),
        org: z.string().min(1),
        role: z.string().min(1),
        points: z.array(z.string()).default([]),
      }),
    )
    .default([]),
  skills: z
    .array(
      z.object({
        group: z.string().min(1),
        items: z.array(z.string()).min(1),
      }),
    )
    .default([]),
});

export type Resume = z.infer<typeof resumeSchema>;

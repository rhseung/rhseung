import { z } from 'zod';

/** 화면(`/about`)과 PDF(`public/resume-{lang}.pdf`)가 같은 파일에서 나온다. */
const entry = z.object({
  /** 표시 그대로 쓴다(`2025. 3. — 현재`). 정렬하지 않고 쓴 순서를 지킨다. */
  period: z.string().min(1),
  org: z.string().min(1),
  role: z.string().min(1),
  description: z.string().optional(),
});

export const resumeSchema = z.object({
  headline: z.string().min(1),
  intro: z.string().optional(),
  location: z.string().optional(),
  contact: z.object({
    email: z.email(),
    github: z.url(),
    site: z.url().optional(),
    linkedin: z.url().optional(),
  }),

  experience: z.array(entry).default([]),
  education: z.array(entry).default([]),
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
  /** 그룹 없이 평평하게. 레벨 표시는 하지 않는다 — 넓이가 "다 중간"으로 읽힌다. */
  skills: z.array(z.string()).default([]),
});

export type Resume = z.infer<typeof resumeSchema>;
export type ResumeEntry = z.infer<typeof entry>;

import type { ResumeText } from './types';

const profile = {
  headline: 'I build web apps — and the languages and runtimes they run on.',
  intro:
    'I move between frontend work and systems programming. Using an abstraction layer and building one teach different things, and I want both.',
  location: 'South Korea',
};

const experience = {
  'gist-aiter': {
    org: 'Audio Intelligence Technology & Research Lab (AiTeR), School of EECS, GIST',
    role: 'Frontend developer intern',
    summary: 'Taking part in experiments and research at the audio intelligence lab.',
  },
};

const education = {
  gist: {
    org: 'Gwangju Institute of Science and Technology (GIST)',
    role: 'B.S., School of EECS and Department of AI Convergence (double major)',
    summary: 'First year is undeclared; majors are chosen from the second year.',
    achievements: [
      'Freshman representative, 2025 matriculation ceremony',
      'Academic excellence scholarship, spring 2025',
      'GS1001 Calculus and Applications — 1st, 240 / 240',
      'GS1401 Computer Programming — 1st, 98 / 100',
    ],
  },
  'gwangju-science-academy': {
    org: 'Gwangju Science Academy for the Gifted',
    role: 'Natural Sciences',
    summary: 'Computer science GPA 4.285 / 4.3',
    achievements: [
      'Gold Prize, 2023 in-school competition (computer science)',
      'Gold Prize, 2022 in-school competition — the only one awarded to a first-year student',
      'Subject Excellence Award, Computer Science Project — 1st, year 3 semester 1',
      'Data Structures & Algorithms — 2nd, year 3 semester 1',
      'Subject Excellence Award, Programming & Problem Solving — 1st, year 2 semester 2 (AP)',
      'Subject Excellence Award, Object-Oriented Programming — 1st, year 2 semester 2',
      'Subject Excellence Award, Machine Learning & Deep Learning — 1st, year 2 semester 2',
      'Subject Excellence Award, Computer Science II — 2nd, year 1 semester 2',
      'Subject Excellence Award, Computer Science I — 5th, year 1 semester 1',
    ],
  },
};

const awards = {
  'ai-convergence-contest': {
    title: 'Participant, AI Creative Convergence Competition',
    issuer: 'GIST AI Graduate School',
    summary: 'Table-tennis robot track',
  },
  'ax-challenge-2026': {
    title: '3rd place, 2026 AX Challenge Track 1',
    summary: 'Table-tennis robot track · Jun – Aug 2026',
  },
  'junction-asia-2025': {
    title: 'Participant, JUNCTION ASIA 2025',
    issuer: 'ENTBE',
  },
  'launch-ai-career-school': {
    title: 'Participant, L:AUNCH AI Career School',
    issuer: 'Root Impact · Krypton X',
    summary: 'Supported by Google.org',
  },
  'mini-tex-corps': {
    title: 'Winner, 2025 Honam Regional Mini Tex-Corps',
    issuer: 'Ministry of Science and ICT · COMPA',
    summary: 'Hosted by GIST, Ewha Womans University and Wonkwang University startup centers',
  },
};

const skillGroups = {
  backend: { group: 'Backend & data' },
  graphics: { group: 'Apps & graphics' },
  languages: { group: 'Languages' },
  ml: { group: 'Machine learning' },
  tooling: { group: 'Tooling' },
  web: { group: 'Web' },
};

export const resumeTextEN: ResumeText = {
  profile,
  experience,
  education,
  awards,
  skillGroups,
};

import type { ThemeMode } from '../lib/theme';

const light = {
  surface: 'oklch(1 0 0)',
  'surface.raised': 'oklch(1 0 0)',
  'surface.muted': 'oklch(0.967 0.001 286.375)',
  text: 'oklch(0.141 0.005 285.823)',
  'text.muted': 'oklch(0.552 0.016 285.938)',
  accent: 'oklch(0.21 0.006 285.885)',
  'accent.fg': 'oklch(0.985 0 0)',
  danger: 'oklch(0.577 0.245 27.325)',
  'danger.fg': 'oklch(0.985 0 0)',
  line: 'oklch(0.92 0.004 286.32)',
  'line.input': 'oklch(0.92 0.004 286.32)',
  focus: 'oklch(0.705 0.015 286.067)',
  'contribution.0': 'oklch(0.97 0.001 286.375)',
  'contribution.1': 'oklch(0.885 0.004 286.32)',
  'contribution.2': 'oklch(0.71 0.008 286.1)',
  'contribution.3': 'oklch(0.45 0.008 286)',
  'contribution.4': 'oklch(0.141 0.005 285.823)',
  'tone.blue': 'oklch(0.48 0.14 250)',
  'tone.teal': 'oklch(0.45 0.1 190)',
  'tone.green': 'oklch(0.45 0.12 150)',
  'tone.amber': 'oklch(0.48 0.12 70)',
  'tone.purple': 'oklch(0.48 0.15 300)',
  'tone.rose': 'oklch(0.5 0.16 15)',
  overlay: 'oklch(0 0 0 / 10%)',
};

export type ColorRole = keyof typeof light;

type Palette = Record<ColorRole, string>;

const dark: Palette = {
  surface: 'oklch(0.141 0.005 285.823)',
  'surface.raised': 'oklch(0.21 0.006 285.885)',
  'surface.muted': 'oklch(0.274 0.006 286.033)',
  text: 'oklch(0.985 0 0)',
  'text.muted': 'oklch(0.705 0.015 286.067)',
  accent: 'oklch(0.92 0.004 286.32)',
  'accent.fg': 'oklch(0.21 0.006 285.885)',
  danger: 'oklch(0.704 0.191 22.216)',
  'danger.fg': 'oklch(0.985 0 0)',
  line: 'oklch(1 0 0 / 10%)',
  'line.input': 'oklch(1 0 0 / 15%)',
  focus: 'oklch(0.552 0.016 285.938)',
  'contribution.0': 'oklch(0.17 0.004 285.9)',
  'contribution.1': 'oklch(0.26 0.005 286)',
  'contribution.2': 'oklch(0.44 0.008 286)',
  'contribution.3': 'oklch(0.7 0.012 286)',
  'contribution.4': 'oklch(0.985 0 0)',
  'tone.blue': 'oklch(0.82 0.1 250)',
  'tone.teal': 'oklch(0.82 0.09 190)',
  'tone.green': 'oklch(0.82 0.11 150)',
  'tone.amber': 'oklch(0.85 0.1 80)',
  'tone.purple': 'oklch(0.83 0.1 300)',
  'tone.rose': 'oklch(0.84 0.1 15)',
  overlay: 'oklch(0 0 0 / 40%)',
};

export const PALETTES = { light, dark } satisfies Record<ThemeMode, Palette>;

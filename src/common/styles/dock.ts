import { css } from 'styled-system/css';

export const dockBar = css({
  display: 'flex',
  alignItems: 'center',
  gap: '1',
  rounded: 'full',
  border: 'line',
  bg: 'surface/70',
  p: '2',
  backdropBlur: 'md',
});

export const dockItem = css({
  display: 'flex',
  boxSize: '10',
  alignItems: 'center',
  justifyContent: 'center',
  rounded: 'full',
  color: 'text.muted',
  transition: 'colors',
  outlineStyle: 'none',
  _hover: { color: 'text', bg: 'surface.muted' },
  _focusVisible: { boxShadow: 'focus' },
  '&[aria-current=page]': { color: 'text', bg: 'surface.muted' },
  '& > svg': { boxSize: '5' },
});

import { Input as InputPrimitive } from '@base-ui/react/input';
import { css, cx } from 'styled-system/css';

const input = css({
  h: '8',
  w: 'full',
  minW: '0',
  rounded: 'lg',
  border: 'input',
  bg: 'transparent',
  px: '2.5',
  py: '1',
  textStyle: 'md',
  transition: 'colors',
  outlineStyle: 'none',
  md: { textStyle: 'sm' },
  _placeholder: { color: 'text.muted' },
  _focusVisible: { borderColor: 'focus', boxShadow: 'focus' },
  _disabled: { pointerEvents: 'none', cursor: 'not-allowed', opacity: 0.5, bg: 'line.input/50' },
  _invalid: { borderColor: 'danger', boxShadow: 'danger' },
  _dark: { bg: 'line.input/30', _disabled: { bg: 'line.input/80' } },
});

export function Input({
  className,
  type,
  ...props
}: Omit<React.ComponentProps<'input'>, 'className'> & { className?: string }) {
  return (
    <InputPrimitive type={type} data-slot="input" className={cx(input, className)} {...props} />
  );
}

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { ButtonBaseProps, buttonRecipe } from './more.css';

import clsx from 'clsx';

export type ButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className: classNameFromProps, variant = 'fill', theme = 'grey', ...restProps } = props;

  return (
    <button
      ref={ref}
      className={clsx(buttonRecipe({ variant, theme }), classNameFromProps)}
      {...restProps}
    />
  );
});

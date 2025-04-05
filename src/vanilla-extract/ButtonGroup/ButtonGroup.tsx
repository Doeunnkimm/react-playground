import { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import { ButtonGroupContext, useButtonGroupContext } from './context';
import { buttonStyle, buttonVariantThemeVariants } from './styles.css';
import { ButtonTheme, ButtonVariant } from './types';

import clsx from 'clsx';

interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  variant?: ButtonVariant;
  theme?: ButtonTheme;
}

const ButtonGroup = (props: ButtonGroupProps) => {
  const { children, variant = 'fill', theme = 'grey' } = props;

  return (
    <ButtonGroupContext.Provider value={{ variant, theme }}>
      <div>{children}</div>
    </ButtonGroupContext.Provider>
  );
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  theme?: ButtonTheme;
}

const Button = (props: ButtonProps) => {
  const { variant: varinatFromProps, theme: themeFromProps, ...restProps } = props;
  const { variant: variantFromCtx, theme: themeFromCtx } = useButtonGroupContext();

  const variant = varinatFromProps ?? variantFromCtx;
  const theme = themeFromProps ?? themeFromCtx;

  return (
    <button
      className={clsx(buttonStyle, buttonVariantThemeVariants[`${variant}-${theme}`])}
      {...restProps}
    />
  );
};

ButtonGroup.Button = Button;

export const RenderButtonGroupWithVanillaExtract = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <ButtonGroup>
        <ButtonGroup.Button>버튼 1</ButtonGroup.Button>
        <ButtonGroup.Button>버튼 2</ButtonGroup.Button>
        <ButtonGroup.Button>버튼 3</ButtonGroup.Button>
        <ButtonGroup.Button>버튼 4</ButtonGroup.Button>
      </ButtonGroup>

      <ButtonGroup theme='blue'>
        <ButtonGroup.Button>버튼 1</ButtonGroup.Button>
        <ButtonGroup.Button>버튼 2</ButtonGroup.Button>
        <ButtonGroup.Button>버튼 3</ButtonGroup.Button>
        <ButtonGroup.Button>버튼 4</ButtonGroup.Button>
      </ButtonGroup>

      <ButtonGroup theme='red'>
        <ButtonGroup.Button>버튼 1</ButtonGroup.Button>
        <ButtonGroup.Button>버튼 2</ButtonGroup.Button>
        <ButtonGroup.Button>버튼 3</ButtonGroup.Button>
        <ButtonGroup.Button>버튼 4</ButtonGroup.Button>
      </ButtonGroup>

      <ButtonGroup variant='weak'>
        <ButtonGroup.Button>버튼 1</ButtonGroup.Button>
        <ButtonGroup.Button>버튼 2</ButtonGroup.Button>
        <ButtonGroup.Button>버튼 3</ButtonGroup.Button>
        <ButtonGroup.Button>버튼 4</ButtonGroup.Button>
      </ButtonGroup>

      <ButtonGroup
        variant='weak'
        theme='blue'>
        <ButtonGroup.Button>버튼 1</ButtonGroup.Button>
        <ButtonGroup.Button>버튼 2</ButtonGroup.Button>
        <ButtonGroup.Button>버튼 3</ButtonGroup.Button>
        <ButtonGroup.Button>버튼 4</ButtonGroup.Button>
      </ButtonGroup>

      <ButtonGroup
        variant='weak'
        theme='red'>
        <ButtonGroup.Button>버튼 1</ButtonGroup.Button>
        <ButtonGroup.Button>버튼 2</ButtonGroup.Button>
        <ButtonGroup.Button>버튼 3</ButtonGroup.Button>
        <ButtonGroup.Button>버튼 4</ButtonGroup.Button>
      </ButtonGroup>
    </div>
  );
};

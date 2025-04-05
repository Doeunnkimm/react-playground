import { createContext, useContext } from 'react';
import { ButtonTheme, ButtonVariant } from './types';

interface ButtonGroupContext {
  variant: ButtonVariant;
  theme: ButtonTheme;
}

export const ButtonGroupContext = createContext<ButtonGroupContext | null>(null);

export const useButtonGroupContext = () => {
  const context = useContext(ButtonGroupContext);
  if (context == null) {
    throw new Error('ButtonGroupContext is not found');
  }
  return context;
};

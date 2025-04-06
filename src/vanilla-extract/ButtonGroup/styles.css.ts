import { style, styleVariants } from '@vanilla-extract/css';

import { colors } from 'theme';

interface ButtonVariant {
  backgroundColor: string;
  color?: string;
  hoverBackgroundColor: string;
  borderColor: string;
}

const createButtonVariant = (variant: ButtonVariant) => ({
  backgroundColor: variant.backgroundColor,
  color: variant.color,
  borderColor: variant.borderColor,
  selectors: {
    '&:hover': {
      backgroundColor: variant.hoverBackgroundColor,
    },
  },
});

export const buttonVariantThemeVariants = styleVariants({
  'fill-grey': createButtonVariant({
    backgroundColor: colors.grey200,
    hoverBackgroundColor: colors.grey300,
    borderColor: colors.white,
  }),
  'fill-blue': createButtonVariant({
    backgroundColor: colors.blue500,
    color: colors.white,
    hoverBackgroundColor: colors.blue600,
    borderColor: colors.white,
  }),
  'fill-red': createButtonVariant({
    backgroundColor: colors.red500,
    color: colors.white,
    hoverBackgroundColor: colors.red600,
    borderColor: colors.white,
  }),
  'weak-grey': createButtonVariant({
    backgroundColor: colors.grey200,
    hoverBackgroundColor: colors.grey300,
    borderColor: colors.grey400,
  }),
  'weak-blue': createButtonVariant({
    backgroundColor: colors.blue300,
    color: colors.white,
    hoverBackgroundColor: colors.blue400,
    borderColor: colors.blue400,
  }),
  'weak-red': createButtonVariant({
    backgroundColor: colors.red300,
    color: colors.white,
    hoverBackgroundColor: colors.red400,
    borderColor: colors.red400,
  }),
});

export const buttonStyle = style({
  selectors: {
    'div > &': {
      borderRadius: 0,
    },
    '&:first-of-type': {
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
    },
    '&:last-of-type': {
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
    },
    '&:not(:first-of-type)': {
      borderWidth: '1px',
      borderLeftStyle: 'solid',
    },
  },
});

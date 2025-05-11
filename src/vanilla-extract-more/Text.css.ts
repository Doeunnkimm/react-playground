import { createVar, style } from '@vanilla-extract/css';
import { RecipeVariants, recipe } from '@vanilla-extract/recipes';

export type TextStyleProps = RecipeVariants<typeof textRecipe> & {
  color?: string;
};

export const textColorVar = createVar();
export const textStyle = style({
  color: textColorVar,
});

export const textRecipe = recipe({
  variants: {
    variant: {
      'title-24': {
        fontSize: '24px',
        lineHeight: '135%',
      },
      'title-20': {
        fontSize: '20px',
        lineHeight: '140%',
      },
      'title-18': {
        fontSize: '18px',
        lineHeight: '135%',
      },
      'subtitle-16': {
        fontSize: '16px',
        lineHeight: '135%',
      },
      'subtitle-14': {
        fontSize: '14px',
        lineHeight: '140%',
      },
      'body-16': {
        fontSize: '16px',
        lineHeight: '150%',
      },
      'body-14': {
        fontSize: '14px',
        lineHeight: '155%',
      },
      'caption-13': {
        fontSize: '13px',
        lineHeight: '150%',
      },
      'caption-12': {
        fontSize: '12px',
        lineHeight: '135%',
      },
      'label-16': {
        fontSize: '16px',
        lineHeight: '135%',
      },
      'label-14': {
        fontSize: '14px',
        lineHeight: '140%',
      },
      'label-12': {
        fontSize: '12px',
        lineHeight: '135%',
      },
      'label-11': {
        fontSize: '11px',
        lineHeight: '130%',
      },
    },
    fontWeight: {
      regular: {
        fontWeight: 400,
      },
      medium: {
        fontWeight: 500,
      },
      semibold: {
        fontWeight: 600,
      },
      bold: {
        fontWeight: 700,
      },
    },
  },
});

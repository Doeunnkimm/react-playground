import { createGlobalTheme } from '@vanilla-extract/css';

export const colors = createGlobalTheme(':root', {
  white: '#ffffff',

  grey100: '#f0f0f0',
  grey200: '#d9d9d9',
  grey300: '#bfbfbf',
  grey400: '#a6a6a6',
  grey500: '#8c8c8c',
  grey600: '#737373',
  grey700: '#595959',

  blue100: '#E6F4FF',
  blue200: '#BAE0FF',
  blue300: '#93C9FF',
  blue400: '#66B0FF',
  blue500: '#3399FF',
  blue600: '#0080FF',
  blue700: '#0066CC',

  red100: '#FFF6F6',
  red200: '#FFECEC',
  red300: '#FF6F6F',
  red400: '#FF5353',
  red500: '#F63C3C',
  red600: '#E02E2E',
  red700: '#B10000',
});

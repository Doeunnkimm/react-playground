import { createGlobalTheme } from '@vanilla-extract/css';

export const colors = createGlobalTheme(':root', {
  grey100: '#f5f5f5',
  grey200: '#e0e0e0',
  grey300: '#c0c0c0',
  grey400: '#a0a0a0',
  grey500: '#808080',
  grey600: '#606060',
  grey700: '#404040',

  blue100: '#e6f3ff',
  blue200: '#cce7ff',
  blue300: '#99cfff',
  blue400: '#66b7ff',
  blue500: '#339fff',
  blue600: '#0087ff',
  blue700: '#0066cc',

  red100: '#ffe6e6',
  red200: '#ffcccc',
  red300: '#ff9999',
  red400: '#ff6666',
  red500: '#ff3333',
  red600: '#ff0000',
  red700: '#cc0000',
});

/**
 * @NOTE
 * `css.ts`로 파일을 만들어야 한다. [github](https://github.com/vanilla-extract-css/vanilla-extract)에는 아래와 같은 내용이 있었다.
 *
 * > 💡 Once you've configured your build tooling, these .css.ts files will be evaluated at build time. None of the code in these files will be included in your final bundle. Think of it as using TypeScript as your preprocessor instead of Sass, Less, etc.
 *
 * -> config로 커스텀할 수 있을 줄 알았는데 불가능한 것 같다. 🤔
 *
 */

import { style } from '@vanilla-extract/css';

// Emotion 스타일링 예시
/*
import { css } from '@emotion/react';

const emotionButtonCss = css({
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '#45a049',
  },
});
*/

export const buttonStyle = style({
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
  ':hover': {
    backgroundColor: '#45a049',
  },
});

// Emotion 스타일링 예시
/*
import { css } from '@emotion/react';

const containerCss = css({
  '& > button': {
    backgroundColor: 'red',
  },
});
*/

/**
 * @NOTE
 * emotion에서는 '&' 나를 기준으로 하위 요소들에 대한 스타일링이 가능했는데
 * vanilla-extract에서는 거꾸로다... 🫢
 */
export const buttonStyle2 = style({
  selectors: {
    'div > &': {
      backgroundColor: 'red',
    },
  },
});

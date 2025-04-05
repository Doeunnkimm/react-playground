import { style } from '@vanilla-extract/css';

/**
 * head에 style 태그가 하나 삽입된다.
 * 빌드 타임에 css를 생성하고, 하나의 최적화된 css 파일을 생성한다.
 */
export const boxStyle = style({
  width: '100px',
  height: '100px',
  backgroundColor: 'skyblue',
  margin: '4px',
  border: '1px solid gray',
  selectors: {
    '&[data-odd]': {
      backgroundColor: 'salmon',
    },
    '&:not([data-odd])': {
      backgroundColor: 'skyblue',
    },
  },
});

/**
 * 또 다른 스타일 규칙을 만들어도 ve.css.ts.vanilla.css 파일 하나에 모두 추가되게 된다.
 */
export const h1Style = style({
  color: 'blue',
});

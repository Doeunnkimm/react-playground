import { css } from '@emotion/react';

/**
 * head 아래에 style 태그가 총 3개 삽입되는 것을 확인할 수 있었다.
 * 기본스타일 + data-odd 스타일 + :not([data-odd]) 스타일
 *
 * 이렇게 분리되는 이유는
 * 선택자를 최적화하여 각 선태가 유형별로 별도의 style 태그를 생성해서 css 엔진이 선택자를 더 효율적으로 처리하기 위함이라고 한다.
 */
export const boxCss = css({
  width: '100px',
  height: '100px',
  margin: '4px',
  border: '1px solid gray',

  '&[data-odd]': {
    backgroundColor: 'skyblue',
  },
  '&:not([data-odd])': {
    backgroundColor: 'salmon',
  },
});

/**
 * 또 하나의 style 태그로 삽입되었다.
 */
export const h1Css = css({
  color: 'blue',
});

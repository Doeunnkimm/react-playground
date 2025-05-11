import { ComplexStyleRule, createContainer, createVar, fallbackVar, style, styleVariants } from '@vanilla-extract/css';
import { RecipeVariants, recipe } from '@vanilla-extract/recipes';
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

import { Variant } from './VanillaExtractMore';

/**
 * https://vanilla-extract.style/ 을 톺아보며 베스트 프렉티스를 찾아보자
 */

/**
 * 1. style, createVar, fallbackVar
 */
const scopedVar = createVar('custom-debug-id');

export const a = style({
  width: '100px',
  height: '100px',
  backgroundColor: 'red',
  vars: {
    // css variable을 설정해서 하위에서 같이 사용할 수 있다.
    [scopedVar]: 'green',
  },
  ':hover': {
    backgroundColor: 'blue',
  },
});

export const b = style({
  width: '30px',
  height: '30px',
  backgroundColor: fallbackVar(scopedVar, 'gray'),
});

/**
 * 2. styleVariants
 * - `receipe`랑 비슷해서 헷갈렸는데, styleVariants는 단순 key-value 형태
 * - receipe는 base, variants, defaultVariants 등 다양한 옵션을 제공한다.
 * - 복잡한 조합 스타일링을 해야 한다면 receipe
 * - styleVariants는 key에 대한 value를 동일한 구조로 반복 작성해야 한다.
 */
const cBase = style({
  width: '100px',
  height: '100px',
});

// NOTE: 타입을 정확하게 지정하면 좋겠는데, 이렇게 하면 어렵다.
// value 별로 다 별도의 스타일 규칙으로 생성된다. 클래스네임이 다 다르다.
// Usage: className={c[variant]}
export const c = styleVariants<Record<Variant, ComplexStyleRule>>({
  primary: [
    cBase,
    {
      backgroundColor: 'red',
    },
  ],
  secondary: [
    cBase,
    {
      backgroundColor: 'blue',
    },
  ],
  tertiary: [
    cBase,
    {
      backgroundColor: 'green',
    },
  ],
});

/**
 * 3. createContainer
 * - 특정 요소의 부모 사이즈를 기준으로 스타일을 조건부 적용하고 싶을 때 사용
 */
export const cardContainer = createContainer();

export const card = style({
  // ㅋㅋ.. 최신 스타일이구나
  containerType: 'inline-size', // 컨테이너 쿼리 활성화
  containerName: cardContainer,
  padding: '16px',
  border: '1px solid gray',
  display: 'flex',
});

export const cardContent = style({
  width: '300px',
  height: '300px',
  border: '1px solid orange',
  backgroundColor: 'green',
  '@container': {
    // container query로 child의 스타일을 정한다.
    [`${cardContainer} (max-width: 600px)`]: {
      backgroundColor: 'red',
    },
    [`${cardContainer} (max-width: 300px)`]: {
      backgroundColor: 'blue',
    },
  },
});

/**
 * 4. Sprinkles
 * - 스타일에 대한 가능한 집합을 정의할 수 있다.
 *  * - 런타임에서 사용할 수도 있고 style 내부에서도 사용할 수 있다.
 */
const typeScaleProperties = defineProperties({
  properties: {
    fontSize: {
      '12': { fontSize: '12px', lineHeight: '18px' },
      '13': { fontSize: '13px', lineHeight: '18px' },
      '14': { fontSize: '14px', lineHeight: '18px' },
      '16': { fontSize: '16px', lineHeight: '20px' },
      '18': { fontSize: '18px', lineHeight: '24px' },
      '20': { fontSize: '20px', lineHeight: '24px' },
      '23': { fontSize: '23px', lineHeight: '29px' },
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      heavy: '800',
    },
  },
});
export const typeScaleSprinkles = createSprinkles(typeScaleProperties);

/**
 * 5. Recipes, RecipeVariants(type)
 * - 복잡한 스타일 조합을 정의할 때 유용하다.
 * - 디자인 시스템에서 prop에 따라 스타일을 지정할 때 유용할 것 같다.
 * - base, variants, defaultVariants, compoundVariants 등 다양한 옵션을 제공한다.
 */
export type ButtonBaseProps = RecipeVariants<typeof buttonRecipe>;
export const buttonRecipe = recipe({
  base: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '80px',
    padding: '0 16px',
    height: '40px',
    borderRadius: '8px',
    transition: 'background-color 0.3s, border-color 0.3s',
    fontSize: '14px',
    backgroundColor: 'transparent',
    ':hover': {
      backgroundColor: 'transparent',
    },
  },
  variants: {
    variant: {
      fill: {
        color: 'white',
      },
      weak: {},
      border: {},
    },
    theme: {
      grey: {},
      red: {},
      blue: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        variant: 'fill',
        theme: 'grey',
      },
      style: {
        backgroundColor: 'rgb(24, 24, 27)',
        ':hover': {
          backgroundColor: 'color(srgb 0.0941176 0.0941176 0.105882 / 0.9)',
        },
        ':disabled': {
          backgroundColor: 'color(srgb 0.0941176 0.0941176 0.105882 / 0.9)',
        },
      },
    },
    {
      variants: {
        variant: 'fill',
        theme: 'blue',
      },
      style: {
        backgroundColor: 'rgb(37, 99, 235)',
        ':hover': {
          backgroundColor: 'color(srgb 0.145098 0.388235 0.921569 / 0.9)',
        },
        ':disabled': {
          backgroundColor: 'color(srgb 0.0941176 0.0941176 0.105882 / 0.9)',
        },
      },
    },
    {
      variants: {
        variant: 'fill',
        theme: 'red',
      },
      style: {
        backgroundColor: 'rgb(220, 38, 38)',
        ':hover': {
          backgroundColor: 'color(srgb 0.862745 0.14902 0.14902 / 0.9)',
        },
        ':disabled': {
          backgroundColor: 'color(srgb 0.0941176 0.0941176 0.105882 / 0.9)',
        },
      },
    },
    {
      variants: {
        variant: 'weak',
        theme: 'grey',
      },
      style: {
        backgroundColor: 'rgb(244, 244, 245)',
        ':hover': {
          backgroundColor: 'rgb(228, 228, 231)',
        },
        ':disabled': {
          backgroundColor: 'rgb(244, 244, 245)',
        },
      },
    },
    {
      variants: {
        variant: 'weak',
        theme: 'blue',
      },
      style: {
        backgroundColor: 'rgb(219, 234, 254)',
        ':hover': {
          backgroundColor: 'rgb(191, 219, 254)',
        },
        ':disabled': {
          backgroundColor: 'rgb(239, 243, 255)',
        },
      },
    },
    {
      variants: {
        variant: 'weak',
        theme: 'red',
      },
      style: {
        backgroundColor: 'rgb(254, 226, 226)',
        ':hover': {
          backgroundColor: 'rgb(254, 202, 202)',
        },
        ':disabled': {
          backgroundColor: 'rgb(254, 226, 226)',
        },
      },
    },
    {
      variants: {
        variant: 'border',
        theme: 'grey',
      },
      style: {
        border: '1px solid rgb(229, 231, 235)',
        ':hover': {
          borderColor: 'rgb(209, 213, 219)',
        },
        ':disabled': {
          borderColor: 'rgb(229, 231, 235)',
        },
      },
    },
    {
      variants: {
        variant: 'border',
        theme: 'blue',
      },
      style: {
        border: '1px solid rgb(219, 234, 254)',
        ':hover': {
          borderColor: 'rgb(191, 219, 254)',
        },
        ':disabled': {
          borderColor: 'rgb(219, 234, 254)',
        },
      },
    },
    {
      variants: {
        variant: 'border',
        theme: 'red',
      },
      style: {
        border: '1px solid rgb(254, 226, 226)',
        ':hover': {
          borderColor: 'rgb(254, 202, 202)',
        },
      },
    },
  ],
});

import { ComponentPropsWithoutRef, ElementType, HTMLAttributes, Ref, forwardRef } from 'react';
import { TextStyleProps, textColorVar, textRecipe, textStyle } from './Text.css';

import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';

type PolymorphicComponentPropsWithRef<Props, Tag extends ElementType> = (props: ComponentPropsWithoutRef<Tag> & Props & { as?: Tag }, ref: Ref<any>) => JSX.Element;

export function forwardRefWithAs<Props, Tag extends ElementType>(component: PolymorphicComponentPropsWithRef<Props, Tag>) {
  // @ts-ignore
  return forwardRef(component);
}

type TextProps = HTMLAttributes<HTMLSpanElement> & TextStyleProps;
type AllowedTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label';

export const Text = forwardRefWithAs<TextProps, AllowedTags>((props, ref) => {
  const { className: classNameFromProps, as: Tag = 'span', variant = 'body-16', fontWeight = 'regular', color = '#393A3F', style: styleFromProps, ...restProps } = props;

  const style = {
    // NOTE: theme-aware하지 않은 순수한 string 컬러를 써야할 때
    ...assignInlineVars({ [textColorVar]: color }),
    ...styleFromProps,
  };

  return (
    <Tag
      ref={ref}
      className={clsx(textStyle, textRecipe({ fontWeight }), classNameFromProps)}
      style={style}
      {...restProps}
    />
  );
});

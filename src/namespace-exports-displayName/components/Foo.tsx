import { forwardRef } from 'react';

interface FooProps {
  name?: string;
  age?: number;
}

export const TestFoo = forwardRef<HTMLDivElement, FooProps>((props, ref) => {
  const { name = 'foo', age = 10 } = props;

  return (
    <div ref={ref}>
      <h1>{name}</h1>
      <h2>{age}</h2>
    </div>
  );
});

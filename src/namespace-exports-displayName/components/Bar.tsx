import { forwardRef } from 'react';

interface BarProps {
  name?: string;
  age?: number;
}

export const TestBar = forwardRef<HTMLDivElement, BarProps>((props, ref) => {
  const { name = 'bar', age = 20 } = props;

  return (
    <div ref={ref}>
      <h1>{name}</h1>
      <h2>{age}</h2>
    </div>
  );
});

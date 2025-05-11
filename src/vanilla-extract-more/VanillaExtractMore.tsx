import { a, b, c, card, cardContent, typeScaleSprinkles } from './more.css';

import { useState } from 'react';
import { Button } from './Button';
import { Text } from './Text';

export type Variant = 'primary' | 'secondary' | 'tertiary';

console.log(a); // more_a__t3t6fa1 << string으로 평가된다.

export const VanillaExtractMore = () => {
  const [variant, setVariant] = useState<Variant>('primary');
  return (
    <div style={{ padding: '16px' }}>
      <div className={a}>
        <div className={b} />
      </div>

      <div>
        <div className={c[variant]} />
        <button onClick={() => setVariant('primary')}>primary</button>
        <button onClick={() => setVariant('secondary')}>secondary</button>
        <button onClick={() => setVariant('tertiary')}>tertiary</button>
      </div>

      <div className={card}>
        {Array.from({ length: 10 }).map((_, idx) => (
          <div
            key={idx}
            className={cardContent}
          />
        ))}
      </div>

      <p className={typeScaleSprinkles({ fontSize: '23', fontWeight: 'bold' })}>Hello World</p>

      <div style={{ display: 'flex', gap: '10px', paddingBottom: '10px' }}>
        <Button>앗!</Button>
        <Button theme='blue'>레이블</Button>
        <Button theme='red'>레이블</Button>
      </div>

      <div style={{ display: 'flex', gap: '10px', paddingBottom: '10px' }}>
        <Button variant='weak'>앗!</Button>
        <Button
          variant='weak'
          theme='blue'>
          레이블
        </Button>
        <Button
          variant='weak'
          theme='red'>
          레이블
        </Button>
      </div>

      <div style={{ display: 'flex', gap: '10px', paddingBottom: '10px' }}>
        <Button variant='border'>앗!</Button>
        <Button
          variant='border'
          theme='blue'>
          레이블
        </Button>
        <Button
          variant='border'
          theme='red'>
          레이블
        </Button>
      </div>

      <Text
        variant='title-24'
        fontWeight='bold'
        color='#e0d'>
        텍스트 컴포넌트
      </Text>
    </div>
  );
};

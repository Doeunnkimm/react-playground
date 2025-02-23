import { ReactElement, useState } from 'react';

type Colors = 'red' | 'blue' | 'green' | 'orange';

export const SameKeyProp = () => {
  const [items, setItems] = useState<Colors[]>([]);

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      {/* 캔버스 역할 */}
      <section style={{ flex: 1 }}>
        {items.map((color) => (
          <SwitchCase
            key={color}
            value={color}
            caseBy={{
              red: (
                <div style={{ width: '150px', height: '150px', backgroundColor: 'red', color: 'white' }}>
                  저는 Red인데요, 150px이에요
                </div>
              ),
              blue: (
                <div style={{ width: '80px', height: '80px', backgroundColor: 'blue', color: 'white' }}>
                  저는 Blue인데요, 80px이에요
                </div>
              ),
              green: (
                <div style={{ width: '100px', height: '100px', backgroundColor: 'green' }}>
                  저는 Green인데요, 100px이에요
                </div>
              ),
              orange: (
                <div style={{ width: '200px', height: '200px', backgroundColor: 'orange' }}>
                  저는 Orange인데요, 200px이에요
                </div>
              ),
            }}
          />
        ))}
      </section>

      {/* 패널 역할 */}
      <section style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <button onClick={() => setItems((prev) => [...prev, 'red'])}>컬러 블록 추가하기 +1</button>
          <button onClick={() => setItems((prev) => prev.slice(0, -1))}>컬러 블록 추가하기 빼기 -1</button>
        </div>

        <div>{`items: [${items.join(', ')}]`}</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
          {items.map((_, index) => (
            <select
              key={index}
              name={`${index + 1}번째 컬러 선택`}
              value={items[index]}
              onChange={(e) => {
                const selectedColor = e.target.value as Colors;
                setItems((prev) => prev.map((color, i) => (i === index ? selectedColor : color)));
              }}
              style={{ border: '1px solid grey', padding: '8px', borderRadius: '8px', width: '200px' }}>
              <option value='red'>red</option>
              <option value='blue'>blue</option>
              <option value='green'>green</option>
              <option value='orange'>orange</option>
            </select>
          ))}
        </div>
      </section>
    </div>
  );
};

interface SwitchCaseProps<T extends string | number> {
  caseBy: Partial<Record<T, ReactElement | null>>;
  value: T;
  defaultComponent?: ReactElement | null;
}
const SwitchCase = <T extends string | number>({ value, caseBy, defaultComponent }: SwitchCaseProps<T>) => {
  if (value == null) {
    return defaultComponent;
  }
  return caseBy[value] ?? defaultComponent;
};

import { useState } from 'react';
import { flushSync } from 'react-dom';

export const FlushSync = () => {
  const [count, setCount] = useState(0);

  const handleClickWithoutFlush = () => {
    setCount((prevCount) => {
      console.log('Before state update (without flush):', prevCount);
      return prevCount + 1;
    });
    // 이 시점에서 DOM은 아직 업데이트되지 않았습니다.
    console.log('Without flushSync:', count + 1); // 이전 값이 나올 수 있습니다.
  };

  const handleClickWithFlush = () => {
    flushSync(() => {
      setCount((prevCount) => {
        console.log('Before state update (with flush):', prevCount);
        return prevCount + 1;
      });
    });
    // 이 시점에서 이미 DOM이 업데이트된 상태입니다.
    console.log('With flushSync:', count + 1); // 업데이트된 값이 나올 수 있습니다.
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClickWithoutFlush}>Increment without flushSync</button>
      <button onClick={handleClickWithFlush}>Increment with flushSync</button>
    </div>
  );
};

import { useEffect, useState } from 'react';

export const CleanUpFunction = () => {
  const [state, setState] = useState(0);

  console.log('state', state); // 0 > 1

  const handleState = () => {
    setState((prev) => prev + 1);
  };

  useEffect(() => {
    return () => {
      console.log('나야 클린업 함수', state); // 의존성 배열 내 값이 변경되면 매번 이전 상태값을 기반으로 호출된다.
    };
  }, [state]);

  return <button onClick={handleState}>state+1</button>;
};

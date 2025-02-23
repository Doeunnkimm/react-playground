import { useRef } from 'react';

export const ReflowTrigger = () => {
  const boxRef = useRef<HTMLDivElement>(null);

  // 1️⃣ 스타일 변경 후 즉시 offsetWidth 읽기 (리플로우 발생 가능)
  const handleReflowTest = () => {
    if (boxRef.current == null) return;

    boxRef.current.style.width = '200px';
    console.log(boxRef.current.offsetWidth);
  };

  // 2️⃣ 그냥 offsetWidth 읽기
  const handleNoReflowTest = () => {
    if (boxRef.current == null) return;
    console.log(boxRef.current.offsetWidth);
  };

  // 3️⃣ paint만 수행하기
  const handleChangeBackground = () => {
    if (boxRef.current == null) return;
    boxRef.current.style.background = 'orange';
  };

  return (
    <div>
      <h2>React 리플로우 테스트</h2>
      <div
        ref={boxRef}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'lightblue',
          transition: 'width 0.3s',
        }}
      />
      <button onClick={handleReflowTest}>DOM 조작하고 offsetWidth 바로 읽기</button>
      <button onClick={handleNoReflowTest}>그냥 offsetWidth 읽기</button>
      <button onClick={handleChangeBackground}>paint만 트리거하기</button>
    </div>
  );
};

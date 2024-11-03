import { useState } from 'react';

export const UpdateState = () => {
  const [isRedButton, setIsRedButton] = useState(false);

  const handleClick = () => {
    setIsRedButton((prev) => !prev);
    setTimeout(() => {
      console.log('3초 끝!');
    }, 3000);
  };

  return (
    <button
      onClick={handleClick}
      style={{ backgroundColor: isRedButton ? 'red' : undefined }}>
      나는 빨간 버튼일까요?
    </button>
  );
};

/**
 * @NOTE
 *
 * react 공식문서에서는 이벤트 핸들러의 호출이 모두 끝나야 상태 업데이트가 이루어진다고 했다.
 * 내부에 비동기 로직이 있다면? 어떻게 될까
 *
 * 기다리는 것 없이 바로 상태가 업데이트된다.
 */

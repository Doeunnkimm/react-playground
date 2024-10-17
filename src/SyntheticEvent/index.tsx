import { useEffect } from 'react';

export const SyntheticEvent = () => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('React Button Clicked');
  };

  useEffect(() => {
    const nativeListener = (e: Event) => console.log('Native Listener on Button');
    const button = document.getElementById('testButton')!;

    // 버튼에 직접 native 이벤트 리스너 등록
    button.addEventListener('click', nativeListener);

    const rootListener = (e: Event) => console.log('Root Listener:', e.target);
    document.addEventListener('click', rootListener);

    return () => {
      button.removeEventListener('click', nativeListener);
      document.removeEventListener('click', rootListener);
    };
  }, []);

  return (
    <button
      id='testButton'
      onClick={handleClick}>
      Click Me
    </button>
  );
};

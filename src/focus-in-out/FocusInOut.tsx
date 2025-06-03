import { useEffect, useRef } from 'react';

export const FocusInOut = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /**
     * Native 이벤트 기준에서는 버블링이 되지 않는다.
     *  - focus, blur : 버블링 X
     * - focusin, focusout: 버블링 O
     *
     * 포커스 트랩을 구현할 때 focusin, focusout을 사용한다.
     * - 리액트 합성 이벤트는 리액트 컴포넌트 트리 내에서만 동작하기 때문에 DOM 요소 제어에 제한이 있을 수 있다.
     * - 따라서 포커스 트랩 구현 시 document에 이벤트 리스너를 등록하여 네이티브 이벤트를 사용하며
     * - 모든 DOM 요소의 포커스 이벤트를 정확하게 감지해야 한다. (body로 빠지는 경우, 포커스 받고 있는 요소가 없다는 의미이고 이때도 다시 container로 포커스를 가져온다.)
     */
    const handleFocus = (event: FocusEvent) => {
      //   console.log('Native Event (focus) --> ', event.target);
    };
    const handleBlur = (event: FocusEvent) => {
      //   console.log('Native Event (blur) --> ', event.target);
    };
    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      console.log('Native Event (focusin) --> ', target);
      // `contains` 라는 DOM API를 사용하여 내가 트랩핑하고 싶은 컨테이너 요소에 포커스된 요소가 포함되어 있는지를 알 수 있다.
      if (container.current?.contains(target)) {
        console.log('focus in container');
      }
      // docuemtn.activeElement는 현재 포커스된 요소를 가르킨다.
      console.log('activeElement --> ', document.activeElement);
    };
    const handleFocusOut = (event: FocusEvent) => {
      //   console.log('Native Event (focusout) --> ', event.target);
    };

    document.addEventListener('focus', handleFocus);
    document.addEventListener('blur', handleBlur);
    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      document.removeEventListener('focus', handleFocus);
      document.removeEventListener('blur', handleBlur);
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  return (
    <div
      ref={container}
      /**
       * React Synthetic Event에서는 버블링이 된다.
       */
      onFocus={(event) => console.log('React Synthetic Event (focus) --> ', event.target)}
      onBlur={(event) => console.log('React Synthetic Event (blur) --> ', event.target)}>
      <button>Button</button>
      <input placeholder='Input' />
    </div>
  );
};

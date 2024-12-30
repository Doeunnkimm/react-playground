import React from 'react';

export const VirtualDom = () => {
  /**
   * @NOTE
   * 아래와 같이 하면 가상 DOM 내 있는 노드 내부를 확인할 수 있다.
   * 실제 DOM 노드는 querySelect하여 console.dir하게 되면 확인할 수 있다.
   *
   * 가상 DOM 내 노드는 이벤트 리스너나 조작을 위한 메서드 없이 비교를 위한 노드 정보만을 가지고 있다.
   * 내부에는 _ownerf라는 필드로 부모의 FiberNode가 있으며 child로 하여 FiberNode가 또 담겨있다.
   */
  const element = React.createElement('div', { id: 'myDiv' }, 'Hello, World!');
  console.log(element);

  return <div id='myDiv'>Hello World!</div>;
};

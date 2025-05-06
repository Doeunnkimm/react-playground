import { ReactElement, ReactNode, createElement, isValidElement } from 'react';

interface ReactNodeWrapperProps {
  /**
   * 1. ReactNode
   * - JSX + 원시타입 + 배열 + null/undefined 등 모든 타입을 허용한다.
   * - 디자인 시스템에서는 렌더링이 가능한 모든 타입을 유연하게 허용하기 위해 자주 사용되는 타입인 것 같다
   * - 텍스트만 올 것이라고 생각해도 string이 아닌 ReactNode를 사용하는 것이 유연하다.
   *    - 예를 들어, 문장 중 일부 텍스트를 bold 처리하거나 다른 색상을 입혀야 할 때, string일 경우 불가능하지만, ReactNode를 사용하면 단순 string부터 이러한 커스텀까지도 허용하기 때문에 훨씬 유연하다.
   * - 기능이 아닌 렌더링이 목적인 prop이라면 ReactNode를 사용하는 것이 유연하다.
   */
  wrapper: ReactNode;
  children: ReactNode;
}

export const ReactNodeWrapper = (props: ReactNodeWrapperProps) => {
  const { wrapper, children } = props;
  /**
   * isValidElement는 주어진 객체가 React 엘리먼트인지 확인
   * - wrapper가 React 엘리먼트가 아닌 경우(예: 문자열, 숫자 등)에는 createElement를 사용할 수 없기 때문에 이 검사가 필요
   * - 이 검사가 없으면 wrapper가 원시 타입일 때 타입 에러가 발생할 수 있다.
   *
   * 아래 타입은 ReactElement의 타입으로, isValidElement가 true라면 다음 타입을 가지고 있음을 의미한다.
   *  type: T;
   *  props: P;
   *  key: string | null;
   */
  if (isValidElement(wrapper)) {
    return createElement(wrapper.type, wrapper.props, children);
  }

  return children;
};

interface ReactElementWrapperProps {
  /**
   * 2. ReactElement
   * - React.createElement로 반환된 결과 타입
   * - 즉, React.createElement가 호출되어 만들어진 결과만이 이 타입으로 허용된다.
   * - 즉, 원시 타입을 허용되지 않고, React는 JSX를 createElement로 변환하기 때문에
   *    - <MyComponent />나 <div />는 허용되지만, '스트링'과 같은 원시는 허용되지 않는다.
   * - 지금처럼 조작(래핑, props 조집)을 해야 할 때는 type, props, key를 가지고 있는 ReactElement를 사용하는 것이 명확할 것 같다.
   *    물론 ReactNode로 받고 내부에서 isValidElement로 검사하는 방법도 있지만,
   *    개발자 입장에서는 타입 에러를 즉시 확인할 수 있는 ReactElement를 사용하는 것이 더 명확
   *    이렇게 하면 코드 내부 구현을 살펴볼 필요 없이 컴파일 단계에서 잘못된 타입 사용을 바로 알 수 있다. (🤔 뭐야 타입 에러는 안 나는데 왜 안돼? 방지)
   * - ReactElement 타입을 먼저 고려하고 쓰지 못하는 상황이라면 JSX.Element를 사용할 것 같다.
   *   예를 들어, 타사 라이브러리에서 JSX.Element 타입을 요구하는 경우나,
   *   컴포넌트의 반환 타입을 명시할 때(function Component(): JSX.Element)와 같은 상황에서 사용할 수 있다.
   */
  wrapper: ReactElement;
  children: ReactNode;
}

export const ReactElementWrapper = (props: ReactElementWrapperProps) => {
  const { wrapper, children } = props;
  /**
   * ReactElement로 타입을 걸어둘 경우 `isValidElement`를 검사하지 않아도 된다.
   * 왜냐하면 그 자체가 isValidElement를 검사하는 것이기 때문이다.
   */
  return createElement(wrapper.type, wrapper.props, children);
};

interface JSXElementWrapperProps {
  /**
   * 3. JSX.Element
   * - JSX 문법으로 생성된 요소
   * - ReactElement와 거의 동일하지만, JSX.Element는 React.ReactElement<any, any>의 타입 별칭
   * - 즉, JSX.Element는 ReactElement의 제네릭 타입 매개변수를 any로 고정한 것
   * - 구분해서 사용하는 방법:
   *   1. 컴포넌트의 반환 타입으로는 JSX.Element를 주로 사용 (예: function MyComponent(): JSX.Element)
   *   2. 구체적인 타입 정보가 필요한 경우 ReactElement<P, T>를 사용 (예: props 조작이 필요한 경우)
   *   3. 일반적인 props 타입에서는 ReactElement가 더 명확한 타입 체크를 제공
   *   4. 단순히 JSX를 받는 경우에는 JSX.Element로도 충분함
   * - isValidElement로도 true를 반환한다.
   */
  wrapper: JSX.Element;
  children: ReactNode;
}

export const JSXElementWrapper = (props: JSXElementWrapperProps) => {
  const { wrapper, children } = props;
  return createElement(wrapper.type, wrapper.props, children);
};

import { JSXElementWrapper, ReactElementWrapper, ReactNodeWrapper } from './Wrapper';

import { TestWrapper } from './TestWrapper';

export const ReactTypes = () => {
  return (
    <>
      {/* 1. ReactNode를 허용하면 모든 타입을 허용할 수 있다.  */}
      <ReactNodeWrapper wrapper={<div style={{ backgroundColor: 'blueviolet' }} />}>JSX 엘리먼트를 래핑</ReactNodeWrapper>
      <ReactNodeWrapper wrapper={<TestWrapper />}>리액트 엘리먼트를 래핑</ReactNodeWrapper>
      <ReactNodeWrapper wrapper={'스트링'}>스트링을 래핑, 그런데 이건 isValidElement가 false여서 그대로 반환될 것</ReactNodeWrapper>

      {/* 2. ReactElement를 허용하면 JSX로 쓸 수 있는 것들만 허용한다. 즉, 원시타입은 허용 X */}
      <ReactElementWrapper wrapper={<div style={{ backgroundColor: 'blueviolet' }} />}>JSX 엘리먼트를 래핑</ReactElementWrapper>
      <ReactElementWrapper wrapper={<TestWrapper />}>JSX 엘리먼트를 래핑</ReactElementWrapper>
      {/* <ReactElementWrapper wrapper="스트링">JSX 엘리먼트를 래핑</ReactElementWrapper> << 아예 타입 에러 발생 */}

      {/* 3. JSX.Element로 허용하면 ReactElement와 거의 동일하지만, JSX.Element는 React.ReactElement<any, any>의 타입 별칭 */}
      <JSXElementWrapper wrapper={<div style={{ backgroundColor: 'blueviolet' }} />}>JSX 엘리먼트를 래핑</JSXElementWrapper>
      <JSXElementWrapper wrapper={<TestWrapper />}>JSX 엘리먼트를 래핑</JSXElementWrapper>
      {/* <ReactElementWrapper wrapper="스트링">JSX 엘리먼트를 래핑</ReactElementWrapper> << 아예 타입 에러 발생 */}
    </>
  );
};

/**
 * 🤔 ReactElement와 JSX.Element를 어떻게 구분해서 사용하면 좋을까?
 * - props, type에 제약을 주고 싶다면 ReactElement를 사용하면 좋을 것 같다.
 * - GPT께서는.. JSX.Element가 간단해서 따로 제네릭을 주고 싶은 경우가 아니라면 JSX.Element가 "JSX를 반환하는 컴포넌트"라는 의도를 명확하게 표현할 수 있어서 좋다고 했다.
 *      다만, 그 경우엔 조금 더 구체적인 타입을 표현할 때 유리하고, 보통 JSX.Element가 더 읽기 좋고 직관적이어서 많이 사용됩니다. << 라고 했다.
 * - 나는 별다른 이유가 없다면 ReactElement를 사용해도 좋다고 생각했다.
 */

// const ReactTypesTest = (): JSX.Element => {
//   return <div />;
// };

// const ReactTypesTest2 = (): ReactElement => {
//   return <div />;
// };

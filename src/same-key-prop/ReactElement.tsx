import { createElement, isValidElement } from 'react';

const testArr = Array.from({ length: 10 }, (_, i) => `${i + 1}번째 아이템`);

export const ReactElement = () => {
  /**
   * @NOTE
   * isValidElement는 인자가 JSX 요소라면 true를 반환한다.
   * 즉, 리액트 컴포넌트 -> createElement로 변환되어 호출 -> 이때 JSX 요소인가?
   */
  console.log(isValidElement(<SomethingRenderString />)); // true
  console.log(isValidElement(<SomethingRenderHTML />)); // true
  console.log(isValidElement(somethingRenderHTML())); // true
  console.log(<SomethingRenderString />);
  /**
   * @NOTE
   * createElement(SomethingRenderHTML, null)
   * => SomethingRenderHTML 자체가 실행된 것이 아니라 React가 렌더링할 준비를 한 상태이다.
   *
   * 💡 즉, < />로 쓰는 것이 컴포넌트(함수)를 호출한 것이 아니다.
   */
  console.log(<SomethingRenderHTML />);
  /**
   * @NOTE
   * 이건 호출되어 반환된 결과가 변환된 것
   * => createElement("div", null, ...)
   */
  console.log(somethingRenderHTML());

  /**
   * @NOTE
   * 바로 호출하는 형태도 key prop warning이 뜬다. 반환하는 JSX에 key prop이 없기 때문이다.
   */
  // return testArr.map((item) => somethingRenderHTML(item));

  return null;
};

/**
 * @NOTE 꺽쇠와 대문자로 쓴다고 다 리액트 엘리먼트로 평가되는 건 아니다.
 * 'SomethingConsole'은(는) JSX 구성 요소로 사용할 수 없습니다.
 *   해당 '() => void' 형식은 올바른 JSX 요소 형식이 아닙니다.
 *
 * 이건 애초부터 <SomethingConsole />로 사용하려면 타입 에러가 난다.
 * 리액트 컴포넌트는 ReactNode를 반환해야 한다. 즉, 이건 void를 리턴하고 있어 JSX 요소가 될 수 없다.
 *
 * 💡 리액트 컴포넌트와 JSX 요소
 * - 리액트 컴포넌트: const Component = () => <div />
 * - JSX 요소: <Component />를 실행 후 생성되는 객체 즉, React.createElement로 변환된 객체
 */
const SomethingConsole = () => {
  console.log('이건 아무것도 반환하지 않고..');
};

/**
 * () => JSX.Element
 */
const SomethingRenderHTML = () => {
  return <div />;
};

/**
 * @NOTE
 * 리액트 컴포넌트는 ReactNode를 반환해야 한다. string은 ReactNode에 포함되기 때문에 일단 리액트 컴포넌트가 되는 것은 가능하다.
 *
 * 💡 ReactNode는 React가 렌더링할 수 있는 모든 값을 포함하는 타입
 */
const SomethingRenderString = () => {
  return 'string';
};

const somethingRenderHTML = (text?: string) => {
  return <div>{text}</div>;
};

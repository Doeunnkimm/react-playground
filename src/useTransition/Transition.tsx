import { useState, useTransition } from 'react';

type Tab = 'about' | 'post' | 'contact';

export const Transition = () => {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState<Tab>('about');

  const handleSelectTab = (nextTab: Tab) => () => {
    if (nextTab === 'post') {
      startTransition(() => {
        setTab(nextTab);
      });
      return;
    }
    setTab(nextTab);
  };

  return (
    <>
      <button onClick={handleSelectTab('about')}>ABOUT</button>
      <button onClick={handleSelectTab('post')}>POST</button>
      <button onClick={handleSelectTab('contact')}>CONTACT</button>
      {isPending && '로딩중!!'}
      {tab === 'about' && <About />}
      {tab === 'post' && <Post />}
      {tab === 'contact' && <Contact />}
    </>
  );
};

export const About = () => {
  return <h1>About</h1>;
};

// 무거운 연산이 포함된 컴포넌트
export const Post = () => {
  const items = Array.from({ length: 1500 }).map((_, i) => (
    <Slow
      key={i}
      index={i}
    />
  ));

  return <ul>{items}</ul>;
};

const Slow = ({ index }: { index: number }) => {
  let startTime = performance.now();
  while (performance.now() - startTime < 1) {}

  return <li># ${index + 1}</li>;
};

export const Contact = () => {
  return <h1>Contact</h1>;
};

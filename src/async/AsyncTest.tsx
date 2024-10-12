import { Suspense } from 'react';
import { AsyncBoundary } from './AsyncBoundary';

const fetchData = () => {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve('Data loaded successfully');
      } else {
        reject(new Error('Failed to load data'));
      }
    }, 2000);
  });
};

const AsyncDataComponent = () => {
  const data = fetchData();
  if (!data) {
    throw new Promise((resolve) => setTimeout(resolve, 2000));
  }
  return <div>{data}</div>;
};

const AsyncTest = () => {
  return (
    <AsyncBoundary
      errorFallback={<div>에러!</div>}
      loadingFallback={<div>로딩..</div>}>
      <AsyncDataComponent />
    </AsyncBoundary>
  );
};

export default AsyncTest;

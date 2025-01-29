import { module1 } from './module1';
import { module2 } from './module2';
import NonSingletonHttpClient from './NonSingletonHttpClient';
import SingletonHttpClient from './SingletonHttpClient';

export const SingletonTest = () => {
  const http1 = SingletonHttpClient.setSingletonInstance({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: { 'Content-Type': 'application/json' },
  });

  const http2 = SingletonHttpClient.setSingletonInstance({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: { 'Content-Type': 'application/json' },
  });

  const http3 = new NonSingletonHttpClient({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: { 'Content-Type': 'application/json' },
  });

  const http4 = new NonSingletonHttpClient({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: { 'Content-Type': 'application/json' },
  });

  console.log('@@ singleton? ', http1 === http2); // true
  console.log('@@ non-singleton? ', http3 === http4); // false
  console.log('@@ modules - singleton? ', module1 === module2); // true

  return null;
};

import NonSingletonHttpClient from './NonSingletonHttpClient';

/**
 * export한 http를 import해 사용한다면 싱글톤이 유지될까?
 * 이론상으로는.. import 키워드는 바인딩 해온다(= 참조값을 가져오는 것)이므로 가능해야 하는데..
 */
export const exportHttp = new NonSingletonHttpClient({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: { 'Content-Type': 'application/json' },
}).getClient();

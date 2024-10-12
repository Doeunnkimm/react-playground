import { UseQueryOptions, useSuspenseQuery } from '@tanstack/react-query';

type Response = Array<{
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}>;

export const useGetTest = (options?: UseQueryOptions<Response>) => {
  return useSuspenseQuery<Response>({
    queryKey: ['test'],
    queryFn: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      if (!response.ok) {
        throw new Error('네트워크 응답이 좋지 않습니다.');
      }
      return (await response.json()) as Response; // JSON으로 변환 후 타입 캐스팅
    },
    ...options,
  });
};

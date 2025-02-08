import type { PluginOption } from 'vite';
import globToRegExp from 'glob-to-regexp';

export const componentDisplayName = (globPatterns: Array<string>): PluginOption => {
  return {
    name: 'component-displayName',
    /**
     * @param code 현재 변환 중인 파일의 소스 코드(텍스트 형태)
     * @param id 현재 변환 중인 모듈의 파일 경로나 ID
     * @param options 플러그인이 호출되는 현재 상황에 대한 추가 정보. 예를 들어 ssr 여부
     */
    transform(code, id) {
      // NOTE: 모든 파일의 소스코드가 들어오게 되는데, 지정한 globPatterns에 해당하는 파일만 거르기 위함
      const regexps = globPatterns.map((pattern) => new RegExp(globToRegExp(pattern)));
      const isPassed = regexps.some((regexp) => regexp.test(id));

      if (!isPassed) return code;

      // NOTE: 소스 코드를 변형하는 것이 가능
      return `
      ${code}
      // 소스 코드 자체를 변형할 수 있다.
      `;
    },
  };
};

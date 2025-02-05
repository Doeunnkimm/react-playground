import { PluginOption } from 'vite';
import globToRegExp from 'glob-to-regexp';
import { Project } from 'ts-morph';

export const tsMorphAddDisplayName = (globPatterns: Array<string>): PluginOption => {
  const project = new Project();
  return {
    name: 'add-displayName-ts-morph',
    transform(code, id) {
      const regexps = globPatterns.map((pattern) => new RegExp(globToRegExp(pattern)));
      const isPassed = regexps.some((regexp) => regexp.test(id));

      if (!isPassed) return code;

      const sourceFile = project.createSourceFile('__temporary__' + id, code);

      // sourceFile.getExportDeclarations().length: 2
      sourceFile.getExportDeclarations().forEach((exportDeclaration) => {
        const namespaceExport = exportDeclaration.getNamespaceExport(); // 네임스페이스 가져오기
        const moduleSpecifier = exportDeclaration.getModuleSpecifier() as unknown as string; // 모듈 경로
        const isNamespaceExport = namespaceExport != null;

        if (isNamespaceExport) {
          const nameSpaceName = namespaceExport.getName();
          sourceFile.addImportDeclaration({
            moduleSpecifier,
            namespaceImport: `_${nameSpaceName}`,
          });

          sourceFile.insertStatements(
            0,
            `import { namespaceExportOverrideDisplayName } from '@/namespace-exports-disaplyName/storybook-utils'`
          );

          sourceFile.addStatements([
            `const ${nameSpaceName} = namespaceExportOverrideDisplayName({ Module: _${nameSpaceName}, displayName: '${nameSpaceName}' })`,
            `export { ${nameSpaceName} }`,
          ]);
          exportDeclaration.remove();
        } else {
          // namespace export가 아닌 export 목록을 가져온다 (타입은 포함 X)
          const namedExports = exportDeclaration.getNamedExports(); // ex. ObjectTemp

          /**
           * as-is: export { ObjectTemp } from './components/ObjectTemp';
           * to-be: export { ObjectTemp as _ObjectTemp } from './components/ObjectTemp';
           */
          sourceFile.addImportDeclaration({
            moduleSpecifier,
            namedImports: namedExports.map((namedExport) => ({
              name: namedExport.getName(),
              alias: `_${namedExport.getName()}`,
            })),
          });

          namedExports.forEach((namedExport) => {
            const name = namedExport.getName();
            sourceFile.insertStatements(
              0, // 파일 맨 앞에 삽입
              `import { namedExportOverrideDisplayName } from '@/namespace-exports-disaplyName/storybook-utils'`
            );
            // 새로운 변수를 선언하고 `displayName`을 추가
            sourceFile.addStatements([
              `const ${name} = namedExportOverrideDisplayName({ Component: _${name}, displayName: '${name}' })`,
              `export { ${name} }`,
            ]);

            /**
             * import { namedExportOverrideDisplayName } from '@/namespace-exports-disaplyName/storybook-utils';
             * import { Foo as _Foo, Bar as _Bar } from './components';
             *
             * const Foo = namedExportOverrideDisplayName({ Component: _Foo, displayName: 'Foo' });
             * const Bar = namedExportOverrideDisplayName({ Component: _Bar, displayName: 'Bar' });
             *
             * export { Foo, Bar };
             */
            exportDeclaration.remove(); // 기존 export 문을 삭제해서 원본이 남지 않도록 처리
          });
        }
      });
      return sourceFile.getFullText();
    },
  };
};

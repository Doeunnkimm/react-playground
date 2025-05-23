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
        const moduleSpecifier = exportDeclaration.getModuleSpecifier()?.getLiteralValue() ?? ''; // 모듈 경로 가져오기
        const isNamespaceExport = namespaceExport != null;

        if (isNamespaceExport) {
          const nameSpaceName = namespaceExport.getName();
          /**
           * import * as _Temp from './components'; 을 추가한다.
           * 이렇게 하면 _Temp 모듈 자체를 읽을 수 있다.
           */
          sourceFile.addImportDeclaration({
            moduleSpecifier,
            namespaceImport: `_${nameSpaceName}`,
          });

          sourceFile.insertStatements(
            0,
            `import { withNamespaceDisplayName } from '@/namespace-exports-displayName/storybook-utils/withNamespaceDisplayName';`
          );

          sourceFile.addStatements([
            `const ${nameSpaceName} = withNamespaceDisplayName(_${nameSpaceName}, '${nameSpaceName}')`,
            `export { ${nameSpaceName} }`,
          ]);
        } else {
          const namedExports = exportDeclaration.getNamedExports();

          // import { ObjectTemp as _ObjectTemp } from "./components/ObjectTemp";
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
              0,
              `import { withNamedDisplayName } from '@/namespace-exports-displayName/storybook-utils/withNamedDisplayName';`
            );
            sourceFile.addStatements([
              `const ${name} = withNamedDisplayName(_${name}, '${name}')`,
              `export { ${name} }`,
            ]);
          });
        }
        // 기존 export 문을 제거
        exportDeclaration.remove();
      });
      console.log('@@ fullText -> ', sourceFile.getFullText());
      return sourceFile.getFullText();
    },
  };
};

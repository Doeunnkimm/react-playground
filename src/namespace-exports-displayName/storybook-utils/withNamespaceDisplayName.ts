export const withNamespaceDisplayName = (module: Record<string, any>, displayName: string) => {
  Object.keys(module).forEach((key) => {
    module[key].displayName = `${displayName}.${key}`;
  });
  return module;
};

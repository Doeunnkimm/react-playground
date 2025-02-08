export const withNamespaceDisplayName = (module: Record<string, any>, displayName: string) => {
  return Object.fromEntries(
    Object.entries(module).map(([key, value]) => [
      key,
      value != null && typeof value === 'object' ? { ...value, displayName: `${displayName}.${key}` } : value,
    ])
  );
};

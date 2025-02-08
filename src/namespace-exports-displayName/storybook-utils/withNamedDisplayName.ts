export const withNamedDisplayName = (object: Record<string, any>, displayName: string) => {
  if (typeof object !== 'object' || object === null) return object;
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [
      key,
      value != null && typeof value === 'object' ? { ...value, displayName: `${displayName}.${key}` } : value,
    ])
  );
};

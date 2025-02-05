export const withNamedDisplayName = (object: Record<string, any>, displayName: string) => {
  (object as { displayName?: string }).displayName = displayName;

  Object.keys(object).forEach((key) => {
    const item = object[key];
    if (typeof item === 'object' && 'displayName' in item) {
      (item as { displayName?: string }).displayName = `${displayName}.${key}`;
    }
  });

  return object;
};

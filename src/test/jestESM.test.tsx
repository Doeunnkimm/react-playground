import queryString from 'query-string';

describe('queryString.extract', () => {
  test('extracts query string from url', () => {
    expect(queryString.extract('https://foo.bar/?abc=def&hij=klm')).toBe('abc=def&hij=klm');
    expect(queryString.extract('https://foo.bar/?')).toBe('');
    expect(queryString.extract('https://foo.bar/?regex=ab?c')).toBe('regex=ab?c');
    expect(queryString.extract('https://foo.bar#top?foo=bar')).toBe('');
    expect(queryString.extract('https://foo.bar?foo=bar#top')).toBe('foo=bar');
  });

  test('handles strings not containing query string', () => {
    expect(queryString.extract('https://foo.bar')).toBe('');
    expect(queryString.extract('https://foo.bar#top')).toBe('');
    expect(queryString.extract('')).toBe('');
  });

  test('throws for invalid values', () => {
    expect(() => {
      queryString.extract(null as any);
    }).toThrow(TypeError);

    expect(() => {
      queryString.extract(undefined as any);
    }).toThrow(TypeError);
  });
});

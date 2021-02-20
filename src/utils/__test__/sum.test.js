const sum = require('../sum');

describe('Utils | .sum', () => {
  it('returns the sum of elements in a list', () => {
    const input = [1, 3, 7, 8];
    expect(sum(input)).toBe(19);
  });

  it('returns the sum of floats', () => {
    const input = [1, 3.2, 7.6, 8];
    expect(sum(input)).toBe(19.8);
  });

  it('returns 0 when input is empty', () => {
    const input = [];
    expect(sum(input)).toBe(0);
  });
});

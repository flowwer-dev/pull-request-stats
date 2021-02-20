const average = require('../average');

describe('Utils | .average', () => {
  it('returns the average of the numbers in a list', () => {
    const input = [1, 7, 3, 0, 4];
    expect(average(input)).toBe(3);
  });

  it('works with floats', () => {
    const input = [0, 7, 2.5, 0.5];
    expect(average(input)).toBe(2.5);
  });

  it('returns null when input is empty', () => {
    const input = [];
    expect(average(input)).toBe(null);
  });
});

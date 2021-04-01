const divide = require('../divide');

describe('Utils | .divide', () => {
  it('returns a division of 2 numbers', () => {
    expect(divide(-27, 3)).toBe(-9);
  });

  it('returns null when denominator is 0', () => {
    expect(divide(1, 0)).toBe(null);
  });
});

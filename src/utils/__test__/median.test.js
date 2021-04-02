const median = require('../median');

describe('Utils | .median', () => {
  it('returns the number in the middle when list length is odd', () => {
    const input = [1, 7, 3, 0, 2];
    expect(median(input)).toBe(2);
  });

  it('returns the average of the 2 numbers in the middle when is pair', () => {
    const input = [1, 7, 3, 0, 2, 9];
    expect(median(input)).toBe(2.5);
  });

  it('returns null when input is empty', () => {
    const input = [];
    expect(median(input)).toBe(null);
  });

  it('returns the only element when list has a length of 1', () => {
    const input = [5];
    expect(median(input)).toBe(5);
  });

  it('returns the average when list has a length of 2', () => {
    const input = [5, 3];
    expect(median(input)).toBe(4);
  });

  it('returns 0 when input is array of 0s', () => {
    const input = [0, 0, 0, 0];
    expect(median(input)).toBe(0);
  });

  it('returns the number in the middle', () => {
    const input = [492000, 4865000, 188000, 25000, 107000];
    expect(median(input)).toBe(188000);
  });
});

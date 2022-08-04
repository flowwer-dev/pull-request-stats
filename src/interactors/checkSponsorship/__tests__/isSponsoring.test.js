const isSponsoring = require('../isSponsoring');

describe('Interactors | checkSponsorship | .isSponsoring', () => {
  it('returns false when sending nothing', () => {
    const expected = false;
    const response = isSponsoring();
    expect(response).toEqual(expected);
  });

  it('returns false when no key is true', () => {
    const input = {
      sponsor1: false,
      sponsor2: false,
    };
    const expected = false;
    const response = isSponsoring(input);
    expect(response).toEqual(expected);
  });

  it('returns true when al least one key is true', () => {
    const input = {
      sponsor1: false,
      sponsor2: true,
    };
    const expected = true;
    const response = isSponsoring(input);
    expect(response).toEqual(expected);
  });

  it('returns false for truthy values', () => {
    const input = {
      sponsor1: false,
      sponsor2: 'truthy',
    };
    const expected = false;
    const response = isSponsoring(input);
    expect(response).toEqual(expected);
  });
});

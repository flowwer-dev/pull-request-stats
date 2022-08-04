const isExternalSponsor = require('../isExternalSponsor');

describe('Interactors | checkSponsorship | .isExternalSponsor', () => {
  it('returns false when sending nothing', () => {
    const expected = false;
    const response = isExternalSponsor();
    expect(response).toEqual(expected);
  });

  it('returns false when no user is sponsor', () => {
    const input = new Set(['noSponsor1', 'noSponsor2']);
    const expected = false;
    const response = isExternalSponsor(input);
    expect(response).toEqual(expected);
  });

  it('returns true when al least one user is sponsor', () => {
    const input = new Set(['noSponsor1', 'zenfi']);
    const expected = true;
    const response = isExternalSponsor(input);
    expect(response).toEqual(expected);
  });
});

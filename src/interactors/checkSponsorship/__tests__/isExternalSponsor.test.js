const axios = require('axios');
const isExternalSponsor = require('../isExternalSponsor');

const sponsors = [
  '4cf2d30b6327df1b462663c7611de22f',
  'b9cf4cc40150a529e71058bd59f0ed0b',
  'cf681c59a1d2b1817befafc0d9482ba1',
];

jest.mock('axios', () => ({
  get: jest.fn(),
}));

jest.mock('@actions/core', () => ({
  debug: jest.fn(),
  error: jest.fn(),
}));

describe('Interactors | checkSponsorship | .isExternalSponsor', () => {
  beforeAll(() => {
    axios.get.mockImplementation(() => Promise.resolve({
      data: sponsors,
    }));
  });

  it('returns false when sending nothing', async () => {
    const expected = false;
    const response = await isExternalSponsor();
    expect(response).toEqual(expected);
  });

  it('returns false when no user is sponsor', async () => {
    const input = new Set(['noSponsor1', 'noSponsor2']);
    const expected = false;
    const response = await isExternalSponsor(input);
    expect(response).toEqual(expected);
  });

  it('returns true when al least one user is sponsor', async () => {
    const input = new Set(['noSponsor1', 'sponsors']);
    const expected = true;
    const response = await isExternalSponsor(input);
    expect(response).toEqual(expected);
  });

  it('returns true when including an offline sponsor', async () => {
    const input = new Set(['noSponsor1', 'offlineSponsor']);
    const expected = true;
    const response = await isExternalSponsor(input);
    expect(response).toEqual(expected);
  });

  it('returns a response even when fetch fails', async () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.reject(new Error('Fetch failed')));
    const input = new Set(['noSponsor1', 'offlineSponsor']);
    const expected = true;
    const response = await isExternalSponsor(input);
    expect(response).toEqual(expected);
  });
});

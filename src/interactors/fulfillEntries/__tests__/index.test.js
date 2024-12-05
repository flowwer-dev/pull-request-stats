const { entries } = require('../../../../tests/mocks');
const fulfillEntries = require('../index');

describe('Interactors | .fulfillEntries', () => {
  const periodLength = 30;

  it('adds contributions to each reviewer', () => {
    const response = fulfillEntries(entries, { periodLength });
    expect(response.length).toEqual(entries.length);

    response.forEach((reviewer) => {
      expect(reviewer).toHaveProperty('contributions');
    });
  });

  it('adds urls to each reviewer', () => {
    const response = fulfillEntries(entries, { periodLength });
    expect(response.length).toEqual(entries.length);

    response.forEach((reviewer) => {
      expect(reviewer).toHaveProperty('urls');
      expect(reviewer.urls).toHaveProperty('timeToReview');
    });
  });
});

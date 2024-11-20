const { reviews: input } = require('../../../../tests/mocks');
const calculatePullRequestStats = require('../calculatePullRequestStats');

describe('Interactors | getPullRequestStats | .calculatePullRequestStats', () => {
  const result = calculatePullRequestStats(input);

  it('calculates the openedPullRequests', () => {
    expect(result.openedPullRequests).toBe(3);
  });
});

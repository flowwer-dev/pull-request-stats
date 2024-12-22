const { pullRequests: input } = require('../../../../tests/mocks');
const calculatePullRequestStats = require('../calculatePullRequestStats');

describe('Interactors | getPullRequestStats | .calculatePullRequestStats', () => {
  const result = calculatePullRequestStats(input);

  it('calculates the openedPullRequests', () => {
    expect(result.openedPullRequests).toBe(2);
  });

  it('calculates the totalObservations', () => {
    expect(result.totalObservations).toBe(8);
  });

  it('calculates the medianObservations', () => {
    expect(result.medianObservations).toBe(3);
  });

  it('calculates the revisionSuccessRate', () => {
    expect(result.revisionSuccessRate).toBeCloseTo(0.33);
  });

  it('calculates the additions', () => {
    expect(result.additions).toBe(173);
  });

  it('calculates the deletions', () => {
    expect(result.deletions).toBe(87);
  });

  it('calculates the lines', () => {
    expect(result.lines).toBe(260);
  });
});

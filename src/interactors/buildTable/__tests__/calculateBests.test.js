const { entries } = require('../../../../tests/mocks');
const calculateBests = require('../calculateBests');

describe('Interactors | .buildTable | .calculateBests', () => {
  it('returns the best stats for DESC sort order', () => {
    const response = calculateBests(entries);
    expect(response).toMatchObject({
      totalReviews: 4,
      totalComments: 5,
      commentsPerReview: 5,
      openedPullRequests: 30,
    });
  });

  it('returns the best stats for ASC sort order', () => {
    const response = calculateBests(entries);
    expect(response).toMatchObject({
      timeToReview: 1_000_000,
    });
  });
});

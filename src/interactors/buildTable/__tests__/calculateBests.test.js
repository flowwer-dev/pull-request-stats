const stats = require('../../__tests__/mocks/stats.json');
const calculateBests = require('../calculateBests');

describe('Interactors | .buildTable | .calculateBests', () => {
  it('returns the best stats for MAX optimization', () => {
    const response = calculateBests(stats);
    expect(response).toMatchObject({
      totalReviews: 37,
      totalComments: 99,
      commentsPerReview: 3,
    });
  });

  it('returns the best stats for MIN optimization', () => {
    const response = calculateBests(stats);
    expect(response).toMatchObject({
      timeToReview: 25000,
    });
  });
});

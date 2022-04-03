const stats = require('../../__tests__/mocks/stats.json');
const statsSum = require('../../__tests__/mocks/statsSum.json');
const calculateTotals = require('../calculateTotals');

describe('Interactors | .buildTable | .calculateTotals', () => {
  it('sums all the stats in a array', () => {
    const response = calculateTotals(stats);
    expect(response).toEqual(statsSum);
  });

  it('returns the correct sum event when data contains nulls', () => {
    const withNulls = {
      totalReviews: undefined,
      totalComments: null,
      commentsPerReview: null,
      timeToReview: 0,
    };
    const response = calculateTotals([...stats, withNulls]);
    expect(response).toEqual(statsSum);
  });

  it('returns the correct sum event when data contains an empty object', () => {
    const empty = {};
    const response = calculateTotals([...stats, empty]);
    expect(response).toEqual(statsSum);
  });

  it('returns all stats in zeros when receiving an empty one', () => {
    const response = calculateTotals([]);
    expect(response).toEqual({
      totalReviews: 0,
      totalComments: 0,
      commentsPerReview: 0,
      timeToReview: 0,
    });
  });
});

const input = require('./mocks/reviews');
const calculateReviewsStats = require('../calculateReviewsStats');

describe('Interactors | getReviewers | .calculateReviewsStats', () => {
  const result = calculateReviewsStats(input);

  it('calculates the totalReviews', () => {
    expect(result.totalReviews).toBe(2);
  });

  it('calculates the totalComments', () => {
    expect(result.totalComments).toBe(6);
  });

  it('calculates the commentsPerReview', () => {
    expect(result.commentsPerReview).toBe(3);
  });

  it('calculates the timeToReview', () => {
    expect(result.timeToReview).toBe(75000);
  });
});

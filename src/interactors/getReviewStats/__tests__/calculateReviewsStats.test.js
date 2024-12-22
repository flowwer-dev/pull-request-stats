const { reviews: input, pullRequests } = require('../../../../tests/mocks');
const calculateReviewsStats = require('../calculateReviewsStats');

describe('Interactors | getReviewStats | .calculateReviewsStats', () => {
  const pullsById = pullRequests.reduce((acc, pr) => ({ ...acc, [pr.id]: pr }), {});
  const result = calculateReviewsStats(input, pullsById);

  it('calculates the totalReviews', () => {
    expect(result.totalReviews).toBe(2);
  });

  it('calculates the totalComments', () => {
    expect(result.totalComments).toBe(6);
  });

  it('calculates the timeToReview', () => {
    expect(result.timeToReview).toBe(75000);
  });

  it('calculates the commentsPerReview', () => {
    expect(result.commentsPerReview).toBe(2);
  });

  it('calculates the reviewedAdditions', () => {
    expect(result.reviewedAdditions).toBe(173);
  });

  it('calculates the reviewedDeletions', () => {
    expect(result.reviewedDeletions).toBe(87);
  });

  it('calculates the reviewedLines', () => {
    expect(result.reviewedLines).toBe(260);
  });
});

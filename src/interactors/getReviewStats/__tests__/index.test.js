const { pullRequests: pulls, commentsAIStats } = require('../../../../tests/mocks');
const getReviewers = require('../index');

const getUserIds = (reviewers) => reviewers.map((r) => r.userId);

describe('Interactors | getReviewStats', () => {
  it('groups reviews by author and calculate its stats', () => {
    const result = getReviewers({ pulls, commentsAIStats });
    expect(result.length).toEqual(2);
    expect(getUserIds(result)).toContain('1031639', '8755542');

    result.forEach((reviewer) => {
      expect(reviewer).toHaveProperty('userId');

      expect(reviewer).toHaveProperty('reviews');
      expect(reviewer.reviews.length > 0).toBe(true);

      expect(reviewer).toHaveProperty('stats');
      expect(reviewer.stats).toHaveProperty('timeToReview');
      expect(reviewer.stats).toHaveProperty('cognitiveEffortScore');
    });
  });
});

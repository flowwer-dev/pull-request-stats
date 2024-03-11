const inputReviews = require('./mocks/reviews');
const inputPullRequest = require('./mocks/pullRequests');
const calculateReviewsStats = require('../calculateReviewsStats');

describe('Interactors | getReviewers | .calculateReviewsStats', () => {
  const result = calculateReviewsStats({
    reviews: inputReviews,
    author: {
      id: '1031639',
      url: 'https://github.com/manuelmhtr',
      login: 'manuelmhtr',
      avatarUrl: 'https://avatars.githubusercontent.com/u/1031639?u=30204017b73f7a1f08005cb8ead3f70b0410486c&v=4',
    },
    pulls: inputPullRequest,
  });

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

  it('calculates the totalReviewsPerTotalPullRequest', () => {
    expect(result.totalReviewablePullRequest).toBe(1);
  });
});

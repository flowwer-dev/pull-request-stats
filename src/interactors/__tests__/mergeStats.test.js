const mergeStats = require('../mergeStats');
const { VALID_STATS } = require('../../config/stats');
const { users, reviewStats, pullRequestStats } = require('../../../tests/mocks');

describe('Interactors | .mergeStats', () => {
  const baseParams = {
    users,
    reviewStats,
    pullRequestStats,
  };

  it('returns an array with all the stats for each user', async () => {
    const results = mergeStats(baseParams);
    expect(results.length).toEqual(users.length);

    results.forEach((result) => {
      expect(result).toHaveProperty('user');
      expect(result.user).toHaveProperty('login');
      expect(result).toHaveProperty('reviews');
      expect(result).toHaveProperty('stats');
      VALID_STATS.forEach((stat) => {
        expect(result.stats).toHaveProperty(stat);
      });
    });
  });

  it('returns all the stats for users with data', async () => {
    const results = mergeStats(baseParams)
      .find(({ user }) => user.login === 'user1');

    expect(results.stats).toEqual({
      totalReviews: 4,
      totalComments: 1,
      timeToReview: 2052500,
      commentsPerReview: 0.25,
      openedPullRequests: 17,
    });
  });

  it('returns empty stats for users with no data', async () => {
    const results = mergeStats(baseParams)
      .find(({ user }) => user.login === 'user4');

    expect(results.stats).toEqual({
      timeToReview: null,
      totalReviews: null,
      totalComments: null,
      commentsPerReview: null,
      openedPullRequests: null,
    });
  });

  it('returns empty array when no users passed', async () => {
    const results = mergeStats({ ...baseParams, users: [] });
    expect(results).toEqual([]);
  });
});

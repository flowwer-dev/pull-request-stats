const mergeStats = require('../mergeStats');
const { VALID_STATS } = require('../../config/stats');
const { authors, reviewStats, pullRequestStats } = require('../../../tests/mocks');

describe('Interactors | .mergeStats', () => {
  const baseParams = {
    authors,
    reviewStats,
    pullRequestStats,
  };

  it('returns an array with all the stats for each author', async () => {
    const results = mergeStats(baseParams);
    expect(results.length).toEqual(authors.length);

    results.forEach((result) => {
      expect(result).toHaveProperty('author');
      expect(result.author).toHaveProperty('login');
      expect(result).toHaveProperty('stats');
      VALID_STATS.forEach((stat) => {
        expect(result.stats).toHaveProperty(stat);
      });
    });
  });

  it('returns all the stats for authors with data', async () => {
    const results = mergeStats(baseParams)
      .find(({ author }) => author.login === 'user1');

    expect(results.stats).toEqual({
      totalReviews: 4,
      totalComments: 1,
      timeToReview: 2052500,
      commentsPerReview: 0.25,
      openedPullRequests: 17,
    });
  });

  it('returns empty stats for authors with no data', async () => {
    const results = mergeStats(baseParams)
      .find(({ author }) => author.login === 'user4');

    expect(results.stats).toEqual({
      timeToReview: null,
      totalReviews: null,
      totalComments: null,
      commentsPerReview: null,
      openedPullRequests: null,
    });
  });

  it('returns empty array when no authors passed', async () => {
    const results = mergeStats({ ...baseParams, authors: [] });
    expect(results).toEqual([]);
  });
});

const calculateReviewerStats = require(`${ROOT_PATH}/src/interactors/calculate-reviewer-stats`);

const EXPECTED_RESPONSE = {
  avgTimeToFirstReview: 12055500,
  commentsPerReview: 1.5,
  totalComments: 6,
  totalReviews: 4,
  reviews: [
    {
      date: new Date('2020-06-30T16:46:50.000Z'),
      time: 951000
    },
    {
      date: new Date('2020-06-30T13:32:51.000Z'),
      time: 2258000
    },
    {
      date: new Date('2020-06-30T01:58:15.000Z'),
      time: 44924000
    },
    {
      date: new Date('2020-06-29T18:01:00.000Z'),
      time: 89000
    }
  ]
};

describe('Interactors | .calculateReviewerStats', () => {
  const pulls = global.TestUtils.data.repoPullRequests;

  it('returns all available reviewers in a set of pull requests', () => {
    const reviewerId = 1031639;
    const response = calculateReviewerStats(pulls, reviewerId);

    expect(response).toEqual(EXPECTED_RESPONSE);
  });
});

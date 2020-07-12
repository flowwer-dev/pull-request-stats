const calculateReviewerStats = require(`${ROOT_PATH}/src/interactors/calculate-reviewer-stats`);

const EXPECTED_RESPONSE = {
  avgTimeToFirstReview: 12055500,
  commentsPerReview: 1.5,
  totalComments: 6,
  totalReviews: 4
};

describe('Interactors | .calculateReviewerStats', () => {
  const pulls = global.TestUtils.data.repoPullRequests;

  it('returns all available reviewers in a set of pull requests', () => {
    const reviewerId = 1031639;
    const response = calculateReviewerStats(pulls, reviewerId);

    expect(response).toEqual(EXPECTED_RESPONSE);
  });
});

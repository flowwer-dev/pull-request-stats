const statsSum = require('../../__tests__/mocks/statsSum.json');
const reviewers = require('../../__tests__/mocks/reviewers.json');
const getContributions = require('../getContributions');

const [reviewer] = reviewers;

describe('Interactors | .buildTable | .getContributions', () => {
  it('adds the percentage of each stat vs the total', () => {
    const response = getContributions(reviewer, statsSum);
    expect(response).toMatchObject({
      commentsPerReview: 0.004222972972972973,
      totalComments: 0.008695652173913044,
      totalReviews: 0.8695652173913043,
    });
  });
});

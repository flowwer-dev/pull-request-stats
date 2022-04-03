const reviewers = require('../../__tests__/mocks/reviewers.json');
const sortByStats = require('../sortByStats');

describe('Interactors | .buildTable | .sortByStats', () => {
  const expectToMatchOrder = (results, expectedOrder) => {
    const actualOrder = results.map((r) => r.author);
    expect(actualOrder).toEqual(expectedOrder);
  };

  it('sorts the reviewers by "totalReviews" when sortBy is not specified', () => {
    const sortBy = null;
    const response = sortByStats(reviewers, sortBy);
    expectToMatchOrder(response, [
      'REVIEWER_1',
      'REVIEWER_3',
      'REVIEWER_2',
    ]);
  });

  it('sorts the reviewers by "timeToReview" when sortBy is TIME', () => {
    const sortBy = 'TIME';
    const response = sortByStats(reviewers, sortBy);
    expectToMatchOrder(response, [
      'REVIEWER_2',
      'REVIEWER_3',
      'REVIEWER_1',
    ]);
  });

  it('sorts the reviewers by "totalReviews" when sortBy is REVIEWS', () => {
    const sortBy = 'REVIEWS';
    const response = sortByStats(reviewers, sortBy);
    expectToMatchOrder(response, [
      'REVIEWER_1',
      'REVIEWER_3',
      'REVIEWER_2',
    ]);
  });

  it('sorts the reviewers by "totalComments" when sortBy is COMMENTS', () => {
    const sortBy = 'COMMENTS';
    const response = sortByStats(reviewers, sortBy);
    expectToMatchOrder(response, [
      'REVIEWER_3',
      'REVIEWER_2',
      'REVIEWER_1',
    ]);
  });
});

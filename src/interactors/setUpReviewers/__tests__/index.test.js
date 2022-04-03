const reviewers = require('../../__tests__/mocks/reviewersWithStats.json');
const setUpReviewers = require('../index');

describe('Interactors | .setUpReviewers', () => {
  it('adds contributions to each reviewer', () => {
    const response = setUpReviewers({ reviewers });
    expect(response.length).toEqual(reviewers.length);

    response.forEach((reviewer) => {
      expect(reviewer).toHaveProperty('contributions');
    });
  });

  it('adds urls to each reviewer', () => {
    const response = setUpReviewers({ reviewers });
    expect(response.length).toEqual(reviewers.length);

    response.forEach((reviewer) => {
      expect(reviewer).toHaveProperty('urls');
      expect(reviewer.urls).toHaveProperty('timeToReview');
    });
  });

  it('applies limit option', () => {
    const limit = 1;
    const response = setUpReviewers({ reviewers, limit });
    expect(response.length).toEqual(limit);
  });

  it('applies sort option', () => {
    const sortBy = 'COMMENTS';
    const response = setUpReviewers({ reviewers, sortBy });
    const actualOrder = response.map((reviewer) => reviewer?.author?.login);
    const expectedOrder = ['user2', 'user1'];
    expect(actualOrder).toEqual(expectedOrder);
  });
});

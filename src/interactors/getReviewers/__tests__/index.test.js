const input = require('./mocks/pullRequests');
const getReviewers = require('../index');

describe('Interactors | getReviewers', () => {
  it('groups reviews by author and calculate its stats', () => {
    const result = getReviewers(input);
    expect(result.length).toEqual(2);

    const authors = result.map((r) => r.author.login);
    expect(authors).toContain('manuelmhtr', 'jartmez');

    result.forEach((reviewer) => {
      expect(reviewer).toHaveProperty('author');
      expect(reviewer.author).toHaveProperty('id');
      expect(reviewer.author).toHaveProperty('login');

      expect(reviewer).toHaveProperty('reviews');
      expect(reviewer.reviews.length > 0).toBe(true);

      expect(reviewer).toHaveProperty('stats');
      expect(reviewer.stats).toHaveProperty('timeToReview');
    });
  });
});

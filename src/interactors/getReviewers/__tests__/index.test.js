const input = require('./mocks/pullRequests');
const getReviewers = require('../index');

const getAuthors = (reviewers) => reviewers.map((r) => r.author.login);

describe('Interactors | getReviewers', () => {
  it('groups reviews by author and calculate its stats', () => {
    const result = getReviewers(input);
    expect(result.length).toEqual(2);
    expect(getAuthors(result)).toContain('manuelmhtr', 'jartmez');

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

  it('excludes reviewers when the option is passed', () => {
    const result = getReviewers(input, { excludeStr: 'manuelmhtr' });
    expect(result.length).toEqual(1);
    expect(getAuthors(result)).not.toContain('manuelmhtr');
  });
});

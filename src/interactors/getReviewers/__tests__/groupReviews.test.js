const input = require('./mocks/pullRequests');
const groupReviews = require('../groupReviews');

const getReviewsByAuthor = (data, login) => {
  const { reviews } = data.find(({ author }) => author.login === login);
  return reviews.map(({ id }) => id);
};

describe('Interactors | getReviewers | .groupReviews', () => {
  it('groups reviews by author', () => {
    const result = groupReviews(input);
    expect(result.length).toEqual(2);
    const authors = result.map((r) => r.author.login);
    expect(authors).toContain('manuelmhtr', 'jartmez');
    expect(getReviewsByAuthor(result, 'manuelmhtr')).toEqual([9876]);
    expect(getReviewsByAuthor(result, 'jartmez').sort()).toEqual([5679, 9877].sort());
  });

  it('removes reviews marked as own pull request', () => {
    const result = groupReviews(input);
    expect(getReviewsByAuthor(result, 'manuelmhtr')).not.toContain([5678]);
  });

  it('keeps only the required properties', () => {
    const result = groupReviews(input);
    result.forEach(({ reviews }) => reviews.forEach((review) => {
      expect(review).toHaveProperty('id');
      expect(review).toHaveProperty('submittedAt');
      expect(review).toHaveProperty('commentsCount');
      expect(review).toHaveProperty('timeToReview');
      expect(review).toHaveProperty('pullRequestId');
      expect(review).not.toHaveProperty('isOwnPull');
      expect(review).not.toHaveProperty('author');
    }));
  });
});

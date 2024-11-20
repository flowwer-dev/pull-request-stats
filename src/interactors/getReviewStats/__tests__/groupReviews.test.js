const { pullRequests: input } = require('../../../../tests/mocks');
const groupReviews = require('../groupReviews');

const getReviewsByAuthorId = (data, authorId) => {
  const { reviews } = data.find((review) => review.authorId === authorId);
  return reviews.map(({ id }) => id);
};

describe('Interactors | getReviewStats | .groupReviews', () => {
  it('groups reviews by author', () => {
    const result = groupReviews(input);
    expect(result.length).toEqual(2);
    const authorIds = result.map((r) => r.authorId);
    expect(authorIds).toContain('1031639', '8755542');
    expect(getReviewsByAuthorId(result, '1031639')).toEqual([9876]);
    expect(getReviewsByAuthorId(result, '8755542').sort()).toEqual([5679, 9877].sort());
  });

  it('removes reviews marked as own pull request', () => {
    const result = groupReviews(input);
    expect(getReviewsByAuthorId(result, '1031639')).not.toContain([5678]);
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

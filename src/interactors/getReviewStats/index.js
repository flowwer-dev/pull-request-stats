const calculateReviewsStats = require('./calculateReviewsStats');
const groupReviews = require('./groupReviews');

module.exports = (pulls) => {
  const pullsById = pulls.reduce((acc, pull) => ({ ...acc, [pull.id]: pull }), {});

  return groupReviews(pulls)
    .map(({ userId, reviews }) => {
      const stats = calculateReviewsStats(reviews, pullsById);
      return { userId, reviews, stats };
    });
};

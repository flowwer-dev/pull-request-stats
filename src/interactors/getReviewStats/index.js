const calculateReviewsStats = require('./calculateReviewsStats');
const groupReviews = require('./groupReviews');

module.exports = (pulls) => groupReviews(pulls)
  .map(({ userId, reviews }) => {
    const stats = calculateReviewsStats(reviews);
    return { userId, reviews, stats };
  });

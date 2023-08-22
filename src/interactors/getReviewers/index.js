const calculateReviewsStats = require('./calculateReviewsStats');
const groupReviews = require('./groupReviews');

module.exports = (pulls, options) => groupReviews(pulls).map(({ author, reviews }) => {
  const stats = calculateReviewsStats(reviews, options);
  return { author, reviews, stats };
});

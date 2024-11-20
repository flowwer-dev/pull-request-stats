const calculateReviewsStats = require('./calculateReviewsStats');
const groupReviews = require('./groupReviews');

module.exports = (pulls) => groupReviews(pulls)
  .map(({ authorId, reviews }) => {
    const stats = calculateReviewsStats(reviews);
    return { authorId, reviews, stats };
  });

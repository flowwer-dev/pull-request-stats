const calculateReviewsStats = require('./calculateReviewsStats');
const groupReviews = require('./groupReviews');

module.exports = ({ pulls, commentsAIStats }) => {
  const pullsById = pulls.reduce((acc, pull) => ({ ...acc, [pull.id]: pull }), {});

  return groupReviews(pulls)
    .map(({ userId, reviews }) => {
      const stats = calculateReviewsStats({ reviews, pullsById, commentsAIStats });
      return { userId, reviews, stats };
    });
};

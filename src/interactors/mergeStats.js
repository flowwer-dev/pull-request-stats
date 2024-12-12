const { VALID_STATS } = require('../config/stats');

const EMPTY_STATS = VALID_STATS
  .reduce((acc, stat) => ({ ...acc, [stat]: null }), {});

module.exports = ({
  users,
  reviewStats,
  pullRequestStats,
}) => {
  const reviewsByUserId = reviewStats.reduce((acc, reviewsData) => ({
    ...acc,
    [reviewsData.userId]: reviewsData,
  }), {});

  const pullRequestsByUserId = pullRequestStats.reduce((acc, prsData) => ({
    ...acc,
    [prsData.userId]: prsData,
  }), {});

  return users.map((user) => ({
    user,
    reviews: reviewsByUserId[user.id]?.reviews || [],
    stats: {
      ...EMPTY_STATS,
      ...(reviewsByUserId[user.id]?.stats || {}),
      ...(pullRequestsByUserId[user.id]?.stats || {}),
    },
  }));
};

const { STATS } = require('../../constants');

const calculatePercentage = (value, total) => {
  if (!total) return 0;
  return Math.min(1, Math.max(0, value / total));
};

const getContributions = (reviewer, totals) => STATS.reduce((prev, statsName) => {
  // for totalReviews, the contribution is compared to the reviewable pull request
  // instead of the total overall reviews of all
  if (statsName === 'totalReviews') {
    const percentage = calculatePercentage(
      reviewer.stats.totalReviews,
      reviewer.stats.totalReviewablePullRequest,
    );
    return {
      ...prev,
      totalReviews: percentage,
    };
  }
  const percentage = calculatePercentage(reviewer.stats[statsName], totals[statsName]);
  return { ...prev, [statsName]: percentage };
}, {});

module.exports = getContributions;

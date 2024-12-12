const { STATS } = require('../../constants');

const calculatePercentage = (value, total) => {
  if (!total) return 0;
  return Math.min(1, Math.max(0, value / total));
};

const getContributions = (reviewer, totals) => STATS.reduce((prev, statsName) => {
  const percentage = calculatePercentage(reviewer.stats[statsName], totals[statsName]);
  return { ...prev, [statsName]: percentage };
}, {});

module.exports = getContributions;

const { STATS } = require('./constants');

const calculatePercentage = (value, total) => {
  if (!total) return 0;
  return Math.min(1, Math.max(0, value / total));
};

const addContributions = (reviewer, totals) => {
  const contributions = STATS.reduce((prev, statsName) => {
    const percentage = calculatePercentage(reviewer.stats[statsName], totals[statsName]);
    return { ...prev, [statsName]: percentage };
  }, {});
  return { ...reviewer, contributions };
};

module.exports = addContributions;

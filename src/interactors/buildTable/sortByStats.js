const { STATS } = require('../../config/stats');
const { isNil } = require('../../utils');

const buildSort = (statConfig) => (a, b) => {
  const { id, sortOrder } = statConfig;
  const { stats: statsA = {} } = a;
  const { stats: statsB = {} } = b;
  const multiplier = sortOrder === 'DESC' ? -1 : 1;
  if (isNil(statsA[id])) return 1;
  return multiplier * (statsA[id] - statsB[id]);
};

const sortByStats = (reviewers, sortBy) => {
  const statConfig = STATS[sortBy] || STATS.totalReviews;
  const sortFn = buildSort(statConfig);
  return reviewers.sort(sortFn);
};

module.exports = sortByStats;

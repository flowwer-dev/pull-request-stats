const { SORT_KEY, STATS_OPTIMIZATION } = require('../../constants');

const buildSort = (statName) => (a, b) => {
  const { stats: statsA = {} } = a;
  const { stats: statsB = {} } = b;
  const optimization = STATS_OPTIMIZATION[statName];
  const multiplier = optimization === 'MAX' ? -1 : 1;
  return multiplier * (statsA[statName] - statsB[statName]);
};

const sortByStats = (reviewers, sortBy) => {
  const sortKey = SORT_KEY[sortBy] || SORT_KEY.REVIEWS;
  const sortFn = buildSort(sortKey);
  return reviewers.sort(sortFn);
};

module.exports = sortByStats;

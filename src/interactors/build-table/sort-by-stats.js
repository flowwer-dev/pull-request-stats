const { STATS_OPTIMIZATION } = require('./constants');

const buildSort = (statName) => {
  return (a, b) => {
    const { stats: statsA = {} } = a;
    const { stats: statsB = {} } = b;
    const optimization = STATS_OPTIMIZATION[statName];
    const multiplier = optimization === 'MAX' ? -1 : 1;
    return multiplier * (statsA[statName] - statsB[statName]);
  };
};

const SORT_FNS_MAP = {
  TIME: buildSort('avgTimeToFirstReview'),
  REVIEWS: buildSort('totalReviews'),
  COMMENTS: buildSort('totalComments')
};

const sortByStats = (reviewers, sortBy) => {
  const sortFn = SORT_FNS_MAP[sortBy] || SORT_FNS_MAP.TIME;
  return reviewers.sort(sortFn);
};

module.exports = sortByStats;

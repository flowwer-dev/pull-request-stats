const { STATS, STATS_OPTIMIZATION } = require('./constants');

const getBest = (values, optimization) => {
  return optimization === 'MAX' ? Math.max(...values) : Math.min(...values);
};

const calculateBests = (allStats) => {
  return STATS.reduce((prev, statName) => {
    const values = allStats.map((values) => values[statName]);
    const best = getBest(values, STATS_OPTIMIZATION[statName]);
    return { ...prev, [statName]: best};
  }, {});
};

module.exports = calculateBests;

const { STATS, STATS_OPTIMIZATION } = require('../../constants');

const getBest = (values, optimization) => (optimization === 'MAX' ? Math.max(...values) : Math.min(...values));

const calculateBests = (allStats) => STATS.reduce((prev, statName) => {
  const values = allStats.map((v) => v[statName]);
  const best = getBest(values, STATS_OPTIMIZATION[statName]);
  return { ...prev, [statName]: best };
}, {});

module.exports = calculateBests;

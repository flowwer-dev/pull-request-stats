const { STATS, VALID_STATS } = require('../../config/stats');

const getBest = (values, sortOrder) => (sortOrder === 'DESC' ? Math.max(...values) : Math.min(...values));

const calculateBests = (entries) => {
  const allStats = entries.map((r) => r.stats);

  return VALID_STATS.reduce((prev, statName) => {
    const values = allStats.map((v) => v[statName]);
    const statConfig = STATS[statName];
    const best = getBest(values, statConfig.sortOrder);
    return { ...prev, [statName]: best };
  }, {});
};

module.exports = calculateBests;

const { STATS } = require('./constants');

const sumStat = (allStats, statName) => {
  return allStats.reduce((a, values) => a + values[statName], 0);
};

const calculateTotals = (allStats) => {
  return STATS.reduce((prev, statName) => ({ ...prev, [statName]: sumStat(allStats, statName)}), {});
};

module.exports = calculateTotals;

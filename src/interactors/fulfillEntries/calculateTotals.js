const { STATS } = require('../../constants');

const sumStat = (stats, statName) => stats.reduce((a, values) => a + (values[statName] || 0), 0);

const calculateTotals = (allStats) => STATS.reduce((prev, statName) => ({
  ...prev,
  [statName]: sumStat(allStats, statName),
}), {});

module.exports = calculateTotals;

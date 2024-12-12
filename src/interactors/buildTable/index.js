const calculateBests = require('./calculateBests');
const getTableData = require('./getTableData');
const sortByStats = require('./sortByStats');

const applyLimit = (data, limit) => (limit > 0 ? data.slice(0, limit) : data);

module.exports = ({
  limit,
  entries,
  sortBy,
  mainStats,
  disableLinks,
  displayCharts,
}) => {
  const execute = () => {
    const sortByStat = sortBy || mainStats[0];
    const sorted = applyLimit(sortByStats(entries, sortByStat), limit);
    const bests = calculateBests(sorted);

    return getTableData({
      mainStats,
      bests,
      disableLinks,
      displayCharts,
      entries: sorted,
    });
  };

  return execute();
};

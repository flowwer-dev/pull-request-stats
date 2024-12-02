const calculateBests = require('./calculateBests');
const getTableData = require('./getTableData');
const sortByStats = require('./sortByStats');

const applyLimit = (data, limit) => (limit > 0 ? data.slice(0, limit) : data);

module.exports = ({
  limit,
  entries,
  sortKey,
  mainStats,
  disableLinks,
  displayCharts,
}) => {
  const execute = () => {
    const sorted = applyLimit(sortByStats(entries, sortKey), limit);
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

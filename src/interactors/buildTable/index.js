const calculateBests = require('./calculateBests');
const getTableData = require('./getTableData');
const removeEmpty = require('./removeEmpty');
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
    const filtered = removeEmpty(entries, mainStats);
    const sorted = applyLimit(sortByStats(filtered, sortByStat), limit);
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

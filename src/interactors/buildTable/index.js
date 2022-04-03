const table = require('markdown-table');
const calculateBests = require('./calculateBests');
const getTableData = require('./getTableData');
const toTableArray = require('./toTableArray');

module.exports = ({
  reviewers,
  disableLinks,
  displayCharts,
}) => {
  const execute = () => {
    const allStats = reviewers.map((r) => r.stats);
    const bests = calculateBests(allStats);

    const tableData = getTableData({
      bests,
      reviewers,
      disableLinks,
      displayCharts,
    });

    return table(toTableArray(tableData));
  };

  return execute();
};

const table = require('markdown-table');
const addContributions = require('./add-contributions');
const calculateTotals = require('./calculate-totals');
const calculateBests = require('./calculate-bests');
const getTableData = require('./get-table-data');
const sortByStats = require('./sort-by-stats');

module.exports = (reviewers, options = {}) => {
  const {
    sortBy, periodLength, displayCharts = false, disableLinks = false
  } = options;

  const execute = () => {
    const allStats = reviewers.map(r => r.stats);
    const totals = calculateTotals(allStats);
    const bests = calculateBests(allStats);

    const users = sortByStats(reviewers, sortBy)
      .map(reviewer => addContributions(reviewer, totals));

    const tableData = getTableData({
      users,
      bests,
      displayCharts,
      disableLinks,
      periodLength
    });

    return table(tableData);
  };

  return execute();
};

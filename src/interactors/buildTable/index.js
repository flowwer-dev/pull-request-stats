const table = require('markdown-table');
const buildReviewTimeLink = require('./buildReviewTimeLink');
const getContributions = require('./getContributions');
const calculateTotals = require('./calculateTotals');
const calculateBests = require('./calculateBests');
const getTableData = require('./getTableData');
const toTableArray = require('./toTableArray');
const sortByStats = require('./sortByStats');

module.exports = (reviewers, options = {}) => {
  const {
    sortBy,
    periodLength,
    disableLinks,
    displayCharts,
    limit,
  } = options;

  const execute = () => {
    const allStats = reviewers.map((r) => r.stats);
    const totals = calculateTotals(allStats);
    const bests = calculateBests(allStats);

    let populatedReviewers = sortByStats(reviewers, sortBy).map((reviewer) => ({
      ...reviewer,
      contributions: getContributions(reviewer, totals),
      urls: { timeToReview: buildReviewTimeLink(reviewer, periodLength) },
    }));

    if (limit > 0) {
      populatedReviewers = populatedReviewers.slice(0, limit);
    }

    const tableData = getTableData({
      bests,
      disableLinks,
      displayCharts,
      reviewers: populatedReviewers,
    });

    return table(toTableArray(tableData));
  };

  return execute();
};

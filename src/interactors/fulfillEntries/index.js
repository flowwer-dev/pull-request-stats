const buildReviewTimeLink = require('./buildReviewTimeLink');
const getContributions = require('./getContributions');
const calculateTotals = require('./calculateTotals');

const getUrls = ({ entry, periodLength }) => ({
  timeToReview: buildReviewTimeLink(entry, periodLength),
});

module.exports = (entries, { periodLength }) => {
  const allStats = entries.map(({ stats }) => stats);
  const totals = calculateTotals(allStats);

  return entries.map((entry) => ({
    ...entry,
    contributions: getContributions(entry, totals),
    urls: getUrls({ entry, periodLength }),
  }));
};

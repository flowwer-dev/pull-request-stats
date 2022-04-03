const buildReviewTimeLink = require('./buildReviewTimeLink');
const getContributions = require('./getContributions');
const calculateTotals = require('./calculateTotals');
const sortByStats = require('./sortByStats');

const applyLimit = (data, limit) => (limit > 0 ? data.slice(0, limit) : data);

const getUrls = ({ reviewer, periodLength }) => ({
  timeToReview: buildReviewTimeLink(reviewer, periodLength),
});

module.exports = ({
  sortBy,
  reviewers,
  periodLength,
  limit = null,
}) => {
  const allStats = reviewers.map((r) => r.stats);
  const totals = calculateTotals(allStats);

  return applyLimit(sortByStats(reviewers, sortBy), limit)
    .map((reviewer) => ({
      ...reviewer,
      contributions: getContributions(reviewer, totals),
      urls: getUrls({ reviewer, periodLength }),
    }));
};

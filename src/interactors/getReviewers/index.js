const calculateReviewsStats = require('./calculateReviewsStats');
const groupReviews = require('./groupReviews');
const core = require('@actions/core');
const reviewers = core.getInput('reviewers').split(',').filter(reviewer => reviewer.trim() !== '')

module.exports = (pulls) => groupReviews(pulls).map(({ author, reviews }) => {
  const stats = calculateReviewsStats(reviews);
  return { author, reviews, stats };
}).filter(info => reviewers.length === 0 || reviewers.includes(info.author.login));

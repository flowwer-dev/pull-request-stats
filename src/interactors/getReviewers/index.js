const calculateReviewsStats = require('./calculateReviewsStats');
const filterReviewer = require('./filterReviewer');
const parseExclude = require('./parseExclude');
const groupReviews = require('./groupReviews');

module.exports = (pulls, { excludeStr } = {}) => {
  const exclude = parseExclude(excludeStr);
  return groupReviews(pulls)
    .filter(({ author }) => filterReviewer(exclude, author.login))
    .map(({ author, reviews }) => {
      const stats = calculateReviewsStats({ pulls, reviews, author });
      return { author, reviews, stats };
    });
};

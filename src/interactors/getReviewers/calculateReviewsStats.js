const { sum, median, divide } = require('../../utils');

const getProperty = (list, prop) => list.map((el) => el[prop]);

// to ignore their own pull request
const filterOutOwnPull = ({ pulls, author }) => pulls.filter(
  (el) => el.author.login !== author.login,
);

module.exports = ({ pulls, reviews, author }) => {
  const pullRequestIds = getProperty(reviews, 'pullRequestId');
  const totalReviews = new Set(pullRequestIds).size;
  const totalReviewablePullRequest = filterOutOwnPull({ pulls, author }).length;
  const totalComments = sum(getProperty(reviews, 'commentsCount'));

  return {
    totalReviews,
    totalReviewablePullRequest,
    totalComments,
    commentsPerReview: divide(totalComments, totalReviews),
    timeToReview: median(getProperty(reviews, 'timeToReview')),
  };
};

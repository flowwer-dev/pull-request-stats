const { sum, median } = require('../../utils');

const getProperty = (list, prop) => list.map((el) => el[prop]);

module.exports = (reviews, pullsById) => {
  const pullRequestIds = new Set(getProperty(reviews, 'pullRequestId'));
  const totalReviews = pullRequestIds.size;
  const commentsCountList = getProperty(reviews, 'commentsCount');
  const totalComments = sum(commentsCountList);
  const pullRequests = [...pullRequestIds].map((id) => pullsById[id]);
  const reviewedAdditions = sum(getProperty(pullRequests, 'additions'));
  const reviewedDeletions = sum(getProperty(pullRequests, 'deletions'));
  const reviewedLines = reviewedAdditions + reviewedDeletions;

  return {
    totalReviews,
    totalComments,
    timeToReview: median(getProperty(reviews, 'timeToReview')),
    commentsPerReview: median(commentsCountList),
    reviewedAdditions,
    reviewedDeletions,
    reviewedLines,
  };
};

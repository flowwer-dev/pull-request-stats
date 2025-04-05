const { sum, median } = require('../../utils');

const getProperty = (list, prop) => list.map((el) => el[prop]);

const getCommentsStats = (reviews, commentsAIStats) => {
  const ids = (reviews || []).reduce((acc, review) => [
    ...acc,
    ...getProperty((review?.comments || []), 'id'),
    review.id,
  ], []);

  return ids.map((id) => commentsAIStats[id]).filter(Boolean);
};

module.exports = ({ reviews, pullsById, commentsAIStats }) => {
  const pullRequestIds = new Set(getProperty(reviews, 'pullRequestId'));
  const totalReviews = pullRequestIds.size;
  const commentsCountList = getProperty(reviews, 'commentsCount');
  const totalComments = sum(commentsCountList);
  const pullRequests = [...pullRequestIds].map((id) => pullsById[id]);
  const reviewedAdditions = sum(getProperty(pullRequests, 'additions'));
  const reviewedDeletions = sum(getProperty(pullRequests, 'deletions'));
  const reviewedLines = reviewedAdditions + reviewedDeletions;
  const aiStats = getCommentsStats(reviews, commentsAIStats);
  const cognitiveEffortScore = sum(getProperty(aiStats, 'cognitiveEffortScore'));
  const estimatedWritingTime = sum(getProperty(aiStats, 'estimatedWritingTime'));
  const constructiveComments = sum(getProperty(aiStats, 'constructiveComments'));

  return {
    totalReviews,
    totalComments,
    timeToReview: median(getProperty(reviews, 'timeToReview')),
    commentsPerReview: median(commentsCountList),
    reviewedAdditions,
    reviewedDeletions,
    reviewedLines,
    cognitiveEffortScore,
    estimatedWritingTime,
    constructiveComments,
  };
};

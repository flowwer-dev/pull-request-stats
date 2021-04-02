const { sum, median, divide } = require('../../utils');

const getProperty = (list, prop) => list.map(el => el[prop]);

module.exports = (reviews) => {
  const pullIds = getProperty(reviews, 'pullId');
  const totalReviews = new Set(pullIds).size;
  const totalComments = sum(getProperty(reviews, 'commentsCount'));

  return {
    totalReviews,
    totalComments,
    commentsPerReview: divide(totalComments, totalReviews),
    timeToReview: median(getProperty(reviews, 'timeToReview'))
  };
};

const { sum, median, divide } = require('../../utils');

const getProperty = (list, prop) => list.map((el) => el[prop]);

module.exports = (reviews) => {
  const pullIds = getProperty(reviews, 'pullId');
  const totalReviews = new Set(pullIds).size;
  const totalComments = sum(getProperty(reviews, 'commentsCount'));

  return {
    totalReviews,
    totalComments,
    commentsPerReview: Math.round(divide(totalComments, totalReviews) * 10) / 10 ,
    timeToReview: median(getProperty(reviews, 'timeToReview')),
  };
};

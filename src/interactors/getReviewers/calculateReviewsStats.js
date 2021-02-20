const { sum, median, average } = require('../../utils');

const getProperty = (list, prop) => list.map(el => el[prop]);

module.exports = (reviews) => {
  const pullIds = getProperty(reviews, 'pullId');

  return {
    totalReviews: new Set(pullIds).size,
    totalComments: sum(getProperty(reviews, 'commentsCount')),
    commentsPerReview: average(getProperty(reviews, 'commentsCount')),
    timeToReview: median(getProperty(reviews, 'timeToReview'))
  };
};

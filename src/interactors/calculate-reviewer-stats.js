const { isNil } = require('../utils');

module.exports = (pulls, reviewerId) => {
  const getReviewedPulls = () => {
    const filterReviewed = (pull) => pull.reviews.some(({user, isOwnPull}) => {
      return !isOwnPull && user.id === reviewerId;
    });
  
    return pulls.filter(filterReviewed);
  };

  const aggregatePull = (pull) => {
    const filterOwn = ({user, isOwnPull}) => !isOwnPull && user.id === reviewerId;

    const userComments = pull.comments.filter(filterOwn);
    const userReviews = pull.reviews.filter(filterOwn);
    const [firstReview] = userReviews.sort((a, b) => a.submittedAt - b.submittedAt);
    const timeToFirstReview = firstReview ? firstReview.submittedAt - pull.createdAt : null;

    return {
      ...pull,
      userComments,
      userReviews,
      timeToFirstReview
    };
  };

  const calculateAverage = (stats) => {
    const filtered = stats.filter(e => !isNil(e));
    if (!filtered.length) return null;

    const sum = filtered.reduce((a, b) => a + b, 0);
    return sum / filtered.length;
  };

  const calculateStats = (pulls) => {
    const totalReviews = pulls.length;
    const totalComments = pulls.reduce((a, b) => a + b.userComments.length, 0);
    const commentsPerReview = totalComments / totalReviews;
    const avgTimeToFirstReview = calculateAverage(pulls.map(p => p.timeToFirstReview));

    return {
      totalReviews,
      totalComments,
      commentsPerReview,
      avgTimeToFirstReview
    };
  }

  const execute = () => {
    const reviewedPulls = getReviewedPulls(pulls);
    const aggregatedPulls = reviewedPulls.map(aggregatePull);
    return calculateStats(aggregatedPulls);
  };

  return execute();
};

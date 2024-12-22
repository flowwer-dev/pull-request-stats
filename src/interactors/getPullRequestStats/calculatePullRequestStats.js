const { sum, median, divide } = require('../../utils');

const getProperty = (list, prop) => list.map((el) => el[prop]);

const removeOwnPulls = ({ isOwnPull }) => !isOwnPull;

const removeWithEmptyId = ({ id }) => !!id;

module.exports = (pulls) => {
  const openedPullRequests = pulls.length;
  const reviews = pulls
    .reduce((acc, pull) => ([...acc, ...pull.reviews]), [])
    .filter(removeOwnPulls)
    .filter(removeWithEmptyId);

  const approvedReviews = reviews.filter(({ isApproved }) => isApproved);
  const observationsList = getProperty(reviews, 'commentsCount');
  const totalObservations = sum(observationsList);
  const medianObservations = median(observationsList);
  const totalApprovedReviews = approvedReviews.length || 0;
  const additions = sum(getProperty(pulls, 'additions'));
  const deletions = sum(getProperty(pulls, 'deletions'));
  const lines = additions + deletions;

  return {
    openedPullRequests,
    totalObservations,
    medianObservations,
    revisionSuccessRate: divide(totalApprovedReviews, reviews.length),
    additions,
    deletions,
    lines,
  };
};

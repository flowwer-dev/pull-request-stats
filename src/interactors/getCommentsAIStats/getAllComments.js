const getPullRequestComments = (pull) => pull.reviews.reduce((acc, review) => [
  ...acc,
  ...(review.comments || []),
], []);

module.exports = (pulls) => pulls.reduce((acc, pull) => [
  ...acc,
  ...getPullRequestComments(pull),
], []);

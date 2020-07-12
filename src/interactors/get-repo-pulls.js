const {
  fetchComments,
  fetchPullRequests,
  fetchReviews
} = require('../fetchers');

module.exports = async ({
  octokit,
  owner,
  repo,
  startDate
}) => {
  const baseParams = { octokit, owner, repo };
  const pullsData = await fetchPullRequests({ ...baseParams, startDate });

  return pullsData.reduce(async (promise, pr) => {
    const prs = await promise;
    const pullOwnerId = pr.user.id;

    const [
      reviews,
      comments
    ] = await Promise.all([
      fetchReviews({ ...baseParams, pullOwnerId, pullNumber: pr.number }),
      fetchComments({ ...baseParams, pullOwnerId, pullNumber: pr.number })
    ]);

    return [...prs, { ...pr, reviews, comments }]
  }, Promise.resolve([]));
};

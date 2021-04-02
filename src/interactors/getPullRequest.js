const { fetchPullRequestById } = require('../fetchers');

const parsePullRequest = (data) => {
  const { node } = data;
  return {
    id: node.id,
    body: node.body,
  };
};

module.exports = async ({ octokit, pullRequestId }) => {
  const data = await fetchPullRequestById(octokit, pullRequestId);
  return parsePullRequest(data);
};

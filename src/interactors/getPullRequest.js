const { fetchPullRequestById } = require('../fetchers');

const parsePullRequest = (data) => {
  const { node } = data;
  return {
    id: node.id,
    url: node.url,
    body: node.body,
    number: node.number,
  };
};

module.exports = async ({ octokit, pullRequestId }) => {
  const data = await fetchPullRequestById(octokit, pullRequestId);
  return parsePullRequest(data);
};

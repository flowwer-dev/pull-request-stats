const calculatePullRequestStats = require('./calculatePullRequestStats');
const groupPullRequests = require('./groupPullRequests');

module.exports = (pulls) => groupPullRequests(pulls)
  .map(({ authorId, pullRequests }) => {
    const stats = calculatePullRequestStats(pullRequests);
    return { authorId, pullRequests, stats };
  });

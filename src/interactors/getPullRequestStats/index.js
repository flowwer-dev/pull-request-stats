const calculatePullRequestStats = require('./calculatePullRequestStats');
const groupPullRequests = require('./groupPullRequests');

module.exports = (pulls) => groupPullRequests(pulls)
  .map(({ userId, pullRequests }) => {
    const stats = calculatePullRequestStats(pullRequests);
    return { userId, pullRequests, stats };
  });

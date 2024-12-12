const fulfillEntries = require('./fulfillEntries');
const getPullRequestStats = require('./getPullRequestStats');
const getReviewStats = require('./getReviewStats');
const getUsers = require('./getUsers');
const mergeStats = require('./mergeStats');

module.exports = async ({
  core,
  pulls,
  excludeStr,
  periodLength,
}) => {
  const users = await getUsers(pulls, { excludeStr });
  core.info(`Found ${users.length} collaborators to analyze`);

  const pullRequestStats = getPullRequestStats(pulls);
  core.info(`Analyzed stats for ${pullRequestStats.length} authors`);

  const reviewStats = getReviewStats(pulls);
  core.info(`Analyzed stats for ${reviewStats.length} reviewers`);

  return fulfillEntries(
    mergeStats({ users, pullRequestStats, reviewStats }),
    { periodLength },
  );
};
